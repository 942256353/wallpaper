import { IpcMainEvent, IpcMainInvokeEvent, dialog, ipcMain } from 'electron'
import fs from 'fs'
import { resolve } from 'node:path'
import wallpaper from 'wallpaper'
import { downloadFile } from './utils'

let urlCurrent = ''
//1.图片下载 2.设置电脑壁纸
ipcMain.on('setWallpaper', async (_event: IpcMainEvent, url: string, path: string) => {
  try {
    urlCurrent ='xiaoxie_wallpaper_'+Date.now()+url.substring(url.lastIndexOf('.'));
    const localPath = resolve(path,urlCurrent)
    //图片下载
    const file = await downloadFile(url, localPath)
    //设置电脑壁纸
    wallpaper.set(file, { screen: 'all', scale: 'auto' })
  } catch (error: any) {
    dialog.showErrorBox('发生错误', error.message)
  }
})

ipcMain.handle('checkImageSaveDir', async (_event: IpcMainInvokeEvent,path:string) => {
  return fs.existsSync(path)
})
