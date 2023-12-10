<script setup lang="ts">

import {onMounted, reactive, toRefs} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {getUserOrders, orderReceive} from "@/api/trade/trade-api"
import {useCartStore} from "@/store/cart";
import {buildSpecDesc} from '@/utils/util'
import image404 from '@/assets/image404.png';

import {
  DICT_ORDER_STATUS_WAIT_PAY,
  DICT_ORDER_STATUS_WAIT_DELIVER,
  DICT_ORDER_STATUS_WAIT_RECEIVE,
  DICT_ORDER_STATUS_COMPLETED
} from '@/utils/constants'

import {ButtonProps, DialogProps} from "naive-ui";

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();

onMounted(() => {
  data.loadOrders()
})

const data = reactive({
  orders: [],
  selectedStatus: '',
  ordersLoading: true,
  statusFilters: [
    {
      label: '全部',
      value: ''
    },
    {
      label: '待支付',
      value: DICT_ORDER_STATUS_WAIT_PAY
    },
    {
      label: '待发货',
      value: DICT_ORDER_STATUS_WAIT_DELIVER
    },
    {
      label: '待收货',
      value: DICT_ORDER_STATUS_WAIT_RECEIVE
    },
    {
      label: '已完成',
      value: DICT_ORDER_STATUS_COMPLETED
    }],
  orderPage: {
    page: 1,
    pageSize: 5,
    count: 0
  },
  createOrderLoading: false,
  onPageUpdate: (page) => {
    data.orderPage.page = page
    data.loadOrders();
  },
  onStatusFilterSelected: (status) => {
    data.selectedStatus = status.value
    data.loadOrders();
  },
  loadOrders: async () => {
    data.ordersLoading = true
    const {page, pageSize} = data.orderPage
    try {
      const result = await getUserOrders({
        current: page,
        size: pageSize,
        orderStatus: data.selectedStatus
      });

      const {records, current, size, total} = result.data
      data.orders = records
      data.orderPage.page = current
      data.orderPage.pageSize = size
      data.orderPage.count = total
    } catch (e) {
      console.log(e);
    } finally {
      data.ordersLoading = false
    }
  },
  toOrderDetailPage: (order) => {
    router.push({
      path: `order/${order.orderBase.id}`
    })
  },
  confirmReceive: async (order) => {
    window.$dialog.warning(<DialogProps>{
      title: '确认收货',
      content: '确认商品已经成功收货了吗？',
      positiveText: '确定',
      negativeText: '取消',
      negativeButtonProps: <ButtonProps>{
        type: "tertiary",
        secondary: true
      },
      onPositiveClick: async () => {
        try {
          await orderReceive({
            orderId: order.orderBase.id,
          });
          await data.loadOrders()
        } catch (e) {
          console.log(e)
        }
      },
      onNegativeClick: () => {

      }
    })
  },
  toCartPage: () => {
    router.push({
      name: 'cart'
    })
  },
  toCashier: (order) => {
    router.push({
      name: 'cashier',
      query: {id: order.orderBase.id}
    })
  },
  toConfirm: async () => {
  },
  onPicError: async (orderItem) => {
    orderItem.picUrl = image404
  },
})

