import { createRouter, createWebHistory } from 'vue-router'

import Home from '@renderer/views/home.vue'
import Setting from '@renderer/views/setting.vue'

const routes = [
  {
    path: '/:any(.*)*',
    name: 'home',
    component: Home
  },
  {
    path: '/setting',
    name: 'setting',
    component: Setting
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router