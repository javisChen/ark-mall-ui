import { createRouter, createWebHashHistory } from 'vue-router'
import { defineAsyncComponent } from 'vue'

export const routes = [
  {
    path: '/home',
    name: 'home',
    component: defineAsyncComponent(() => import(`../views/home/Home.vue`)),
  },
  {
    path: '/login',
    component: defineAsyncComponent(() => import(`../views/login/Login.vue`)),
  }
]

const router = createRouter({
  history: createWebHashHistory(),  // hash 模式，想要改为history 模式可以使用createWebHistory
  routes: routes
});
export default router