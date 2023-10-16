import { IpcMainEvent, dialog, ipcMain } from "electron";
import { downloadFile } from "./utils";
let downloadUrl = ''
ipcMain.on('downloadImage',async(_event:IpcMainEvent,url:string)=>{
    if(url.includes('=')){
        downloadUrl = url.substring(url.indexOf('=')+1)
    }else{
        downloadUrl = url.substring(url.lastIndexOf('/')+1)
    }
    const res = await dialog.showSaveDialog({
        title: '下载图片',
        message:'小谢桌面软件',
        defaultPath:downloadUrl,
        properties: ['createDirectory'],
    })
    if(res.canceled===false&&res.filePath){
        downloadFile(url,res.filePath)
    }
})