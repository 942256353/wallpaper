import { useConfigStore } from "@renderer/store/useConfigStore"
import { ElMessage } from "element-plus"
import router from "@renderer/router"


export default () => {
    const { config } = useConfigStore()
    if(!config.isFirst){
        window.api.appClose(()=>config.isFirst=true)
    }
    const setWallpaper = async () => {
        const state = await window.api.checkImageSaveDir(config.saveDirectory)
        if (!state) {
            ElMessage.error('图片保存目录不存在，请重新设置')
            return router.push({ name: 'setting' })
        }
        if(config.currentPaperUrl===config.url){
            ElMessage.warning('当前壁纸与上次相同，无需重复设置')
            return
        }
        config.currentPaperUrl = config.url
        window.api.setWallpaper(config.url, config.saveDirectory)
    }
    const downloadImage = () => {
        window.api.downloadImage(config.url)
    }

    //设置图片地址保存目录
    const setImageSaveDir = async () => {
        const path = await window.api.setImageSaveDir()
        if (path) config.saveDirectory = path
    }
    //窗口关闭
    const quit = () => {
        window.api.quit()
    }
    //窗口最小化
    const hide = () => {
        window.api.hide()
    }
    return { setWallpaper, downloadImage, setImageSaveDir, quit, hide }
}