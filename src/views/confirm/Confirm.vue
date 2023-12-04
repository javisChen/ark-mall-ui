<script setup lang="ts">

import {reactive, toRefs, onMounted} from 'vue';
import {getOrderInfo} from "@/api/trade/trade-api"
import {getPayOrderStatus, createPayOrder} from "@/api/pay/pay-api"
import {useRoute, useRouter} from 'vue-router';
import {buildProductDesc} from '@/utils/util'
import BizLoading from "../../components/BizLoading.vue";

const route = useRoute();
const router = useRouter();

const data = reactive({
  order: {},
  createOrderLoading: false,
  orderCharge: {},
  payOrder: {},
  payTypeList: [
    {
      name: '微信支付',
      code: 'WECHAT',
      logo: '//cdn.cnbj1.fds.api.mi-img.com/mi-mall/031f3af10e3856352b847fe480b2b2e5.png'
    },
    {
      name: '支付宝',
      code: 'ALIPAY',
      logo: '//cdn.cnbj1.fds.api.mi-img.com/mi-mall/4cdfb179cdce8f95c57e8d82c469d20c.png'
    },
  ],
  receive: {},
  showModal: false
})

onMounted(async () => {
  try {
    const result = await getOrderInfo({id: route.query.id});
    result.data.orderItems.forEach(item => {
      item.specData = JSON.parse(item.specData)
    })
    data.order = result.data
    data.receive = data.order.orderReceive
    data.orderCharge = data.order.orderCharge
  } catch (e) {
    console.log(e)
  }

})

const onPay = async (item) => {
  data.createOrderLoading = true

  try {
    const createResult = await createPayOrder({
      orderId: data.order.orderBase.id,
      payTypeCode: item.code,
      description: ""
    })
    data.createOrderLoading = false
    data.showModal = true
    data.payOrder = createResult.data
  } catch (e) {
    console.log(e)
    data.createOrderLoading = false
  }
}

const submitCallback = async (item) => {
  try {
    const result = await getPayOrderStatus({id: data.payOrder.payOrderId})
    if (result.data == 3) {
      await router.push({
        name: 'paySuccess',
      })
      return true
    } else {
      window.$message.warning('未检查到已支付，请稍后再试')
      return false
    }
  } catch (e) {
    console.log(e)
  }
  return false;
}

const cancelCallback = (item) => {
  data.showModal = true
}

const {
  createOrderLoading,
  payTypeList,
  receive,
  order,
  showModal
} = toRefs(data)


</script>

<template>

  <biz-loading
      description="正在生成支付单..."
      :show="createOrderLoading"/>

  <n-modal
      v-model:show="showModal"
      preset="dialog"
      title="等待支付"
      content="支付成功后请点击【已支付】"
      positive-text="已支付"
      negative-text="稍后再支付"
      @positive-click="submitCallback"
      @negative-click="cancelCallback"
  />
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
  <div class="main" v-if="order && order.orderBase">
    <div class="container">
      <div class="section section-order">
        <div class="order-info clearfix">
          <div class="fl">
            <h2 class="title">订单提交成功！去付款咯～</h2>
            <p
                class="order-time"><span>请在<span
                class="pay-time-tip">0 小时 14 分</span><span
            >内完成支付, 超时后将取消订单</span></span></p>
            <p class="post-info" style="display: none;">收货信息：{{ receive.name }} {{ receive.mobile }}
              {{ receive.province }} {{ receive.city }} {{ receive.district }}
              {{ receive.street }} {{ receive.address }}</p></div>
          <div class="fr">
            <div class="total">应付总额：<span class="money">
              <em>{{ $filters.formatShowPrice(order.orderAmount.actualAmount) }}</em>
              <span>元</span>
            </span>
            </div>
          </div>
        </div>
        <i class="iconfont icon-right">√</i>
        <div class="order-detail J_showOrderDetail" style="height: 213px;">
          <ul>
            <li class="clearfix">
              <div class="label"> 订单号：</div>
              <div class="content">
                <span  v-if="order.orderBase" class="order-num">{{ order.orderBase.tradeNo }}</span>
              </div>
            </li>
            <li class="clearfix">
              <div class="label"> 收货信息：</div>
              <div class="content">{{ receive.name }} {{ receive.mobile }} {{ receive.province }} {{ receive.city }}
                {{ receive.district }}
                {{ receive.street }} {{ receive.address }}
              </div>
            </li>
            <li class="clearfix">
              <div class="label"> 商品名称：</div>
              <div class="content">
                <span v-for="item in order.orderItems">{{ buildProductDesc(item)}}</span>
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
      <div class="section confirm-pay">
        <div class="section section-payment">
          <div class="cash-title">
            <div>选择以下支付方式付款</div>
          </div>
          <div class="payment-box">
            <div class="payment-header clearfix"><h3 class="title">支付工具</h3><span class="desc"></span></div>
            <div class="payment-body">
              <ul class="clearfix payment-list J_paymentList">
                <li v-for="item in payTypeList"
                    @click="onPay(item)"
                    type="alipay"
                    class="J_bank"><img
                    :src="item.logo">
                </li>
              </ul>
            </div>
          </div>
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

