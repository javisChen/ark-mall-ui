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
        <span class="tips">温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
      </div>
    </div>
  </div>
  <div class="main">
    <div class="container">
      <div class="cart-table">
        <div class="cart-table-row">
          <div class="cart-table-col">全选</div>
          <div class="cart-table-col"></div>
          <div class="cart-table-col">商品名称</div>
          <div class="cart-table-col">单价</div>
          <div class="cart-table-col">数量</div>
          <div class="cart-table-col">小计</div>
          <div class="cart-table-col">操作</div>
        </div>
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
  background-color: #FFFFFF;
}

</style>
