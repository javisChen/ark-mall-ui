import { createRouter, createWebHashHistory } from 'vue-router'

import Login from '@/views/Login'
import HelloWorld from '@/components/HelloWorld'

export const routes = [
  {
    path: '/',
    component: HelloWorld,
  },
  {
    path: '/login',
    component: Login,
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]

//
// const router = createRouter({
//   history: createWebHashHistory(),  // hash 模式，想要改为history 模式可以使用createWebHistory
//   routes: routes
// });
//
// export default router
