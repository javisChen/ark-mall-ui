<script setup lang="ts">

import {reactive, toRefs, onMounted, computed, ref, Ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {ButtonProps, DialogProps, NCheckbox} from 'naive-ui'
import {useCartStore} from '@/store/cart'
import CommonTopBar from "../common/CommonTopBar.vue";

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();

const loginBtnDisabled = computed(() => {
  return cartStore.checkedCartItems.length === 0
})


const data = reactive({
  toCheckout: () => {
    router.push({
      name: 'checkout'
    })
  },
  toHomePage: () => {
    router.push({
      name: 'home'
    })
  },
  removeCartItems: async ($event, item) => {
    window.$dialog.warning(<DialogProps>{
      title: '提示',
      content: '确定要删除所选商品吗？',
      positiveText: '确定',
      negativeText: '取消',
      negativeButtonProps: <ButtonProps>{
        type: "tertiary",
        secondary: true
      },
      onPositiveClick: async () => {
        try {
          await cartStore.removeCartItem($event, item)
        } catch (e) {
          console.log(e)
        }
      },
      onNegativeClick: () => {

      }
    })
  }
})

onMounted(async () => {
})

const {
  toHomePage,
  toCheckout,
  removeCartItems
} = toRefs(data)

</script>

<template>
  <common-top-bar/>

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
  <div class="cart">
    <div class="main">
      <!-- 购物车存在商品时 -->
      <div class="container" v-if="cartStore.count > 0">
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
              <div class="cart-table-col product-name">
                <n-ellipsis :line-clamp="1">
                  {{ item.showProductName }}
                </n-ellipsis>
              </div>
              <div class="cart-table-col price">{{ $filters.formatShowPrice(item.price) }}</div>
              <div class="cart-table-col num">
                <n-input-number
                    min="1"
                    max="99"
                    :update-value-on-input="true"
                    @blur="cartStore.changeQuantity($event, item)"
                    v-model:value="item.quantity"
                    button-placement="both"/>
              </div>
              <div class="cart-table-col total">{{ $filters.formatShowPrice(item.price * item.quantity) }}</div>
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
          <div class="continue">
            <n-button text @click="toHomePage">继续购物</n-button>
          </div>
          <div class="selected">
            已选择
            <span class="quantity primary">{{ cartStore.totalQuantity }}</span> 件
          </div>
          <div class="total-price primary">合计：<span
              class="money">{{ $filters.formatShowPrice(cartStore.totalPrice) }}</span>
          </div>
          <div class="btn-box">
            <n-button
                color="#ff5c00"
                :class="loginBtnDisabled ? ' login-btn-disabled' : ''"
                class="settle"
                @click="toCheckout">去结算
            </n-button>
          </div>
        </div>
      </div>

      <!-- 购物车不存在商品或未登录 -->
      <div class="container" v-else>
        <div class="cart-empty">
          <h2 class="login-tip is-login">您的购物车还是空的！</h2>
          <n-button
              @click="toHomePage"
              color="#ff5c00" class="login-btn"
              tag="a">马上去购物
          </n-button>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>

.cart {
  width: 100%;
}

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
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.cart-table {
  background-color: #FFFFFF;
  width: 1226px;
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
  width: 10%;
}

.cart-table .cart-table-row .cart-table-col.total {
  width: 20%;
}

.cart-table .cart-table-row .cart-table-col.price {
  width: 20%;
}

.cart-table .cart-table-row .cart-table-col.product-name {
  text-align: left;
  font-size: 18px;
  width: 30%;
}

.cart-table .cart-table-row .cart-table-col.picture {
  width: 10%;
}

.cart-table .cart-table-row .cart-table-col.check {
  width: 10%;
  float: left;
  text-align: left;
  padding-left: 20px;
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
  width: 1226px;
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

.cart-empty {
  background: url("@/assets/cart-empty.png") no-repeat 124px 0;
  height: 273px;
  padding-left: 558px;
  margin: 65px 0 130px;
  color: #b0b0b0;
  overflow: hidden;
}

.login-tip.is-login {
  margin: 70px 0 0 0;
}

.login-tip {
  font-size: 36px;
  font-weight: bold;
}

.login-btn {
  margin-top: 30px;
  border-radius: 2px;
  font-size: 18px;
  border: 0;
  outline: none;
  background-color: #ff5c00;
  color: #fff;
  width: 170px;
  height: 48px;
  line-height: 48px;
}

.login-btn-disabled {
  opacity: .4;
}


</style>
