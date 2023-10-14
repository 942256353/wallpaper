<script lang='ts' setup>
import { useConfigStore,Tag } from '@renderer/store/useConfigStore'
import http from '@renderer/plugins/axios'
const { config } = useConfigStore()
const getTags = async () => {
  if (config?.tagData.length === 0) {
    const res = await http.get('/tag')
    if (res.data?.length > 0) {
      config.tagData = res.data.map((item) => {
        return { ...item, flag: false, size: Math.floor(Math.random() * 2 + 4) }
      })
    } else {
      config.tagData = []
    }
  }
}
getTags()
const addTag = (v:Tag) => {
  v.flag = true
  config.myTag.push(v)
  //去重
  config.myTag = [...new Set(config.myTag)]
}
const del = (v:Tag, i:number) => {
  config.myTag.splice(i, 1)
  config.tagData.forEach((item) => {
    if (item.id == v.id) {
      item.flag = false
    }
  })
}
</script>
<template>
  <main class="nodrag bg-[##a4b0be] p-2 font-bold">
    <!-- 推荐标签-->
    <section class="tag-heading tag-height">
      <div class="tag-title">推荐标签({{ config.myTag.length }}/21)</div>
      <div class="tag-body">
        <ul class="cloud">
          <li
            :data-weight="v.size"
            v-for="v in config.tagData"
            :key="v.id"
            @click="addTag(v)"
            :class="v.flag ? 'selected' : ''"
          >
            {{ v.name }}
          </li>
        </ul>
      </div>
    </section>
    <!-- 我的便签 -->
    <section class="tag-my tag-height mt-2">
      <div class="tag-title">我的标签({{ config.myTag.length }})</div>
      <div class="tag-body">
        <ul class="cloud">
          <li :data-weight="v.size" v-for="(v, i) in config.myTag" :key="v.id">
            {{ v.name }}
            <span class="del" @click="del(v, i)">x</span>
          </li>
        </ul>
      </div>
    </section>
  </main>
</template>

<style lang='css' scoped>
ul li {
  list-style: none;
}
.tag-title{
    @apply text-xs opacity-70;    
}
/* body {
  font-size: 14px;
  max-width: 720px;
  margin: auto;
} */
/* 标题 */
.container-title {
  text-align: center;
}
.tag-height {
  /* height: 260px; */
  /* margin: 20px 0; */
  border: 1px solid #ddd;
  /* padding: 5px; */
}
.cloud {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  /* width: 350px; */
  line-height: 2rem;
  margin: auto;
}
.cloud li {
  margin: 2px 2px;
  color: #e73f74;
  font-size: calc(var(--size) * 2px + 4px);
  position: relative;
}
/* 标签文字的大小 */
.cloud li[data-weight='1'] {
  --size: 1;
}
.cloud li[data-weight='2'] {
  --size: 2;
}
.cloud li[data-weight='3'] {
  --size: 3;
}
.cloud li[data-weight='4'] {
  --size: 4;
}
.cloud li[data-weight='5'] {
  --size: 5;
}
.cloud li[data-weight='6'] {
  --size: 6;
}
.cloud li[data-weight='7'] {
  --size: 7;
}
.cloud li[data-weight='8'] {
  --size: 8;
}
.cloud li[data-weight='9'] {
  --size: 9;
}
/* 标签的颜色 */
.cloud li:nth-child(n) {
  --color: #f48701;
  color: var(--color);
}
.cloud li:nth-child(2n + 1) {
  --color: #3969ab;
  color: var(--color);
}
.cloud li:nth-child(3n + 1) {
  --color: #7f3c8d;
  color: var(--color);
}
.cloud li:nth-child(4n + 1) {
  --color: #11a579;
  color: var(--color);
}
.cloud li:nth-child(5n + 1) {
  --color: #e73f74;
  color: var(--color);
}
/* 动态效果 */
.cloud li::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  height: 100%;
  width: 0;
  background: var(--color);
  opacity: 0.4;
  transition: all 0.2s;
  transform: translate(-50%, 0);
  border-radius: 10px;
}
.cloud li:hover::before {
  width: 100%;
  cursor: pointer;
}
/* 推荐标签被选中的样式 */
.tag-body .selected {
  border: 1px solid var(--color);
  border-radius: 10px;
}
/* 关闭 */
.del {
  position: absolute;
  color: var(--color);
  right: -3px;
  top: -14px;
  font-size: 15px;
  cursor: pointer;
  display: none;
}
.tag-my .cloud li:hover .del {
  display: block;
}
</style>
