import { IpcMainEvent, dialog, ipcMain } from 'electron'
import { createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'
import fetch from 'node-fetch'
import { resolve } from 'node:path'
import wallpaper from 'wallpaper'


//1.图片下载 2.设置电脑壁纸
ipcMain.on('setWallpaper', async (_event: IpcMainEvent, url: string) => {
  //图片下载
  const localPath = resolve(__dirname,'../../wallpaper',url.split('/').pop()!)
  const streamPipeline = promisify(pipeline)
  const response = await fetch(url)
  if (!response.ok) {
    dialog.showErrorBox('小谢温馨提示', '图片下载失败')
  }
  await streamPipeline(response.body!, createWriteStream(localPath))
  //设置电脑壁纸
  wallpaper.set(localPath, { screen: 'all', scale: 'auto' })
})
