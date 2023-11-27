<script setup lang="ts">

import {onMounted, reactive, toRefs} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {getUserOrders} from "@/api/trade/trade-api"
import {Order, OrderItem, ReceiveInfo} from "./Order.ts";
import {useCartStore} from "@/store/cart";
import BizLoading from "@/components/BizLoading.vue";
import CommonTopBar from "../common/CommonTopBar.vue";

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();

onMounted(async () => {
  try {
    const result = await getUserOrders({});
    data.orders = result.data.records
  } catch (e) {
    console.log(e);
  }
})

const data = reactive({
  orders: [],
  createOrderLoading: false,
  toCartPage: () => {
    router.push({
      name: 'cart'
    })
  },
  toConfirm: async () => {
  },
})

const {
  orders
} = toRefs(data)


</script>

<template>
  <div class="uc-content-box order-list-box">
    <div class="box-hd">
      <h1 class="title">
        我的订单
      </h1>
      <div class="more clearfix">
        <ul class="filter-list">
          <li class="first active"><a data-stat-id="57897755adc8c1e0" href="javascript:void(0);">全部有效订单</a></li>
          <li class="">
            <a href="javascript:void(0);">
              待支付
            </a>
          </li>
          <li class="">
            <a href="javascript:void(0);">
              待收货
            </a>
          </li>
          <li class="">
            <a data-stat-id="1591d5f9a89e8bb6" href="javascript:void(0);">订单回收站</a>
          </li>
        </ul>
        <div class="search-form clearfix">
          <label for="search" class="hide">站内搜索</label>
          <input name="keywords"
                 type="button" value="" class="search-btn">
        </div>
      </div>
    </div>

    <!--    -->
    <div class="box-bd">
      <div>
        <ul class="order-list">
          <p v-if="orders.length === 0" class="empty">当前没有交易订单。</p>
          <li v-else
              v-for="(order, idx) in orders"
              class="uc-order-item uc-order-item-pay">
            <div class="order-detail">
              <div class="order-summary">
                <div class="order-status">
                  等待付款
                </div>
              </div>
              <table class="order-detail-table">
                <thead>
                <tr>
                  <th class="col-main"><p class="caption-info">
                    {{ order.gmtCreate }}
                    <span class="sep">|</span>
                    {{ order.buyerName }}
                    <span class="sep">|</span>
                    订单号：<a href="//www.mi.com/user/orderView?order_id=5231127733200098">{{ order.tradeNo }}</a><span
                      class="sep">|</span>
                    在线支付
                  </p></th>
                  <th class="col-sub"><p class="caption-price">
                    应付金额：
                    <span class="num">{{ $filters.formatShowPrice(order.actualAmount) }}</span>元
                  </p></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td class="order-items">
                    <ul class="goods-list">
                      <li>
                        <div class="figure figure-thumb"><a
                            href="//www.mi.com/buy?product_id=1230800169"
                            target="_blank"><img
                            src="//cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1681708013.08067335.png?thumb=1&amp;w=80&amp;h=80"
                            width="80"
                            height="80"
                            alt="Xiaomi Pad 6 Pro 8GB+128GB 黑色"></a>
                        </div>
                        <p class="name"><a
                            href="//www.mi.com/buy?product_id=1230800169"
                            target="_blank">Xiaomi Pad 6 Pro 8GB+128GB 黑色</a>
                        </p>
                        <p class="price">
                          2499元 × 1
                        </p></li>
                    </ul>
                  </td>
                  <td class="order-actions"><a
                      href="//www.mi.com/buy/confirm?id=5231127733200098"
                      target="_blank" class="btn btn-small btn-primary">立即付款</a>
                    <a href="//www.mi.com/user/orderView?order_id=5231127733200098"
                       class="btn btn-small btn-line-gray">订单详情</a>
                    <a href="javascript:void(0)"
                       class="btn btn-small btn-line-gray btn-contract">联系客服</a>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>

.order-list-box .order-list .uc-order-item-pay .order-detail-table th {
  background: #fffaf7;
  border-bottom: 1px solid #feccac;
}

.order-list-box .order-detail-table th .sep {
  color: #e0e0e0;
}

.order-list-box .order-detail-table th p {
  margin: 0;
}

