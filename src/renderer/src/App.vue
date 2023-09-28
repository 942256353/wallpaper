<script setup lang="ts">
import Navbar from './components/Navbar.vue'
</script>

<template>
  <Suspense>
    <main>
      <Navbar />
      <RouterView />
    </main>
  </Suspense>
</template>

<style lang="less">
// @import './assets/css/styles.less';
</style>
众乐乐
