import { BrowserWindow, Menu, Tray, dialog } from 'electron'
import path from 'path'
const createTray = (createWindow:()=>void) => {
  const tray = new Tray(
    path.resolve(
      __dirname,
      process.platform == 'darwin'
        ? '../../resources/macTray@2x.png' //32x32 像素的图片
        : '../../resources/windowTray.png' //可以使用彩色图片，图标的最大大小为 256x256 像素，设置为32x32像素即可
    )
  )
  const contextMenu = Menu.buildFromTemplate([
    {
      label:'设置壁纸',
      click:()=>{
        if(BrowserWindow.getAllWindows().length===0) createWindow()
      }
    },
    {
        label: '关于',
        // role:'about',
        click:()=>{
            dialog.showMessageBox({
                type:'info',
                title:'关于',
                message:'软件信息',
                detail:'小谢桌面壁纸@202309294_By_xiaoxie_@qq942256453'
            })
        }
    },
    {
        label: '帮助',
        role:'help',
        click:()=>{
            dialog.showMessageBox({
                type:'info',
                title:'帮助',
                message:'暂无',
            })
        }
    },
    {
        label: '退出',
        role:'quit'
    }
])
  tray.setToolTip('小谢桌面壁纸')
  tray.setContextMenu(contextMenu)
}

export { createTray }