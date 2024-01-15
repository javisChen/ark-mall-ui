<template>
  <div class="order-goods">

    <n-data-table
        :columns="createColumns"
        :data="order.orderItems"
        :pagination="false"
        :bordered="true"
    />

<!--    <table class="goods-table">-->
<!--      <thead>-->

<!--      </thead>-->
<!--      <tbody>-->
<!--      <tr class="goods-box" v-for="orderItem in order.orderItems">-->
<!--        <td class="col col-thumb">-->
<!--          <div class="figure figure-thumb">-->
<!--            <a href="javascript:void(0);">-->
<!--              <img @error="onPicError(orderItem)"-->
<!--                   :src="orderItem.picUrl"-->
<!--                   width="80"-->
<!--                   height="80">-->
<!--            </a>-->
<!--          </div>-->
<!--        </td>-->
<!--        <td colspan="3" class="col col-info">-->
<!--          <table class="col-info-box">-->
<!--            <tr class="goods-box-info">-->
<!--              <td class="col col-name">-->
<!--                <div class="name">-->
<!--                  <a href="javascript:void(0);">-->
<!--                    {{ buildProductDesc(orderItem) }}-->
<!--                  </a>-->
<!--                </div>-->
<!--              </td>-->
<!--              <td class="col col-price">-->
<!--                <p class="price">{{ $filters.formatPrice(orderItem.price) }} × {{ orderItem.quantity }}</p>-->
<!--              </td>-->
<!--              <td class="col col-actions">-->
<!--              </td>-->
<!--            </tr>-->
<!--          </table>-->
<!--        </td>-->
<!--      </tr>-->
<!--      </tbody>-->
<!--    </table>-->
  </div>
</template>

<script setup lang="ts">

import {Order} from "@/views/order/Order";
import {getCurrentInstance, h, reactive, toRefs} from "vue";
import image404 from "@/assets/image404.png";
import {buildProductDesc, buildSpecDesc} from '@/utils/util'

defineProps({
  order: {
    type: Object,
    required: true
  }
})


const {proxy} = getCurrentInstance()

const data = reactive({
  onPicError: async (orderItem) => {
    orderItem.picUrl = image404
  },
  createColumns: [
      {
        title: "商品",
        key: "productName",
        render(row) {
          const style = {style: {color: 'red'}}
          return h('div', style, row.productName)
        }
      },
      {
        title: "单价",
        key: "price",
        render(row) {
          return (h('span', proxy.$filters.formatPrice(row.price)))
        }
      },
      {
        title: "数量",
        key: "quantity"
      },
    ]
})

const {
  createColumns,
  onPicError,
} = toRefs(data)

</script>

<style>

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
  width: 200px;
  font-weight: 400;
  text-align: right;
}

.total-table td {
  text-align: right;
  color: #ff6700;
  padding: 5px 0;
}

</style>