<script setup lang="ts">

import CommonTopBar from "@/views/common/CommonTopBar.vue";
import {reactive, toRefs, defineComponent} from 'vue';
import {useRoute, useRouter} from 'vue-router';

const route = useRoute();
const router = useRouter();

const data = reactive({
  toCart: async () => {
    router.push({
      name: 'cart'
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
        <span>加入购物车成功！</span>
      </div>

      <div class="btn-box">
        <button class="settle primary-bg" @click="toCart">去购物车结算</button>
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
