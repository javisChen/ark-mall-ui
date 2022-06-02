<script setup lang="ts">
import CommonTopBar from "../common/CommonTopBar.vue";
import {reactive, toRefs} from 'vue';
import {useRoute, useRouter} from 'vue-router';

const data = reactive({
  product: {
    title: '苹果(Apple) iPhone 13 128GB 午夜色 移动联通电信5G全网通手机 双卡双待 苹果iphone13',
    subTitle: '天玑8100｜144Hz高配LCD屏幕｜6400万像素｜VC液冷散热',
    price: 2099,
    discounts: 1900,
    spec: [
      {
        name: '产品',
        attrValues: [
          {
            name: 'Redmi Note 11T Pro'
          },
          {
            name: 'Redmi Note 11T Pro'
          },
          {
            name: 'Redmi Note 11T Pro'
          },
        ]
      },
      {
        name: '产品',
        attrValues: [
          {
            name: 'Redmi Note 11T Pro'
          },
          {
            name: 'Redmi Note 11T Pro'
          },
          {
            name: 'Redmi Note 11T Pro'
          },
        ]
      },
      {
        name: '产品',
        attrValues: [
          {
            name: 'Redmi Note 11T Pro'
          },
          {
            name: 'Redmi Note 11T Pro'
          },
          {
            name: 'Redmi Note 11T Pro'
          },
        ]
      },
    ]
  }
})


const onAttrOver = (item) => {
  if (!item.selected) {
    item.onHover = !item.onHover
  }
}

const onAttrClick = (item, specItem) => {
  specItem.attrValues.forEach(item => {
    item.selected = false
    item.onHover = false
  })
  item.selected = true;
  item.onHover = true;
}

const {
  product,
} = toRefs(data)


</script>

<template>
  <common-top-bar></common-top-bar>
  <div class="container">
    <div class="main">
      <div class="image">
        <img src="@/assets/test-prod.webp" alt="">
      </div>
      <div class="info">
        <div class="title">
          {{ product.title }}
        </div>
        <div class="sub-title">
          {{ product.subTitle }}
        </div>
        <div class="price-info">
          <span>{{ product.price }} 元</span>
          <del class="discounts">{{ product.discounts }} 元</del>
        </div>
        <div class="line"></div>
        <div class="spec">
          <div class="spec-item"
               v-for="specItem in product.spec">
            <div class="attr-name">
              选择{{ specItem.name }}
            </div>
            <ul class="attr-value-list clear">
              <li @mouseover="onAttrOver(attrItem)"
                  @mouseout="onAttrOver(attrItem)"
                  @click="onAttrClick(attrItem, specItem)"
                  :class="{
                    'active': attrItem.onHover || attrItem.selected,
                    'unactive': !attrItem.onHover
                  }"
                  v-for="attrItem in specItem.attrValues">
                {{ attrItem.name }}
              </li>
            </ul>
          </div>
        </div>
        <div class="selected-list">
          <div class="selected-info">
            <span class="selected-product">Redmi Note 11T Pro 8GB+256GB 原子银</span>
            <span class="selected-product-price">2099 元</span>
          </div>
          <div class="total-price">
            总计：2099元
          </div>
        </div>
        <div class="btn-box">
          <div class="add-cart">
            <a href="">加入购物车</a>
          </div>
        </div>
      </div>
    </div>
    <div class="other-info">
    </div>
  </div>
</template>

<style scoped>

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main {
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  width: 1200px;
}

.main .image {
  width: 600px;
  height: 450px;
  text-align: center;
  margin-right: 10px;
}

.main .info {
  width: 600px;
}

.main .info .title {
  font-size: 24px;
  font-weight: 400;
  color: #212121;
}

.main .info .sub-title {
  color: #b0b0b0;
  margin: 0;
  padding: 8px 0 0;
  line-height: 1.5;
}

.main .info .price-info {
  font-size: 18px;
  line-height: 1;
  color: #ff6700;
  padding: 12px 0 10px;
}

.main .info .discounts {
  margin-left: 5px;
  font-size: 14px;
  color: #b0b0b0;
}

.main .info .line {
  margin-top: 12px;
  border-bottom: 1px solid #e0e0e0;
}

.main .info .spec {
  margin-top: 20px;
}

.main .info .spec .spec-item {
  margin-bottom: 30px;
}

.main .info .attr-name {
  font-size: 18px;
}

.main .info .attr-value-list {

}

.main .info li {
  margin-right: 12px;
  margin-top: 10px;
  line-height: 42px;
  height: 42px;
  list-style: none;
  cursor: pointer;
  -webkit-transition: all .2s ease;
  transition: all .2s ease;
  width: 280px;
  font-size: 16px;
  text-align: center;
  float: left;
}

.main .info li:last-child {
  margin-right: 0;
}

.other-info {
  width: 85%;
  /*border-bottom: 1px solid #e0e0e0;*/
  margin-bottom: 50px;
}

.selected-list {
  background: #f9f9fa;
  padding: 30px;
  margin-bottom: 30px;
}

.selected-list .selected-info .selected-product {
  color: #616161;
}

.selected-list .selected-info .selected-product-price {
  float: right;
}

.selected-list .total-price {
  color: #ff6700;
  font-size: 24px;
  padding-top: 20px;
}

.btn-box {
}

.btn-box .add-cart {
  width: 298px;
  height: 52px;
  line-height: 52px;
  font-size: 16px;
  background: #ff6700;
  border-color: #ff6700;
  color: #fff;
  text-align: center;
}

.container {
  background-color: #FFFFFF;
}

.active {
  border: 1px solid #ff6700;
  color: #ff6700;
}

.unactive {
  border: 1px solid #e0e0e0;
  color: #000000;
}

</style>
