import { useConfigStore } from "@renderer/store/useConfigStore"

export default ()=>{
    const setWallpaper = () => {
        const {config} = useConfigStore()
        window.api.setWallpaper(config.url)
    }
    return {setWallpaper}
}