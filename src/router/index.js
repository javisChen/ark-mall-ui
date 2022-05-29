import { createRouter, createWebHashHistory } from 'vue-router'
import { defineAsyncComponent } from 'vue'
const info = () => import(`../views/Info/Info.vue`)
const home = () => import(`../views/home/Home.vue`)
const login = () => import(`../views/login/Login.vue`)

export const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    component: login,
  },
  {
    path: '/home',
    name: 'home',
    component: home,
  },
  {
    path: '/info',
    name: 'info',
    component: info,
  },
]

const router = createRouter({
  history: createWebHashHistory(),  // hash 模式，想要改为history 模式可以使用createWebHistory
  routes: routes
});
export default router