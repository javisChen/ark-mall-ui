import { createRouter, createWebHashHistory } from 'vue-router'
const info = () => import(`../views/info/Info.vue`)
const shop = () => import(`../views/shop/Shop.vue`)
const search = () => import(`../views/shop/Search.vue`)
const login = () => import(`../views/login/Login.vue`)
const cart = () => import(`../views/cart/Cart.vue`)
const cartSuccess = () => import(`../views/cart/CartSuccess.vue`)
const paySuccess = () => import(`../views/pay/PaySuccess.vue`)
const checkout = () => import(`../views/checkout/Checkout.vue`)
const cashier = () => import(`../views/cashier/Cashier.vue`)


const center = () => import(`../views/center/Center.vue`)
const order = () => import(`../views/order/Order.vue`)

const orderDetail = () => import(`../views/order/OrderDetail.vue`)
export const routes = [
  {
    path: '/',
    redirect: '/shop'
  },
  {
    path: '/login',
    name: 'login',
    component: login,
  },
  {
    path: '/order',
    name: 'order',
    component: order,
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
    path: '/shop',
    name: 'shop',
    component: shop,
  },
  {
    path: '/shop/search',
    name: 'search',
    component: search,
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
    path: '/cashier',
    name: 'cashier',
    component: cashier,
  },
  {
    path: '/pay/success',
    name: 'paySuccess',
    component: paySuccess
  },
  {
    path: '/center',
    name: 'center',
    component: center,
    children: [
      {
        path: 'order',
        name: 'order',
        component: order
      },
      {
        path: 'order/:id',
        name: 'orderDetail',
        component: orderDetail
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),  // hash 模式，想要改为history 模式可以使用createWebHistory
  routes: routes
});
export default router