.section-order {
  padding-left: 183px;
  position: relative;
  padding-bottom: 30px;
  margin-bottom: 30px;
}

.order-info {
  padding: 20px 0;
}

.order-info .fl {
  float: left;
}

.order-info .fr {
  float: right;
  text-align: right;
}

.order-info .title {
  margin-bottom: 10px;
  font-size: 24px;
  font-weight: 400;
  line-height: 36px;
}

.order-info .post-info {
  color: #616161;
  -webkit-transition: height .3s ease;
  transition: height .3s ease;
}

.order-info .order-time {
  color: #616161;
  margin-bottom: 5px;
  line-height: 2;
}

.order-info .total {
  margin-bottom: 10px;
  color: #757575;
}

.order-detail ul {
  padding: 20px 0 0 0;
  margin-top: 10px;
}

.order-detail li {
  line-height: 24px;
  margin-bottom: 8px;
  color: #333;
}

.section-order .icon-right {
  width: 80px;
  height: 80px;
  line-height: 80px;
  position: absolute;
  top: 40px;
  left: 50px;
  font-size: 80px;
  color: #83c44e;
  text-align: center;
  border: 2px solid #83c44e;
  border-radius: 42px;
  overflow: hidden;
}

.order-info .order-time span.pay-time-tip {
  margin: 0 5px;
  color: #ff6700;
}

.confirm-pay {
}

.confirm-pay .cash-title {
  height: 50px;
  margin-bottom: 30px;
  border-bottom: 1px solid #e0e0e0;
  font-size: 18px;
}

.money em {
  font-style: normal;
  font-size: 24px;
}

.payment-box {
  margin-bottom: 30px;
}

.order-info .total {
  margin-bottom: 10px;
  color: #757575;
}

.money {
  color: #ff6700;
  font-size: 14px;
}

.clearfix:after, .clearfix:before {
  content: " ";
  display: table;
  clear: both;
}

.payment-header .title {
  float: left;
  font-size: 16px;
  color: #616161;
  font-weight: bold;
}

.payment-list {
  margin: 0 0 0 -14px;
  padding: 0;
  overflow: hidden;
}

.payment-header {
  margin-bottom: 15px;
}

.payment-list li {
  float: left;
  width: 174px;
  height: 60px;
  line-height: 60px;
  margin-left: 14px;
  margin-bottom: 14px;
  border: 1px solid #e0e0e0;
  text-align: center;
  cursor: pointer;
  overflow: hidden;
  -webkit-transition: all .4s;
  transition: all .4s;
}

.order-detail .content {
  float: left;
}

.order-detail .content span {
  display: block;
}

.order-detail .order-num {
  color: #ff6700;
}

.order-detail .label {
  float: left;
  width: 85px;
}

</style>
