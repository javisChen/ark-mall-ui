<script setup lang="ts">

import {reactive, toRefs, defineComponent} from 'vue';

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
      <div class="section section-order">
        <div class="order-info clearfix">
          <div class="fl"><h2 class="title">订单提交成功！去付款咯～</h2><p
              class="order-time"><span>请在<span
              class="pay-time-tip">0 小时 14 分</span><span
          >内完成支付, 超时后将取消订单</span></span></p>
            <p class="post-info" style="display: none;">收货信息：陈嘉玮 185****6716 广东 广州市 越秀区
              人民街道 沿江路203号</p></div>
          <div class="fr">
            <div class="total">应付总额：<span class="money">
              <em>10067</em>
              <span>元</span>
            </span>
            </div>
            <a href="javascript:void(0);" class="show-detail">订单详情
              <i class="iconfont"></i>
            </a>
          </div>
        </div>
        <i class="iconfont icon-right">√</i>
        <div class="order-detail J_showOrderDetail" style="height: 213px;">
          <ul>
            <li class="clearfix">
              <div class="label"> 订单号：</div>
              <div class="content"><span class="order-num">5220901846507022</span>
              </div>
            </li>
            <li class="clearfix">
              <div class="label"> 收货信息：</div>
              <div class="content">陈嘉玮 185****6716 广东 广州市 越秀区 人民街道 沿江路203号</div>
            </li>
            <li class="clearfix">
              <div class="label"> 商品名称：</div>
              <div class="content"><span>小米电视6 65" OLED 黑色</span><span
              >Redmi Buds 4 Pro 镜湖白</span><span>Redmi K50 至尊版 8GB+128GB 雅黑</span>
              </div>
            </li>
            <li class="clearfix hide">
              <div class="label"> 配送时间：</div>
              <div class="content">不限送货时间</div>
            </li>
            <li class="clearfix">
              <div class="label"> 发票信息：</div>
              <div class="content">电子普通发票 个人</div>
            </li>
          </ul>
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

.section {
  padding: 0 24px;
}

.address-info .address-con span {
  margin-right: 3px;
  word-wrap: break-word;
  display: inline-block;
}

.count-detail .section-bill .total-price em {
  font-size: 30px;
  line-height: 1;
}

.page-main .section-order {
  padding-left: 183px;
  position: relative;
}
</style>
