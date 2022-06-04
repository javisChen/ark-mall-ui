<script setup>
import {useRoute, useRouter} from "vue-router";

const route = useRoute();
const router = useRouter();

const toCartPage = () => {
  router.push({
    name: 'cart',
    query: {
    },
  })
}

</script>

<template>
  <div class="top-bar">
    <div class="container">
      <div class="top-bar-navs">
        <ul>
          <li><a href="">小米商城</a></li>
        </ul>
      </div>
      <div class="cart">
        <a @click.prevent="toCartPage" href="#">购物车（1）</a>
      </div>
      <div class="info">
        <ul>
          <li>登录</li>
          <li>注册</li>
        </ul>
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

.top-bar .container .cart a:visited  {
  color: #FFFFFF;
}

</style>