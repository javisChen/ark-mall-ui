<script setup lang="ts">

import {computed, onMounted, reactive, toRefs} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {getOrderInfo} from "@/api/trade/trade-api"
import image404 from '@/assets/image404.png';
import {buildProductDesc} from '@/utils/util'

const route = useRoute();
const router = useRouter();

onMounted(() => {
  data.loadOrder()
})

const data = reactive({
  order: {},

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
  stepStyle: (step) => {
    let orderStatus = data.order.orderBase.orderStatus;
    if (orderStatus > step) {
      return 'step-active-already'
    } else if (orderStatus === step) {
      return 'step-active'
    }
    return ''
  },
  onPicError: async (orderItem) => {
    orderItem.picUrl = image404
  },
})

const {
  stepStyle,
  onPicError,
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
        <h2 class="subtitle">订单号：{{ order.orderBase.tradeNo }}
        </h2>
        <div class="actions">
          <div class="status-btn-box">
            <a href="javascript:void(0)"
               class="btn btn-small btn-line-gray btn-contract">联系客服</a><a
              title="取消订单" class="btn btn-small btn-line-gray">取消订单</a><a
              title="立即付款" class="btn btn-small btn-primary">立即付款</a>
          </div>
        </div>
      </div>
    </div>

    <!--    -->
    <div class="box-bd">
      <div class="order-detail uc-order-item-pay">
        <div class="order-summary">
          <div class="order-status">
            <div style="display: inline-block;">等待付款</div>
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
                <div class="info">{{ order.orderBase.receiveTime  }}</div>
              </li>
              <li class="step step-last">
                <div class="progress"
                     :class="[stepStyle(10)]"><span class="text">交易成功</span></div>
                <div class="info"></div>
              </li>
            </ol>
          </div>
        </div>
        <div class="order-goods">
          <table class="goods-table">
            <tr class="goods-box" v-for="orderItem in order.orderItems">
              <td class="col col-thumb">
                <div class="figure figure-thumb">
                  <a href="javascript:void(0);">
                    <img @error="onPicError(orderItem)"
                         :src="orderItem.picUrl"
                         width="80"
                         height="80">
                  </a>
                </div>
              </td>
              <td colspan="3" class="col col-info">
                <table class="col-info-box">
                  <tr class="goods-box-info">
                    <td class="col col-name">
                      <div class="name">
                        <a href="javascript:void(0);">
                          {{ buildProductDesc(orderItem) }}
                        </a>
                      </div>
                    </td>
                    <td class="col col-price">
                      <p class="price">{{ $filters.formatShowPrice(orderItem.price) }}元 × {{ orderItem.quantity }}</p>
                    </td>
                    <td class="col col-actions">
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="order-detail-info"><h3>收货信息</h3>
        <table class="info-table">
          <tbody>
          <tr>
            <th>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</th>
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
                order.orderReceive.province + order.orderReceive.city + order.orderReceive.district + order.orderReceive.address
              }}
            </td>
          </tr>
          </tbody>
        </table>
        <div class="actions"><a class="btn btn-small btn-line-gray">修改</a></div>
      </div>
      <div class="order-detail-info"><h3>支付方式</h3>
        <table class="info-table">
          <tbody>
          <tr>
            <th>支付方式：</th>
            <td>在线支付</td>
          </tr>
          </tbody>
        </table>
        <div class="actions"></div>
      </div>
      <div>
        <div class="order-detail-info"><h3>发票信息</h3>
          <table class="info-table">
            <tbody>
            <tr>
              <th>发票类型：</th>
              <td>电子普通发票</td>
            </tr>
            <tr>
              <th>发票内容：</th>
              <td>购买商品明细</td>
            </tr>
            <tr>
              <th>发票抬头：</th>
              <td>个人</td>
            </tr>
            </tbody>
          </table>
          <div class="actions"></div>
        </div>
      </div>
      <div class="order-detail-total">
        <table class="total-table">
          <tbody>
          <tr>
            <th>商品总价：</th>
            <td><span class="num">{{$filters.formatShowPrice(order.orderAmount.actualAmount)}}</span>元</td>
          </tr>
          <tr>
            <th>运费：</th>
            <td><span class="num">0</span>元</td>
          </tr>
          <tr>
            <th class="total">应付金额：</th>
            <td class="total"><span class="num">{{$filters.formatShowPrice(order.orderAmount.actualAmount)}}</span>元</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

.uc-order-item-pay .order-status {
  color: #ff6700;
  margin-bottom: 25px;
  font-size: 18px;
}

.order-progress {
  height: 65px;
  margin-bottom: 15px;
}

.progress-list {
  width: 880px;
  height: 20px;
  margin: 0 auto;
  padding: 0;
  list-style-type: none;
  border-radius: 20px;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  color: #424242;
  background-color: #eee;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.progress-list .step {
  -webkit-box-flex: 0;
  -ms-flex: 0 1 176px;
  flex: 0 1 176px;
  height: 20px;
}

.progress-list .step .info {
  color: gray;
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

.goods-table {
  width: 100%;
}

.goods-table .goods-box {
  border-bottom: 1px solid #e0e0e0;
  padding-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.goods-table .goods-box td {
}

.goods-table .col-thumb {
  width: 100px;
}

.goods-table .figure-thumb {
  width: 80px;
}

.goods-table .figure-thumb a {
  display: block;
}

.goods-table .col {
  text-align: left;
  color: #333;
}

.col-info-box, .goods-box-info {
  width: 100%;
}

.goods-table .col-name {
  width: 350px;
}

.goods-table .name {
  margin: 0;
}

.goods-table .name a {
  color: #333;
}

.goods-table .price {
  margin: 0;
}

.goods-table .col-actions {
  width: 120px;
  padding: 0;
  text-align: right;
}

.col-info {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
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
  border-bottom: 1px solid #e0e0e0;
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
