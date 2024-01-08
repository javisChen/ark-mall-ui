<script setup lang="ts">

import {onMounted, reactive, toRefs} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {createOrder, saveUserReceives, getUserReceives} from "@/api/trade/trade-api"
import {Order, OrderItem, ReceiveInfo} from "./Order.ts";
import {useCartStore} from "@/store/cart";
import BizLoading from "@/components/BizLoading.vue";
import AddressForm from "./AddressForm.vue";
import CommonTopBar from "../common/CommonTopBar.vue";

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();

onMounted(() => {
  data.loadUserReceives()
})

const data = reactive({
  carts: [],
  showAddressForm: false,
  createOrderLoading: false,
  selectedReceiveInfo: null as ReceiveInfo,
  userReceives: [],
  toCartPage: () => {
    router.push({
      name: 'cart'
    })
  },
  loadUserReceives: async () => {
    const result = await getUserReceives({
      current: 1,
      size: 20
    });
    const {records} = result.data
    if (records && records.length > 0) {
      data.selectedReceiveInfo = records[0]
      data.userReceives = records
    }
  },
  onAddressSubmitOk: (district) => {
    data.loadUserReceives();
    data.showAddressForm = false
  },
  receiveOnSelected: (receive) => {
    data.selectedReceiveInfo = receive
  },
  doCreateOrder: async () => {
    if (!data.selectedReceiveInfo) {
      window.$message.warning('请选择收货地址!')
      return;
    }
    const orderItems = cartStore.checkedCartItems.map(item => new OrderItem(item.skuId, item.quantity));
    if (!orderItems || orderItems.length === 0) {
      window.$message.warning('请先去添加商品到购物车吧!')
      return;
    }

    data.createOrderLoading = true
    let order = new Order();
    order.orderType = 1;
    order.orderChannel = 1;
    order.orderItems = orderItems
    order.receiveInfo = data.selectedReceiveInfo;
    try {
      const result = await createOrder(order)
      setTimeout(() => {
        router.push({
          name: 'cashier',
          query: {id: result.data}
        })
        data.createOrderLoading = false
      }, 800)
    } catch (e) {
      data.createOrderLoading = false
      console.log(e)
    }
  },
})

const {
  receiveOnSelected,
  showAddressForm,
  onAddressSubmitOk,
  createOrderLoading,
  userReceives,
  selectedReceiveInfo,
  doCreateOrder,
  toCartPage
} = toRefs(data)


</script>

<template>

  <common-top-bar/>

  <biz-loading
      description="订单生成中..."
      :show="createOrderLoading"/>

  <div class="header">
    <address-form :show="showAddressForm" @submit-ok="onAddressSubmitOk"/>
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
          <div class="address-item"
               v-if="userReceives && userReceives.length > 0"
               v-for="(receiveInfo, idx) in userReceives"
               :class="(selectedReceiveInfo?.id === receiveInfo.id) || (!selectedReceiveInfo && idx === 0) ? 'active' : ''"
               @click="receiveOnSelected(receiveInfo)"
          >
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
            <div @click="() => showAddressForm = true" class="add-address">
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
          <div class="good-item" v-for="item in cartStore.checkedCartItems">
            <div class="item-desc good-img">
              <img :src="item.picUrl" alt="">
            </div>
            <div class="item-desc good-name">
              <a href="javascript:void(0)">
                <span>{{ item.showProductName }}</span>
              </a>
            </div>
            <div class="item-desc price-box">
              <div class="item-desc good-price">{{ $filters.formatShowPrice(item.price) }} x {{ item.quantity }}</div>
              <div class="item-desc good-status"></div>
              <div class="item-desc good-total">{{ $filters.formatShowPrice(item.price * item.quantity) }}</div>
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
            <div class="bill-money">{{ cartStore.totalQuantity }}件</div>
          </div>
          <div class="bill-item">
            <div class="bill-name">商品总价：</div>
            <div class="bill-money">{{ $filters.formatShowPrice(cartStore.totalPrice) }}</div>
          </div>
          <div class="bill-item">
            <div class="bill-name">活动优惠：</div>
            <div class="bill-money">- {{ $filters.formatShowPrice(0) }}</div>
          </div>
          <div class="bill-item">
            <div class="bill-name">优惠券抵扣：</div>
            <div class="bill-money">- {{ $filters.formatShowPrice(0) }}</div>
          </div>
          <div class="bill-item">
            <div class="bill-name">运费：</div>
            <div class="bill-money">- {{ $filters.formatShowPrice(0) }}</div>
          </div>
          <div class="bill-item total-price">
            <div class="bill-name">应付总额：</div>
            <div class="bill-money"><em>{{ $filters.formatShowPrice(cartStore.totalPrice) }}</em></div>
          </div>
        </div>
      </div>
      <div class="cart-bar">
        <div class="btn-box">
          <a class="btn return-btn" @click="toCartPage">返回购物车</a>
          <a class="btn primary-btn" @click="doCreateOrder">立即下单</a>
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
  width: 80px;
  height: 80px;
}

.good-item .good-img img {
  width: 100%;
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
  color: #f9f9fa;
  transition: all .4s;
  background-color: #b0b0b0;
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

.address-item.active {
  border-color: #ff6700;
}
</style>
