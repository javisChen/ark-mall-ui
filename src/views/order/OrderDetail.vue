<script setup lang="ts">

import {onMounted, reactive, toRefs} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {getOrderInfo} from "@/api/trade/trade-api"
import {DICT_ORDER_STATUS_WAIT_PAY} from '@/utils/constants'
import OrderInfo from "@/views/order/OrderInfo.vue";
import {Order} from "@/views/order/Order";
import OrderSteps from "@/views/order/OrderSteps.vue";
import OrderProduct from "@/views/order/OrderProduct.vue";

const route = useRoute();
const router = useRouter();

onMounted(() => {
  data.loadOrder()
})

const data = reactive({
  order: {} as Order,

  loadOrder: async () => {
    try {
      const result = await getOrderInfo({
        id: route.params.id
      });
      data.order = result.data
    } catch (e) {
      console.log(e);
    }
  },
  toConfirm: async () => {

  },
  toCashier: () => {
    router.push({
      name: 'cashier',
      query: {id: data.order.orderBase.id}
    })
  },
})

const {
  toCashier,
  order,
} = toRefs(data)

</script>

<template>
  <div class="mi-uc-box" v-if="order && order.orderBase">
    <div class="box-hd">
      <h1 class="title">
        订单详情
      </h1>
      <div class="more clearfix">
        <div class="actions">
          <div class="status-btn-box">
            <a title="取消订单" class="btn btn-small btn-line-gray">取消订单</a>
            <a v-if="order.orderBase.orderStatus === DICT_ORDER_STATUS_WAIT_PAY"
                @click="toCashier"
                title="立即付款"
                class="btn btn-small btn-primary">立即付款</a>
          </div>
        </div>
      </div>
    </div>

    <!--    -->
    <div class="box-bd">

      <order-steps :order="order"/>

      <order-info :order="order"/>

      <div class="order-detail">

        <order-product :order="order"/>

      </div>

      <div class="order-detail-total">
        <table class="total-table">
          <tbody>
          <tr>
            <th>商品总价：</th>
            <td><span class="num">{{ $filters.formatShowPrice(order.orderAmount.actualAmount) }}</span></td>
          </tr>
          <tr>
            <th>运费：</th>
            <td><span class="num">0</span></td>
          </tr>
          <tr>
            <th class="total">应付金额：</th>
            <td class="total"><span class="num">{{ $filters.formatShowPrice(order.orderAmount.actualAmount) }}</span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style>
.mi-uc-box .box-hd .title {
  margin: 0;
  font-size: 30px;
  font-weight: 400;
  line-height: 68px;
  color: #757575;
}

.mi-uc-box {
  padding: 36px 48px;
  background: #fff;
}

.mi-uc-box .box-hd .more {
  border-bottom: 1px solid #e0e0e0;
  vertical-align: center;
}

.mi-uc-box .box-hd .subtitle {
  float: left;
  font-size: 18px;
  font-weight: 400;
  color: #333;
}

.mi-uc-box .box-hd .actions {
  float: right;
  padding-top: 5px;
  margin-bottom: 15px;
}

.mi-uc-box .box-hd .actions .btn {
  margin-left: 5px;
}

.btn-line-gray {
  color: #757575;
}

.order-detail {
  padding: 25px 0;
}

.progress-list .step-active {
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: #83c44e;
  color: #fff;
}

.progress-list .step-active-already {
  /*border-top-right-radius: 20px;*/
  /*border-bottom-right-radius: 20px;*/
  background-color: #83c44e;
  color: #fff;
}

.order-liwu {
  background: #eee;
  padding: 30px 0;
  margin-bottom: 10px;
}

.order-liwu .box {
  margin: 0 30px;
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

.total-table {
  margin: 0 0 0 auto;
  color: #757575;
}

.total-table th {
  width: 200px;
  font-weight: 400;
  text-align: right;
}

.total-table td {
  text-align: right;
  color: #ff6700;
  padding: 5px 0;
}

.order-detail-info .actions {
  position: absolute;
  top: 5px;
  right: 0;
}

.num {
  margin-right: .125em;
}

.total-table td.total .num, .total-table th.total .num {
  font-size: 30px;
  font-weight: 200;
  line-height: 1;
}

</style>
