<script setup lang="ts">

import CommonTopBar from "../common/CommonTopBar.vue";
import {reactive, toRefs, defineComponent} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {NCheckbox} from 'naive-ui'

const data = reactive({
  cartList: [
    {
      id: 1,
      name: 'Redmi Note 11T Pro  6GB+128GB 子夜黑',
      picUrl: '@/assets/img/seckill/shop/t.jpg',
      price: 1699,
      quantity: 1,
      subTotal: 1699
    },
    {
      id: 1,
      name: 'Redmi Note 11T Pro  6GB+128GB 子夜黑',
      picUrl: '@/assets/img/seckill/shop/t.jpg',
      price: 1699,
      quantity: 1,
      subTotal: 1699
    },
  ]
})

const {
  cartList,
} = toRefs(data)


</script>

<template>
  <div class="header">
    <div class="container">
      <div class="header-logo">
        <img src="@/assets/logo-mi.png" alt="">
      </div>
      <div class="header-title">
        <span>确认订单</span>
      </div>
    </div>
  </div>
  <div class="main">
    <div class="container">
      <div class="address">
        <div class="address-title">
          <span>收货地址</span>
        </div>
        <div class="address-list">
          <div class="address-item">
            <div class="address-info">
              <div class="name">陈嘉玮<span style="color: rgb(176, 176, 176);"></span></div>
              <div class="tel">185****6716</div>
              <div class="address-con">
                <span>广东</span>
                <span>广州市</span>
                <span>越秀区</span>
                <span>人民街道</span>
                <span class="info">沿江路203号</span>
              </div>
              <div class="address-action"><span>修改</span><!----></div>
            </div>
          </div>
          <div class="address-item">
            <div class="add-address">
              <span>添加新地址</span>
            </div>
          </div>
        </div>
      </div>
      <div class="cart-bar">
        <div class="btn-box">
          <button class="settle primary-bg">去结算</button>
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

.main {
  margin-top: 38px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.main .container {
  width: 1226px;
  padding: 48px 0 0;
  background-color: #FFFFFF;
}

.address {
  padding: 0 24px;
}

.address .address-title {
  color: #333;
  font-size: 18px;
  line-height: 20px;
  margin-left: 20px;
  margin-bottom: 20px;
}

.address .address-item {
  display: inline-block;
  width: 268px;
  height: 178px;
  border: 1px solid #e0e0e0;
  cursor: pointer;
  position: relative;
  margin-right: 17px;
  margin-bottom: 20px;
  vertical-align: top;
  -webkit-transition: all .4s ease;
  transition: all .4s ease;
}

.address-item .address-info {
  line-height: 22px;
  color: #757575;
  padding: 15px 24px 0;
}

.address-info .address-con span {
  margin-right: 3px;
  word-wrap: break-word;
  display: inline-block;
}

.address-info .address-con .info {
  width: 100%;
}

.address-info .address-action {
  text-align: right;
  position: absolute;
  right: 24px;
  bottom: 10px;
  /*opacity: 0;*/
}

.address-action span {
  color: #ff6700;
  margin-left: 10px;
}

.add-address {
  text-align: center;
  line-height: 178px;
}

.address-info .name {
  font-size: 18px;
  color: #333;
  line-height: 30px;
  margin-bottom: 10px;
}

.cart-bar {
  display: flex;
  flex-direction: row;
  height: 50px;
  margin-top: 25px;
  background-color: #FFFFFF;
  color: #757575;
  font-size: 14px;
  align-items: center;
  width: 100%;
  position: relative;
}

.cart-bar .btn-box {
  height: 100%;
  border: 1px solid red;
  margin-left: 50px;
}

.cart-bar .btn-box .settle {
  width: 200px;
  outline: none;
  border: 0;
  height: 100%;
  color: #FFFFFF;
  font-size: 16px;
}

</style>
