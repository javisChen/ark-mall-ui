<script setup lang="ts">

import CommonTopBar from "../common/CommonTopBar.vue";
import {reactive, toRefs} from 'vue';
import {useRoute, useRouter} from 'vue-router';

const data = reactive({
  product: {}
})

const {
  product,
} = toRefs(data)


</script>

<template>
  <div class="header">
    <div class="container">
      <div class="header-logo">
        <img src="@/assets/logo-mi.png" alt="">
      </div>
      <div class="header-title">
        <span>我的购物车</span>
        <span class="d">温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="main">
    </div>
    <div class="other-info">
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
  padding-top: 26px;
  padding-bottom: 26px;
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
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>