.order-list-box .goods-list {
  margin: 0;
  padding: 10px 0;
  list-style-type: none;
}

.order-list-box .goods-list .figure-thumb {
  position: absolute;
  left: 0;
  top: 0;
}

.order-list-box .goods-list .price {
  margin: 0;
}

.order-list-box .order-detail-table .order-actions {
  padding-top: 20px;
  text-align: right;
  vertical-align: top;
}

.order-list-box .btn-line-gray {
  border-color: #b0b0b0;
  background: #fff;
  color: #757575;
}

.order-list-box .order-detail-table .order-actions .btn {
  display: block;
  margin: 0 0 10px auto;
}

.order-list-box .goods-list .name {
  margin: 0;
}


.order-list-box .goods-list .name a {
  color: #333;
}

.order-list-box .goods-list li {
  position: relative;
  height: 44px;
  margin: 10px 0;
  padding: 18px 18px 18px 100px;
  line-height: 22px;
  color: #333;
}

.order-list-box .order-detail-table td {
  padding: 0 30px;
}

.order-list-box .order-detail-table th .num {
  height: 18px;
  margin-right: 5px;
  font-size: 28px;
  font-weight: 200;
  line-height: 1;
  color: #333;
}

.order-list-box .order-detail-table th p {
  margin: 0;
}

.order-list-box .order-detail-table {
  width: 100%;
}

.order-list-box .order-list .uc-order-item-pay .order-summary {
  background: #fffaf7;
}

.order-list-box .order-list .uc-order-item-pay .order-desc, .order-list-box .order-list .uc-order-item-pay .order-status {
  color: #ff6700;
}

.order-list-box .order-list .uc-order-item .order-status {
  font-size: 18px;
}

.order-list-box .order-detail-table th p {
  margin: 0;
}

.ndash, .sep {
  margin: 0 .25em;
  font-family: sans-serif;
}

.order-list-box .order-detail-table th {
  height: 28px;
  padding: 0 30px 24px;
  border-bottom: 1px solid #e0e0e0;
  font-weight: 400;
  text-align: left;
  color: #757575;
  vertical-align: bottom;
}

.order-list-box .order-summary {
  padding: 25px 30px 1px;
}


.order-list-box .order-list .uc-order-item {
  margin-bottom: 20px;
  border: 1px solid #e0e0e0;
}

.order-list-box .order-list .uc-order-item-pay {
  border-color: #ff6700;
}

.uc-order-item {
  position: relative;
}

.uc-box .uc-content-box .box-hd .title {
  margin: 0;
  font-size: 30px;
  font-weight: 400;
  line-height: 68px;
  color: #757575;
}

.uc-box .uc-content-box .box-hd .more {
  border-bottom: 0;
}

.uc-box .uc-content-box .box-hd .filter-list {
  float: left;
  margin: 0;
  padding: 18px 0;
  list-style-type: none;
  font-size: 16px;
  line-height: 1.25;
}

.uc-box .uc-content-box .box-hd .filter-list li.first {
  padding-left: 0;
  border-left: 0;
}

.uc-box .uc-content-box .box-hd .filter-list li {
  float: left;
  padding: 0 20px;
  border-left: 1px solid #e0e0e0;
  color: #757575;
}

.uc-box .uc-content-box .box-hd .filter-list a {
  color: #757575;
  cursor: pointer;
}

.uc-box .uc-content-box .box-hd .search-form {
  float: right;
  position: relative;
  width: 262px;
  height: 40px;
  margin-top: 8px;
}

.uc-box .uc-content-box .box-hd .search-btn, .uc-box .uc-content-box .box-hd .search-text {
  position: absolute;
  top: 0;
  border: 1px solid #e0e0e0;
  outline: 0;
  -webkit-transition: all .2s;
  transition: all .2s;
}

.uc-box .uc-content-box .box-hd .search-btn {
  right: 0;
  z-index: 2;
  width: 42px;
  height: 42px;
  font-size: 24px;
  line-height: 24px;
  background: #fff;
  color: #616161;
}

.order-list-box .order-list {
  margin: 0;
  padding: 10px 0;
  list-style-type: none;
}

.order-list-box .empty {
  margin: 40px 0;
  font-size: 18px;
  text-align: center;
  color: #b0b0b0;
}

</style>
