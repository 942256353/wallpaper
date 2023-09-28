<script setup lang='ts'>
import {Pic,SettingOne} from '@icon-park/vue-next'
</script>
<template>
    <main class="px-3 py-2 text-sm opacity-80 flex justify-between items-center drag">
        <section class="text-xs opacity-80">小谢桌面壁纸</section>
        <section class="flex justify-center items-center gap-2">
            <Pic class="nodrag cursor-pointer" theme="outline" size="20" fill="#333" @click="$router.push({name:'home'})"/>
            <SettingOne class="nodrag cursor-pointer" theme="outline" size="20" fill="#333"  @click="$router.push({name:'setting'})"/>
        </section>
    </main>
</template>

<style lang='scss' scoped>

</style>
