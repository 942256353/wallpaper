import { IpcMainEvent, dialog, ipcMain } from "electron";
import { downloadFile } from "./utils";
let urlCurrent = ''
ipcMain.on('downloadImage',async(_event:IpcMainEvent,url:string)=>{
    urlCurrent ='xiaoxie_wallpaper_'+Date.now()+url.substring(url.lastIndexOf('.'));
    const res = await dialog.showSaveDialog({
        title: '下载图片',
        message:'小谢桌面软件',
        defaultPath:urlCurrent,
        properties: ['createDirectory'],
    })
    if(res.canceled===false&&res.filePath){
        downloadFile(url,res.filePath)
    }
})