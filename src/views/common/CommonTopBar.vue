<script setup>
import {useRoute, useRouter} from "vue-router";
import {useAuthStore} from '@/store/auth'
import {useCartStore} from '@/store/cart'

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const cartStore = useCartStore();

const toCartPage = () => {
  router.push({
    name: 'cart',
    query: {},
  })
}


const doLogout = async () => {
  const result = await authStore.logout()
  if (result) {
    window.location.reload();
  }
}

const toLoginPage = () => {
  router.push({
    name: 'login',
    query: {},
  })
}
const toOrderPage = () => {
  router.push({
    name: 'order',
    query: {},
  })
}

const toRegisterPage = () => {
  router.push({
    name: 'register',
    query: {},
  })
}

</script>

<template>
  <div class="top-bar">
    <div class="container">
      <div class="top-bar-navs">
        <ul>
          <li><a href="">E-Mall</a></li>
        </ul>
      </div>
      <div v-if="authStore.authUser" class="cart">
        <a @click.prevent="toCartPage" href="#">购物车（{{ cartStore.count }}）</a>
      </div>
      <div class="info">
        <ul v-if="!authStore.authUser">
          <n-button
              @click="toLoginPage"
              size="tiny"
              color="#B0B0B0"
              text
              tag="li">登录
          </n-button>
          <n-button
              @click="toRegisterPage"
              size="tiny"
              color="#B0B0B0"
              text
              tag="li">注册
          </n-button>
        </ul>
        <div v-else class="user-info">
          <span class="user-info">欢迎您，【{{ authStore.authUser.username }}】</span>
          &nbsp
          <n-button
              @click="doLogout"
              size="tiny"
              color="#B0B0B0"
              text
              tag="a">登出
          </n-button> &nbsp|&nbsp
          <n-button
              @click="toOrderPage"
              size="tiny"
              color="#B0B0B0"
              text
              tag="a">我的订单
          </n-button>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.top-bar {
  color: #b0b0b0;
  height: 40px;
  display: flex;
  background-color: #333333;
  justify-content: center;
  width: 100%;
}

.top-bar .container {
  width: 1226px;
}

.top-bar .container .top-bar-navs {
  float: left;
  height: 100%;
}

.top-bar .container .top-bar-navs a:visited {
  color: #b0b0b0;
}

.top-bar .container .top-bar-navs ul {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  height: 100%;
}


.top-bar .container .info {
  float: right;
  height: 100%;
}

.top-bar .container .info ul {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  height: 100%;
}

.top-bar .container .info .user-info {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  height: 100%;
}

.top-bar .container .info ul li {
  padding: 0 5px;
  border-right: 1px solid grey;
}

.top-bar .container .info ul li:last-child {
  border-right: 0;
}

.top-bar .container .cart {
  float: right;
  width: 120px;
  height: 100%;
  margin-left: 15px;
  font-size: 12px;
  background-color: #ff6700;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.top-bar .container .cart a {
  color: #b0b0b0;
}

.top-bar .container .cart a:active {
  color: #b0b0b0;
}

.top-bar .container .cart a:visited {
  color: #FFFFFF;
}

</style>