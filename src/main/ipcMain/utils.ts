import { dialog } from 'electron'
import fetch from 'node-fetch'
import { createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'


export const downloadFile = async(url:string,localPath:string)=>{
    // const localPath =resolve(path,url.split('/').pop()!)
    const streamPipeline = promisify(pipeline)
    const response = await fetch(url)
    if (!response.ok) {
      dialog.showErrorBox('小谢温馨提示', '图片下载失败')
    }
    await streamPipeline(response.body!, createWriteStream(localPath))
    return localPath
}