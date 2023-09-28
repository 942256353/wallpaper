import { IpcMainEvent, dialog, ipcMain } from "electron";
import { downloadFile } from "./utils";

ipcMain.on('downloadImage',async(_event:IpcMainEvent,url:string)=>{
    const fileName = url.substring(url.lastIndexOf('/')+1)
    const res = await dialog.showSaveDialog({
        title: '下载图片',
        message:'小谢桌面软件',
        defaultPath:fileName,
        properties: ['createDirectory'],
    })
    if(res.canceled===false&&res.filePath){
        downloadFile(url,res.filePath)
    }
})