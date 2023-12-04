<script setup lang="ts">

import CommonTopBar from "@/views/common/CommonTopBar.vue";
import {reactive, toRefs} from 'vue';
import {useRouter} from 'vue-router';

const router = useRouter();

const data = reactive({
  toCart: () => {
    router.push({
      name: 'home'
    })
  },
})

const {
  toCart,
} = toRefs(data)


</script>

<template>
  <common-top-bar/>
  <div class="header">
    <div class="container">
      <div class="header-logo">
        <img src="@/assets/logo-mi.png" alt="">
      </div>
      <div class="header-title">
        <span>支付成功！</span>
      </div>

      <div class="btn-box">
        <button class="settle primary-bg" @click="toCart">继续购物</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

.header {
  background-color: #FFFFFF;
  border-bottom: 2px solid #ff6700;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.header .container {
  width: 1226px;
  padding-top: 25px;
  padding-bottom: 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.header-logo {
  width: 96px;
}

.header-logo img {
  width: 48px;
  height: 48px;
}

.header-title {
  font-size: 28px;
  font-weight: 400;
  color: #424242;
}

.header-title .tips {
  margin-left: 15px;
  color: #757575;
  font-size: 12px;
}

.main {
  margin-top: 38px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.main .container {
  width: 1226px;
}

.btn-box {
  height: 100%;
  margin-left: 50px;
  float: right;
}

.btn-box .settle {
  width: 200px;
  outline: none;
  border: 0;
  height: 100%;
  color: #FFFFFF;
  font-size: 16px;
}

.total-price .money {
  font-size: 30px;
}

</style>
