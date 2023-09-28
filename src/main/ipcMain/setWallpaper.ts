import { IpcMainEvent, IpcMainInvokeEvent, ipcMain } from 'electron'
import fs from 'fs'
import { resolve } from 'node:path'
import wallpaper from 'wallpaper'
import { downloadFile } from './utils'

//1.图片下载 2.设置电脑壁纸
ipcMain.on('setWallpaper', async (_event: IpcMainEvent, url: string, path: string) => {
  try {
    const localPath = resolve(path, url.split('/').pop()!)
    //图片下载
    const file = await downloadFile(url, localPath)
    //设置电脑壁纸
    wallpaper.set(file, { screen: 'all', scale: 'auto' })
  } catch (error) {
    // dialog.showErrorBox('发生错误', '图片下载失败,请在设置中心重新定义目录')
  }
})

ipcMain.handle('checkImageSaveDir', async (_event: IpcMainInvokeEvent,path:string) => {
  return fs.existsSync(path)
})
