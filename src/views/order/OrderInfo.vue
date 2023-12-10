<template>
  <div class="order-detail-info">
    <h3>订单信息</h3>
    <div class="info-table-wrapper">
      <table class="info-table">
        <tbody>
        <tr>
          <th>订单编号：</th>
          <td>{{ order.orderBase.tradeNo }}</td>
        </tr>
        <tr>
          <th>下单时间：</th>
          <td>{{ order.orderBase.createTime }}</td>
        </tr>
        <tr>
          <th>收货人：</th>
          <td>{{ order.orderReceive.name }}</td>
        </tr>
        <tr>
          <th>联系电话：</th>
          <td>{{ order.orderReceive.mobile }}</td>
        </tr>
        <tr>
          <th>收货地址：</th>
          <td>
            {{
            order.orderReceive.province + order.orderReceive.city + order.orderReceive.district +
            order.orderReceive.address
            }}
          </td>
        </tr>
        </tbody>
      </table>
      <table class="info-table other">
        <tbody>
        <tr>
          <th>付款方式：</th>
          <td>{{ $filters.translatePayType(order.orderBase.payType) }}</td>
        </tr>
        <tr>
          <th>付款时间：</th>
          <td>{{ order.orderBase.payTime }}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="actions"><a class="btn btn-small btn-line-gray">修改</a></div>
  </div>
</template>

<script setup lang="ts">

import {Order} from "@/views/order/Order";

defineProps({
  order: {
    type: Object,
    required: true
  }
})

</script>

<style scoped>

.mi-uc-box .box-hd .actions {
  float: right;
  padding-top: 5px;
  margin-bottom: 15px;
}

.btn-line-gray {
  color: #757575;
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

.order-detail-info {
  position: relative;
  height: auto;
  min-height: 120px;
  padding: 6px 0 12px;
  margin-bottom: 30px;
  margin-top: 30px;
}

.order-detail-info h3 {
  margin: 0 0 15px;
  font-size: 18px;
  font-weight: 400;
  color: #333;
}


.order-detail-info .info-table {
  color: #757575;
}

.order-detail-info .info-table.other {
  margin-left: 150px;
}

.order-detail-info .info-table th {
  font-weight: bold;
  padding: 5px 0;
  text-align: left;
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

.info-table-wrapper {
  display: flex;
  align-items: flex-start;
}

</style>