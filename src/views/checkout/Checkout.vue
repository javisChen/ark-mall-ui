<script setup lang="ts">

import {reactive, toRefs, onMounted, computed} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {getCartItems, createOrder} from "../../api/trade/trade-api"
import {yuanToFen, fenToYuan} from '../../utils/util';
import {Order, OrderItem, ReceiveInfo} from "./Order.ts";

const route = useRoute();
const router = useRouter();

onMounted(async () => {
  try {
    const result = await getCartItems();
    result.data
        .filter(item => item.checked)
        .forEach(item => {
      item.specData = JSON.parse(item.specData)
    })
    data.cartList = result.data
  } catch (e) {
  }
})

const totalPrice = computed(() => {
  let total = 0;
  data.cartList
      .filter(item => item.checked)
      .forEach(item => total += item.price * item.quantity)
  return fenToYuan(total)
})

const totalQuantity = computed(() => {
  let total = 0;
  data.cartList
      .filter(item => item.checked)
      .forEach(item => total += item.quantity)
  return total
})

const getSpecValue = (item) => {
  let name = ' '
  for (let i = 0; i < item.specData.length; i++) {
    const spec = item.specData[i];
    name += spec.attrValue
    if (i < item.specData.length - 1) {
      name += ' '
    }
  }
  return name
}

const data = reactive({
  cartList: [],
  receiveInfo: {
    name: '陈嘉玮',
    mobile: '18588888888',
    province: '广东省',
    city: '广州市',
    district: '白云区',
    street: '人民街道',
    address: '文明路',
  },
  toConfirm: async () => {
    let order = new Order();
    order.orderType = 1;
    order.orderChannel = 1;
    order.orderItems = data.cartList
        .filter(item => item.checked)
        .map(item => new OrderItem(item.skuId, item.quantity))
    order.receiveInfo = new ReceiveInfo(data.receiveInfo.name, data.receiveInfo.mobile,
        data.receiveInfo.province, data.receiveInfo.city, data.receiveInfo.district, data.receiveInfo.street,
        data.receiveInfo.address);
    try {
      const result = await createOrder(order)
      await router.push({
        name: 'confirm',
        query: {id: result.data}
      })
    } catch (e) {
    }
  },
})

