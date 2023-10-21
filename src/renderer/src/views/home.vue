<script lang='ts' setup>
import { onMounted, ref } from 'vue'
import http from '@renderer/plugins/axios'
import { useConfigStore } from '@renderer/store/useConfigStore'
import useWallpaper from '@renderer/composables/useWallpaper'
import _ from 'lodash'
import {WritingFluently} from '@icon-park/vue-next'

const {setWallpaper,downloadImage} = useWallpaper()
const { config } = useConfigStore()
const img = ref<HTMLImageElement>()
const load = async () => {
  const tags = config?.myTag?.length>0?config?.myTag.map(item => item.id).join(','):''
  const res = await http.get(`/?tags=${tags}`)
  config.url = res.data
  img.value!.src = res.data
}
let debouceLoad;
const start = async () => {
  const res = await http.get(`/start`)
  config.url = res.data
  config.isFirst = false
  img.value!.src = res.data
}
onMounted(() => {
  if(config.isFirst){
    start()
  }
  debouceLoad = _.debounce(load, 500)
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
      @click="debouceLoad"
    />
    <div
      class="bg-white text-center py-3 m-3 rounded-lg duration-300 cursor-pointer opacity-80 hover:shadow-sm hover:bg-gray-300 nodrag" @click="setWallpaper"
    >
      设为壁纸
    </div>
    <div class="mx-3 text-xs text-gray-700 flex justify-between items-center">
      <div v-if="config.signature" class="flex items-center gap-1">
        <writing-fluently theme="filled" size="16"  class="nodrag hover:text-[#e67e22] cursor-pointer" @click="$router.push({name:'setting'})"/>
        <div class=" text-[#040505] font-bold border border-b-[#2C3A47] pl-1 pr-2 font-mono opacity-60">{{config.signature}}</div>
      </div>
      <div class="hover:font-bold cursor-pointer text-sm nodrag" @click="downloadImage">下载壁纸</div>
    </div>
  </div>
</template>
<style lang='scss' scoped>
 .run{
    animation: identifier 5s infinite both;
 }
 @keyframes identifier {
    from{
        transform: translateX(0);
    }
    50%{
        transform: translateX(calc(300px - 100%));
    }
    to{
        transform: translateX(0);
    }
 }
</style>
