import { createRouter, createWebHistory } from 'vue-router'

// import Home from '@renderer/views/home.vue'
// import Setting from '@renderer/views/setting.vue'
// import Favor from '@renderer/views/favor.vue'

const routes = [
  {
    path: '/:any(.*)*',
    name: 'home',
    component: ()=>import('@renderer/views/home.vue')
  },
  {
    path: '/setting',
    name: 'setting',
    component: ()=>import('@renderer/views/setting.vue')
  },
  {
    path: '/favor',
    name: 'favor',
    component: ()=>import('@renderer/views/favor.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router