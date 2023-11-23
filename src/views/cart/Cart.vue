<script setup lang="ts">

import {reactive, toRefs, onMounted, computed, ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {NCheckbox} from 'naive-ui'
import {useCartStore} from '@/store/cart'

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();

const buildProductName = (item) => {
  let name = item.productName + ' '
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
  toCheckout: () => {
    router.push({
      name: 'checkout'
    })
  },
  removeCartItems: async ($event, item) => {
    try {
      await cartStore.remove($event, item)
    } catch (e) {
      console.log(e)
    }
  }
})

onMounted(async () => {
  try {
    await cartStore.loadCart();
  } catch (e) {
    console.log(e)
  }
})

const {
  toCheckout,
  removeCartItems
} = toRefs(data)

</script>

<template>
  <div class="header">
    <div class="container">
      <div class="header-logo">
        <img src="@/assets/logo-mi.png" alt="">
      </div>
      <div class="header-title">
        <span>我的购物车</span>
        <span class="tips">温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
      </div>
    </div>
  </div>
  <div class="main">
    <div class="container">
      <div class="cart-table">
        <div class="cart-table-header">
          <div class="cart-table-row">
            <div class="cart-table-col check">
              <n-checkbox class="checkbox"
                          size="large"
                          label=""
                          @update:checked="cartStore.checkedAll($event)"/>
              &nbsp;&nbsp;全选
            </div>
            <div class="cart-table-col picture"></div>
            <div class="cart-table-col product-name">商品名称</div>
            <div class="cart-table-col price">单价</div>
            <div class="cart-table-col num">数量</div>
            <div class="cart-table-col total">小计</div>
            <div class="cart-table-col">操作</div>
          </div>
        </div>
        <div class="cart-table-body">
          <div class="cart-table-row"
               v-for="item in cartStore.carts">
            <div class="cart-table-col check">
              <n-checkbox size="large"
                          label=""
                          :checked="item.checked"
                          @update:checked="cartStore.checked($event, item)"/>
            </div>
            <div class="cart-table-col picture">
              <img :src="item.picUrl" alt="">
            </div>
            <div class="cart-table-col product-name">{{ buildProductName(item) }}</div>
            <div class="cart-table-col price">{{ $filters.formatShowPrice(item.price) }}元</div>
            <div class="cart-table-col num">
              <n-input-number
                  min="1"
                  max="99"
                  :update-value-on-input="true"
                  @blur="cartStore.changeQuantity($event, item)"
                  v-model:value="item.quantity"
                  button-placement="both"/>
            </div>
            <div class="cart-table-col total">{{ $filters.formatShowPrice(item.price * item.quantity) }}元</div>
            <div class="cart-table-col">
              <n-button
                  @click="removeCartItems($event, item)"
                  size="small"
                  text
                  tag="li">删除
              </n-button>
            </div>
          </div>
        </div>
      </div>
      <div class="cart-bar">
        <div class="continue">继续购物</div>
        <div class="selected">
          已选择
          <span class="quantity primary">{{ cartStore.totalQuantity }}</span> 件
        </div>
        <div class="total-price primary">合计：<span
            class="money">{{ $filters.formatShowPrice(cartStore.totalPrice) }}</span>元
        </div>
        <div class="btn-box">
          <button class="settle primary-bg" @click="toCheckout">去结算</button>
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

.header-title .tips {
  margin-left: 15px;
  color: #757575;
  font-size: 12px;
}

.main {
  margin-top: 38px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.main .container {
  width: 1226px;
}

.cart-table {
  background-color: #FFFFFF;
}

.cart-table .cart-table-row {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.cart-table .cart-table-header {
  border-bottom: 1px solid #e0e0e0
}

.cart-table .cart-table-body {

}

.cart-table .cart-table-row .cart-table-col {
  width: 100px;
  height: 70px;
  line-height: 70px;
  text-align: center;
}

.cart-table .cart-table-row .cart-table-col.num {
  width: 150px;
}

.cart-table .cart-table-row .cart-table-col.total {
  width: 201px;
}

.cart-table .cart-table-row .cart-table-col.price {
  width: 158px;
}

.cart-table .cart-table-row .cart-table-col.product-name {
  width: 380px;
  text-align: left;
  font-size: 18px;
}

.cart-table-body .cart-table-row .cart-table-col.price {
  color: #ff6700;
}

.cart-table-body .cart-table-row {
  font-size: 16px;
}

.cart-table-body .cart-table-row .cart-table-col.total {
  color: #ff6700;
}

.cart-table .cart-table-row .cart-table-col.picture {
  width: 100px;
}

.cart-table .cart-table-row .cart-table-col.picture img {
  width: 85px;
  height: 85px;
}

.cart-table .cart-table-body .picture {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.cart-table .cart-table-row .cart-table-col.check {
  width: 80px;
  float: left;
  text-align: left;
  padding-left: 20px;
}

.cart-table-body .cart-table-row {
  height: 86px;
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;
}

.cart-table-body .cart-table-col {
  /*border: 1px solid red;*/
}

.cart-table-body .cart-table-row:last-child {
  border-bottom: 0
}

.checkbox {
  margin-right: 10px;
}

.cart-bar {
  display: flex;
  flex-direction: row;
  height: 50px;
  margin-top: 25px;
  background-color: #FFFFFF;
  color: #757575;
  font-size: 14px;
  align-items: center;
  width: 100%;
  position: relative;
}

.cart-bar .continue {
  margin-left: 32px;
  padding-right: 16px;
  border-right: 1px solid #eee;
}

.cart-bar .selected {
  margin-left: 16px;
}

.cart-bar .selected .quantity {

}

.cart-bar .total-price {
  margin-left: auto;
}

.cart-bar .btn-box {
  height: 100%;
  border: 1px solid red;
  margin-left: 50px;
}

.cart-bar .btn-box .settle {
  width: 200px;
  outline: none;
  border: 0;
  height: 100%;
  color: #FFFFFF;
  font-size: 16px;
}

.cart-bar .total-price .money {
  font-size: 30px;
}

</style>
