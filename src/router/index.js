import { createRouter, createWebHashHistory } from 'vue-router'
import { defineAsyncComponent } from 'vue'

export const routes = [
  {
    path: '/',
    component: defineAsyncComponent(() => import(`../components/HelloWorld.vue`)),
  },
  {
    path: '/login',
    component: defineAsyncComponent(() => import(`../views/Login.vue`)),
  }
]

const router = createRouter({
  history: createWebHashHistory(),  // hash 模式，想要改为history 模式可以使用createWebHistory
  routes: routes
});
export default router