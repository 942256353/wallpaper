<script setup lang='ts'>
import {Pic,SettingOne,CloseOne} from '@icon-park/vue-next'
import useWallpaper from '@renderer/composables/useWallpaper'
const {quit} = useWallpaper()
</script>
<template>
    <main class="px-3 py-2 text-sm opacity-80 flex justify-between items-center drag">
        <section class="text-xs opacity-80">小谢桌面壁纸</section>
        <section class="flex justify-center items-center gap-2">
            <Pic class="nodrag cursor-pointer text-gray-500" :class="{iconColor:$route.name==='home'}" theme="outline" size="20" @click="$router.push({name:'home'})"/>
            <SettingOne class="nodrag cursor-pointer text-gray-500" :class="{iconColor:$route.name==='setting'}" theme="outline" size="20" @click="$router.push({name:'setting'})"/>
            <CloseOne  class="nodrag cursor-pointer text-gray-500 hover:text-red-600" theme="outline" size="20" @click="quit"/>
        </section>
    </main>
</template>

<style lang='scss' scoped>
.iconColor{
   color: #e67e22 !important;
}
</style>
