import { Injectable } from '@nestjs/common';
import { readFileSync, readdirSync } from 'fs';
import { resolve } from 'path';
import _ from 'lodash';
import { Response } from 'express';
import { readFile, readdir } from 'fs/promises';
import fecth from 'node-fetch';


const imgUrl_1 = 'http://cdn.apc.360.cn/index.php?c=WallPaper&a=getAllCategoriesV2&from=360chrome';
const imgUrl_2 = (id, start = 1) => (`http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=getAppsByCategory&cid=${id}&start=${start}&count=1&from=360chrome`)


@Injectable()
export class AppService {
  async getImage() {
   try {
      const res = await fecth(imgUrl_1).then(r => r.json())
      const resId = res.data.map(v => v.id)
      const id = resId[_.random(resId.length - 1)]
      const res_1 = await fecth(imgUrl_2(id)).then(r => r.json()) 
      const start = _.random(res_1.total)==0?1:_.random(res_1.total)
      const data = await fecth(imgUrl_2(id,start)).then(r => r.json())
      return data.data[0].url
    } catch (error) {
      const files = await readdir(resolve(__dirname, '..', 'wallpaper'));
      return (
        'http://43.138.152.177:3001/wallpaper/' + files[_.random(files.length - 1)]
      );
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
}
