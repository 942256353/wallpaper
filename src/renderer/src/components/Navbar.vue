<script setup lang='ts'>
import {Pic,SettingOne,CloseOne,Minus,Like} from '@icon-park/vue-next'
import useWallpaper from '@renderer/composables/useWallpaper'
const {quit,hide} = useWallpaper()
</script>
<template>
    <main class="px-3 py-2 text-sm opacity-80 flex justify-between items-center drag">
        <section class="text-xs opacity-80">小谢桌面壁纸</section>
        <section class="flex justify-center items-center gap-2">
            <Pic class="nodrag cursor-pointer text-gray-500 hover:text-[#e67e22]" :class="{iconColor:$route.name==='home'}" theme="outline" size="20" @click="$router.push({name:'home'})"/>
            <SettingOne class="nodrag cursor-pointer text-gray-500 hover:text-[#0284cf]" :class="{iconColorSetting:$route.name==='setting'}" theme="outline" size="20" @click="$router.push({name:'setting'})"/>
            <Like class="nodrag cursor-pointer text-gray-500 hover:text-[#f78fb3]" :class="{iconColorLike:$route.name==='favor'}" theme="filled" size="20" @click="$router.push({name:'favor'})"/>
            <Minus class="nodrag cursor-pointer text-gray-500 hover:text-black" theme="outline" @click="hide" size="20"/>
            <CloseOne  class="nodrag cursor-pointer text-gray-500 hover:text-red-600" theme="outline" size="20" @click="quit"/>
        </section>
    </main>
</template>

<style lang='scss' scoped>
.iconColor{
   color: #e67e22 !important;
}
.iconColorLike{
    color: #f78fb3;
}
.iconColorSetting{
    color: #0284cf;
}
</style>
