import { Injectable } from '@nestjs/common';
import { readFileSync, readdirSync } from 'fs';
import { resolve } from 'path';
import _ from 'lodash';
import { Response } from 'express';
import { readFile, readdir } from 'fs/promises';
import fecth from 'node-fetch';


const imgUrl_1 = 'http://cdn.apc.360.cn/index.php?c=WallPaper&a=getAllCategoriesV2&from=360chrome';
const imgUrl_2 = (id, start = 1) => (`http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=getAppsByCategory&cid=${id}&start=${start}&count=1&from=360chrome`)
const bing_Url =['https://bing.img.run/rand_uhd.php','https://api.likepoems.com/img/bing','https://api.7585.net.cn/360/api.php']
const bing_startUrl = 'https://bing.img.run/uhd.php'
const anime_2dUrl = ['https://www.loliapi.com/acg/pc','https://www.dmoe.cc/random.php','https://api.likepoems.com/img/pc']
let tags = []
let resId = [];

const getLocalImg =async ()=>{
  const files = await readdir(resolve(__dirname, '..', 'wallpaper'));
  console.log('本地高清')
  return (
    'http://43.138.152.177:3001/wallpaper/' + files[_.random(files.length - 1)]
  );
}
@Injectable()
export class AppService {
  async getImage(tags: string) {
    try {
      if (tags) {
        resId = tags.split(',')
        const id = resId[_.random(resId.length - 1)]
        if(id==222){
          const path = anime_2dUrl[_.random(anime_2dUrl.length - 1)]
           let imgUrl = await fecth(path).then(r => r.url)
           return imgUrl;
        }
        const res_1 = await fecth(imgUrl_2(id)).then(r => r.json())
        const start = _.random(res_1.total) == 0 ? 1 : _.random(res_1.total)
        const data = await fecth(imgUrl_2(id, start)).then(r => r.json())
        console.log('远程分类', data.data[0].url)
        return data.data[0].url
      } else {
        const path = bing_Url[_.random(bing_Url.length - 1)]
        let imgUrl = await fecth(path).then(r => r.url)
        console.log('远程随机', imgUrl)
        return imgUrl;
      }
    } catch (error) {
      return await getLocalImg()
    }

    //返回 buffer
    //   const file = await readFile(
    //     resolve(__dirname, '../wallpaper', files[_.random(files.length - 1)]),
    //   );
    //  return new Promise(resolve =>{
    //   setTimeout(()=>{
    //     res.type('image/png');
    //     // res.set('Content-Type', 'image/*')
    //     resolve(res.send(file))
    //   },2000)
    //  })
  }

  async getTag() {
    try {
      const res = await fecth(imgUrl_1).then(r => r.json())
      tags = res.data.map(tag => {
        return { id: tag.id, name: tag.name }
      })
      return tags
    } catch (error) {
      return error
    }
  }

  async getStart(){
    try {
      const imgUrl = await fecth(bing_startUrl).then(r => r.url)
      console.log('远程2-start', imgUrl)
      return imgUrl;
    } catch (error) {
     return await getLocalImg()
    }
  }
}
