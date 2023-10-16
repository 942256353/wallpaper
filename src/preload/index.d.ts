import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      setWallpaper: (url: string,path:string) => void
      downloadImage: (url: string) => void
      setImageSaveDir: () => Promise<string>
      checkImageSaveDir:(path:string)=>Promise<boolean>
      quit: () => void
      hide: () => void
      appClose:(fn:Function)=>void
    }
  }
}
