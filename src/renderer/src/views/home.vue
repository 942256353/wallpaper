<script lang='ts' setup>
import { onMounted, ref } from 'vue'
import { ElLoading } from 'element-plus'
import http from '@renderer/plugins/axios'
import { useConfigStore } from '@renderer/store/useConfigStore'
import useWallpaper from '@renderer/composables/useWallpaper'
const {setWallpaper} = useWallpaper()
const { config } = useConfigStore()
const img = ref<HTMLImageElement>()
const load = async () => {
  const res = await http.get('/')
  const loading = ElLoading.service({ background: 'rgba(255,255,255,.2)', text: '加载中' })
  config.url = res.data
  img.value!.src = res.data
  img.value!.onload = () => {
    loading.close()
  }
}
onMounted(() => {
  if (!config.url) load()
})
</script>
<template>
  <div>
    <img
      ref="img"
      :src="config.url"
      alt=""
      class="aspect-video nodrag cursor-pointer"
      draggable="false"
      @click="load"
    />
    <div
      class="bg-gray-200 text-center py-3 m-3 rounded-lg hover:bg-gray-300 duration-300 cursor-pointer opacity-80 shadow-sm nodrag" @click="setWallpaper"
    >
      设为壁纸
    </div>
    <div class="mx-3 text-xs text-gray-700 flex justify-between items-center">
      <div>独乐乐不如众乐乐</div>
      <div class="hover:font-bold cursor-pointer text-sm nodrag cursor-pointer">下载壁纸</div>
    </div>
  </div>
</template>
<style scoped>
</style>