const {
  receiveInfo,
  toConfirm,
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
      <!-- 地址 -->
      <div class="section address">
        <div class="section-header">
          <span>收货地址</span>
        </div>
        <div class="address-list">
          <div class="address-item">
            <div class="address-info">
              <div class="name">{{ receiveInfo.name }}<span style="color: rgb(176, 176, 176);"></span></div>
              <div class="tel">{{ receiveInfo.mobile }}</div>
              <div class="address-con">
                <span>{{ receiveInfo.province }}</span>
                <span>{{ receiveInfo.city }}</span>
                <span>{{ receiveInfo.district }}</span>
                <span>{{ receiveInfo.street }}</span>
                <span class="info">{{ receiveInfo.address }}</span>
              </div>
              <div class="address-action"><span>修改</span></div>
            </div>
          </div>
          <div class="address-item">
            <div class="add-address">
              <span>添加新地址</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 商品 -->
      <div class="section">
        <div class="section-header">
          <span>商品</span>
        </div>
        <div class="goods-list">
          <div class="good-item" v-for="item in cartList">
            <div class="item-desc good-img">
              <img :src="item.picUrl">
            </div>
            <div class="item-desc good-name">
              <ah
                  href="//www.mi.com/buy?product_id=1213100005"
                  target="_blank"><span>{{ item.productName + getSpecValue(item) }}</span>
              </ah>
            </div>
            <div class="item-desc price-box">
              <div class="item-desc good-price">{{ fenToYuan(item.price) }}元 x {{ item.quantity }}</div>
              <div class="item-desc good-status"></div>
              <div class="item-desc good-total">{{fenToYuan(item.price * item.quantity)}}元</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 配送 -->
      <div class="section">
        <div class="section-options section-shipment">
          <div class="options-desc options-header">
            <div class="title">配送方式</div>
          </div>
          <div class="options-desc options-body">
            <div class="options-list">
              <div class="options-item selected">包邮</div>
            </div>
          </div>
        </div>
        <div class="section-options section-invoice">
          <div class="options-desc options-header">
            <div class="title">发票</div>
          </div>
          <div class="options-desc options-body">
            <div class="options-list">
              <div class="options-item selected">电子普通发票</div>
              <div class="options-item selected">个人</div>
              <div class="options-item selected">商品明细</div>
              <a data-log_code="bid=3515489.4&amp;bpm=25.83.3513652.1" href="javascript:void(0);"
                 class="options-item selected">
              </a>
            </div>
          </div>
        </div>
      </div>
      <!-- 计费 -->
      <div class="section count-detail">
        <div class="section-bill">
          <div class="bill-item">
            <div class="bill-name">商品件数：</div>
            <div class="bill-money">{{ totalQuantity }}件</div>
          </div>
          <div class="bill-item">
            <div class="bill-name">商品总价：</div>
            <div class="bill-money">{{ totalPrice }}元</div>
          </div>
          <div class="bill-item">
            <div class="bill-name">活动优惠：</div>
            <div class="bill-money">-0元</div>
          </div>
          <div class="bill-item">
            <div class="bill-name">优惠券抵扣：</div>
            <div class="bill-money">-0元</div>
          </div>
          <div class="bill-item">
            <div class="bill-name">运费：</div>
            <div class="bill-money">0元</div>
          </div>
          <div class="bill-item total-price">
            <div class="bill-name">应付总额：</div>
            <div class="bill-money"><em>{{ totalPrice }}</em>元</div>
          </div>
        </div>
      </div>
      <div class="cart-bar">
        <div class="btn-box">
          <a class="btn return-btn">返回购物车</a>
          <a class="btn primary-btn" @click="toConfirm">立即下单</a>
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

.address {
  padding: 0 24px;
}

.section .section-header {
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

.goods-list {
  padding: 5px 0;
  border-bottom: 1px solid #e0e0e0;
}

.goods-list .good-item {
  padding: 15px 0;
}

.good-item .item-desc {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 1;
  color: #424242;
  vertical-align: middle;
}

.good-item .good-img {
  width: 30px;
  height: 30px;
  margin: 0 10px 0 0;
}

.good-item .good-name {
  width: 650px;
}

.good-name a {
  color: #424242;
}

.good-item .good-price {
  width: 150px;
  text-align: center;
}

.good-item .good-status {
  width: 100px;
  text-align: center;
}

.good-item .good-total {
  width: 190px;
  text-align: right;
  color: #ff6701;
}

.section .section-options {
  padding: 25px 0;
  border-bottom: 1px solid #e0e0e0;
}

.section .section-options .options-header .title {
  color: #333;
  font-size: 18px;
  line-height: 38px;
}

.section .section-options .options-desc {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.section .section-options .options-list {
  width: 960px;
}

.section .section-options .options-list .selected {
  border-color: #fff;
  color: #ff6700;
}


.section-options .options-header {
  width: 150px;
}

.section-options .options-desc {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.section-options .options-list .options-item {
  display: inline-block;
  height: 38px;
  line-height: 38px;
  margin-right: 14px;
  border: 1px solid #fff;
  color: #333;
}

.section .section-options .options-header .title {
  color: #333;
  font-size: 18px;
  line-height: 38px;
}

.count-detail {
  position: relative;
  min-height: 200px;
  padding: 20px 0;
  margin: 0 48px;
}

.count-detail .section-bill {
  position: absolute;
  right: 0;
  bottom: 20px;
}

.count-detail .section-bill .bill-item {
  position: relative;
  padding-left: 126px;
  line-height: 2;
  text-align: right;
}

.count-detail .section-bill .bill-item .bill-name {
  position: absolute;
  top: 0;
  left: 0;
  width: 126px;
  white-space: nowrap;
  color: #757575;
}

.count-detail .section-bill .bill-item .bill-money {
  color: #ff6700;
}

.count-detail .section-bill .total-price {
  margin: 10px 0 0;
}

.count-detail .section-bill .total-price em {
  font-size: 30px;
  line-height: 1;
}

.cart-bar {
  height: 50px;
  margin-top: 25px;
  background-color: #FFFFFF;
  color: #757575;
  font-size: 14px;
  width: 100%;
  position: relative;
  border-top: 2px solid #f5f5f5;
}

.primary-btn {
  border-color: #ff6700;
  background: #ff6700;
  color: #fff;
}

.return-btn {
  margin-left: 30px;
  color: #b0b0b0;
  transition: all .4s;
  background-color: #fff;
  border: 1px solid #b0b0b0;
}

.cart-bar .btn-box {
  height: 100%;
  margin-left: 50px;
  display: flex;
  justify-content: end;
  flex-direction: row;
  align-items: center;
  padding-right: 30px;
}

.btn-box .btn {
  margin-left: 30px;
  border: 1px solid #b0b0b0;
  outline: none;
  width: 158px;
  height: 38px;
  padding: 0;
  font-size: 14px;
  line-height: 38px;
  text-align: center;
  cursor: pointer;
  -webkit-transition: all .4s;
  transition: all .4s;
}

</style>