const {
  toCashier,
  confirmReceive,
  toOrderDetailPage,
  onPicError,
  onStatusFilterSelected,
  selectedStatus,
  statusFilters,
  ordersLoading,
  onPageUpdate,
  orders,
  orderPage
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
          <li :class="selectedStatus === status.value ? ' active' : ''"
              class="first" v-for="status in statusFilters">
            <a @click="onStatusFilterSelected(status)"
               href="javascript:void(0);">{{ status.label }}</a>
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
        <n-spin :show="ordersLoading">
          <ul class="order-list">
            <p v-if="orders.length === 0" class="empty">当前没有交易订单。</p>
            <li v-else
                v-for="(order, idx) in orders"
                class="uc-order-item uc-order-item-pay">
              <div class="order-detail">
                <table class="order-detail-table">
                  <thead>
                  <tr>
                    <th class="col-main" colspan="4">
                      {{ $filters.translateOrderStatus(order.orderBase.orderStatus) }}
                      &nbsp;<span class="sep">|</span>&nbsp;
                      <span class="label">下单时间：</span>{{ order.orderBase.createTime }}
                      &nbsp;<span class="sep">|</span>&nbsp;
                      <span class="label">订单号：</span><a @click="toOrderDetailPage(order)" href="javascript:void(0)">{{
                        order.orderBase.tradeNo
                      }}</a>
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td class="order-items">
                      <ul class="goods-list">
                        <li v-for="orderItem in order.orderItems">
                          <div class="figure figure-thumb">
                            <a href="javascript:void(0);">
                              <img :src="orderItem.picUrl" @error="onPicError(orderItem)">
                            </a>
                          </div>
                          <div class="goods-info">
                            <div class="name flex-column">
                              <div>
                                <a href="javascript:void(0);">{{ orderItem.productName }}</a>
                              </div>
                              <div class="spec">
                                <n-ellipsis :line-clamp="1">{{buildSpecDesc(orderItem)}}</n-ellipsis>
                              </div>
                            </div>
                            <span class="price flex-column">
                              {{ $filters.formatShowPrice(orderItem.price) }}
                            </span>
                            <span class="quantity flex-column">
                              ×{{ orderItem.quantity }}
                            </span>
                          </div>
                        </li>
                      </ul>
                    </td>
                    <td class="order-receive">
                      <div>{{ order.orderBase.buyerName }}</div>
                    </td>
                    <td class="order-amount">
                      {{ $filters.formatShowPrice(order.orderAmount.actualAmount) }}
                    </td>
                    <td class="order-actions">
                      <a v-if="order.orderBase.orderStatus === DICT_ORDER_STATUS_WAIT_PAY"
                         @click="toCashier(order)"
                         href="javascript:void(0)"
                         class="btn btn-small btn-primary">立即付款</a>
                      <a v-if="order.orderBase.orderStatus === DICT_ORDER_STATUS_WAIT_RECEIVE"
                         @click="confirmReceive(order)"
                         href="javascript:void(0)"
                         class="btn btn-small btn-primary">确认收货</a>
                      <a @click="toOrderDetailPage(order)"
                         href="javascript:void(0)"
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
        </n-spin>
      </div>

      <div class="page" v-if="orders.length > 0">
        <n-pagination
            @update:page="onPageUpdate"
            :item-count="orderPage.count"
            :page-size="orderPage.pageSize"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

.order-list-box .order-list .uc-order-item-pay .order-detail-table th {
  background: #F3F3F3;
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
  margin-right: 15px;
}

.figure-thumb img {
  border: 1px solid #E8E3DE;
  padding: 2px;
  width: 80px;
  height: 80px;
}

.order-list-box .goods-list .goods-info {
  display: flex;
  flex-direction: row;
}

.order-list-box .goods-list .price {
  width: 100px;
}

.order-list-box .order-detail-table .order-actions {
}

.order-list-box .order-detail-table .order-actions .btn-small {
  width: 80px;
  margin-bottom: 10px;
}

.order-list-box .order-detail-table .order-actions .btn-small:last-child {
  margin-bottom: 0;
}

.order-list-box .order-detail-table .order-receive {
  width: 10%;
}

.order-list-box .order-detail-table .order-amount {
  width: 10%;
}

.order-list-box .order-detail-table .order-items {
  width: 70%;
}

.order-list-box .btn-line-gray {
  border-color: #b0b0b0;
  background: #fff;
  color: #757575;
}

.order-list-box .goods-list .name {
  width: 200px;
  margin-right: 20px;
}

.order-list-box .goods-list .name .spec{
  color: #999999;
}

.order-list-box .goods-list .name a {
  color: #333;
}

.order-list-box .goods-list li {
  display: flex;
  margin-bottom: 15px;
  line-height: 22px;
  color: #333;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.order-list-box .goods-list li:last-child {
  margin-bottom: 0;
}

.order-list-box .order-detail-table td {
  padding: 10px 15px;
  border-right: 1px solid #F1F1F1;
  vertical-align: middle;
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


.order-list-box .order-detail-table th p {
  margin: 0;
}

.ndash, .sep {
  margin: 0 .25em;
  font-family: sans-serif;
}

.order-detail-table {
  font-size: 13px;
}

.order-list-box .order-detail-table th {
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  border-bottom: 1px solid #e0e0e0;
  color: #757575;
}

.order-list-box .order-summary {
  padding: 25px 30px 1px;
}


.order-list-box .order-list .uc-order-item {
  margin-bottom: 20px;
  border: 1px solid #e0e0e0;
}

.order-list-box .order-list .uc-order-item-pay {
  border-color: #E1E1E1;
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

.uc-box .uc-content-box .box-hd .filter-list li.active, .uc-box .uc-content-box .box-hd .filter-list li.active a, .uc-box .uc-content-box .box-hd .filter-list li.tab-active, .uc-box .uc-content-box .box-hd .filter-list li.tab-active a {
  color: #ff6700;
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

.page {
  display: flex;
  justify-content: center;
}


.col-main .label {
  color: #ACACAC;
}

</style>
