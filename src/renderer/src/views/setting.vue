<script setup lang='ts'>
import { useConfigStore } from '@renderer/store/useConfigStore'
import useWallpaper from '@renderer/composables/useWallpaper'
const {config} = useConfigStore()
const {setImageSaveDir} = useWallpaper()
</script>
<template>
  <main class="p-3 bg-[#2c3e50] text-white flex flex-col justify-between">
    <section class="mt-6">
      <h2 class="flex justify-center py-5 opacity-70 text-sm">参数设置</h2>
      <div class="flex gap-1 items-center">
        <el-input disabled v-model="config.saveDirectory" placeholder="请选择壁纸保存目录" size="normal"></el-input>
        <el-button type="primary" size="default" @click="setImageSaveDir">选择图片保存目录</el-button>
      </div>
    </section>
    <div class="text-xs opacity-30 font-bold font-light flex flex-col items-center mt-5">
        <span class=" text-orange-100">小谢作品</span>
        <div>众乐乐不如独乐乐</div>
    </div>
  </main>
</template>
<style lang='scss' scoped>
</style>
