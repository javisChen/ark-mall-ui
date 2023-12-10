<template>
  <div class="order-summary">
    <div class="order-status">
      <div>{{ $filters.translateOrderStatus(order.orderBase.orderStatus) }}</div>
    </div>
    <div class="order-progress">
      <ol class="progress-list clearfix">
        <li class="step">
          <div class="progress"
               :class="[stepStyle(1)]"><span class="text">下单</span></div>
          <div class="info">{{ order.orderBase.createTime }}</div>
        </li>
        <li class="step">
          <div class="progress"
               :class="[stepStyle(2)]"><span class="text">付款</span></div>
          <div class="info">{{ order.orderBase.payTime }}</div>
        </li>
        <li class="step">
          <div class="progress"
               :class="[stepStyle(3)]"><span class="text">发货</span></div>
          <div class="info">{{ order.orderBase.deliverTime }}</div>
        </li>
        <li class="step step-last">
          <div class="progress"
               :class="[stepStyle(4)]"><span class="text">收货</span></div>
          <div class="info">{{ order.orderBase.receiveTime }}</div>
        </li>
      </ol>
    </div>
  </div>
</template>
<script setup lang="ts">

import {Order} from "@/views/order/Order";

import {reactive, toRefs} from "vue";

const props = defineProps({
  order: {
    type: Object,
    required: true
  }
});

const data = reactive({
  stepStyle: (step) => {
    let orderStatus = props.order.orderBase.orderStatus;
    if (orderStatus > step) {
      return 'step-active-already'
    } else if (orderStatus === step) {
      return 'step-active'
    }
    return ''
  },
})

const {
  stepStyle,
} = toRefs(data)

</script>
<style>

.progress-list {
  width: 95%;
  margin: 0 auto;
  padding: 0;
  list-style-type: none;
  border-radius: 20px;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  color: #424242;
  background-color: #eee;
  display: flex;
}

.progress-list .step {
  -webkit-box-flex: 0;
  -ms-flex: 0 1 220px;
  flex: 0 1 220px;
  height: 20px;
}

.progress-list .step .info {
  color: gray;
}

.order-liwu .box h3 {
  margin: 0;
  padding: 0;
  font-size: 18px;
  color: #333;
  font-weight: 400;
}

.order-liwu .box p {
  font-size: 14px;
  line-height: 22px;
  color: #757575;
}

.goods-table .goods-box td {
}

.goods-table .figure-thumb a {
  display: block;
}

.goods-table .name a {
  color: #333;
}

table > tr {
  vertical-align: middle;
}

.order-detail-info h3 {
  margin: 0 0 15px;
  font-size: 18px;
  font-weight: 400;
  color: #333;
}


.order-detail-info .info-table th {
  font-weight: bold;
  padding: 5px 0;
  text-align: left;
}

.total-table th {
  font-weight: 400;
  text-align: right;
}

.total-table td {
  text-align: right;
  color: #ff6700;
  padding: 5px 0;
}

.order-summary {
  display: flex;
  height: 200px;
  border: 1px solid #e0e0e0;
}

.order-status {
  width: 20%;
  text-align: center;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}

.order-progress {
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid #e0e0e0;
}


</style>