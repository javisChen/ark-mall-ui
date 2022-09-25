import { createRouter, createWebHashHistory } from 'vue-router'
const info = () => import(`../views/info/Info.vue`)
const home = () => import(`../views/home/Home.vue`)
const login = () => import(`../views/login/Login.vue`)
const cart = () => import(`../views/cart/Cart.vue`)
const cartSuccess = () => import(`../views/cart/CartSuccess.vue`)
const checkout = () => import(`../views/checkout/Checkout.vue`)
const confirm = () => import(`../views/confirm/Confirm.vue`)

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
    path: '/cart',
    name: 'cart',
    component: cart,
  },
  {
    path: '/cart/success',
    name: 'cartSuccess',
    component: cartSuccess,
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
  {
    path: '/checkout',
    name: 'checkout',
    component: checkout,
  },
  {
    path: '/confirm',
    name: 'confirm',
    component: confirm,
  },
]

const router = createRouter({
  history: createWebHashHistory(),  // hash 模式，想要改为history 模式可以使用createWebHistory
  routes: routes
});
export default router