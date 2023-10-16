import { BrowserWindow, Menu, Tray, dialog } from 'electron'
import path from 'path'
const createTray = (createWindow:()=>void,mainWindow:BrowserWindow) => {
  const tray = new Tray(
    path.resolve(
      __dirname,
      process.platform == 'darwin'
        ? '../../resources/macTray@2x.png' //32x32 像素的图片
        : '../../resources/windowTray.png' //可以使用彩色图片，图标的最大大小为 256x256 像素，设置为32x32像素即可
    )
  )
  tray.on('click', (_e) => {
    if (mainWindow) {
      if (mainWindow.isVisible()) {
        // 如果窗口是显示的，则隐藏窗口
        mainWindow.hide()
      } else {
        // 如果窗口是隐藏的，则显示窗口
        mainWindow.show()
      }
    } else {
      // 如果窗口不存在，则创建窗口并显示
      createWindow()
    }
  })
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
        role:'quit',
        click:()=>{
          mainWindow.webContents.postMessage('appClose','app关闭')
        }
    }
])
  tray.setToolTip('小谢桌面壁纸')
  tray.setContextMenu(contextMenu)
}

export { createTray }