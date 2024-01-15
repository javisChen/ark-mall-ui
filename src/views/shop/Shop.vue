<script setup lang="ts">

import {onMounted, reactive, toRefs} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import CommonTopBar from "@/views/common/CommonTopBar.vue";
import {search} from "@/api/product/goods-api"
import ShopNav from "@/views/shop/ShopNav.vue";
import ShopCategory from "@/views/shop/ShopCategory.vue";

const route = useRoute();
const router = useRouter();

const toInfoPage = (item: object) => {
  router.push({
    name: 'info',
    query: {
      id: item.spuId,
    },
  })
}

const onMouseOver = (item: object) => {
  item.onHover = !item.onHover
}

onMounted(async () => {
  try {
    const result = await search();
    data.productList = result.data
  } catch (e) {
  }
})

const data = reactive({
  productList: []
})

const {
  productList
} = toRefs(data)


</script>

<template>
  <common-top-bar/>
  <div class="home">
    <div class="container">
      <!-- 导航栏 -->
      <shop-nav/>

      <!-- 分类 -->
      <shop-category/>

      <div class="content">
        <div class="box">
          <div class="box-hd">
            <h2 class="title">手机</h2>
          </div>
          <div class="box-bd">
            <div
                v-for="(item, idx) in productList"
                @click.prevent="toInfoPage(item)"
                @mouseover="onMouseOver(item)"
                @mouseout="onMouseOver(item)"
                :class="{'product-hover': item.onHover}"
                class="item">
              <a class="item-a-tag" href="#">
                <div class="product-img">
                  <img width="160" height="160" :src="item.pictures?.[0]" alt="">
                </div>
                <h3 class="title">{{ item.skuName }}</h3>
                <p class="desc">{{ item.desc }}</p>
                <p class="price">
                  <span class="num">{{ $filters.formatPrice(item.salesPrice) }}</span>
                  <span>起</span>
                </p>
              </a>
            </div>
          </div>
        </div>
        <div class="box">
          <div class="box-hd">
            <h2 class="title">手机</h2>
          </div>
          <div class="box-bd">
            <div @mouseover="onMouseOver(item)"
                 @mouseout="onMouseOver(item)"
                 :class="{'product-hover': item.onHover}"
                 class="item"
                 v-for="(item, idx) in productList">
              <a class="item-a-tag" href="#">
                <div class="product-img">
                  <img width="160" height="160" :src="item.pictures?.[0]" alt="">
                </div>
                <h3 class="title">{{ item.name }}</h3>
                <p class="desc">{{ item.desc }}</p>
                <p class="price">
                  <span class="num">{{ $filters.formatPrice(item.salesPrice) }}</span>
                  <span>起</span>
                </p>
              </a>
            </div>
          </div>
        </div>
        <div class="box">
          <div class="box-hd">
            <h2 class="title">手机</h2>
          </div>
          <div class="box-bd">
            <div @mouseover="onMouseOver(item)"
                 @mouseout="onMouseOver(item)"
                 :class="{'product-hover': item.onHover}"
                 class="item"
                 v-for="(item, idx) in productList">
              <a class="item-a-tag" href="#">
                <div class="product-img">
                  <img width="160" height="160" :src="item.pictures?.[0]" alt="">
                </div>
                <h3 class="title">{{ item.name }}</h3>
                <p class="desc">{{ item.desc }}</p>
                <p class="price">
                  <span class="num">{{ $filters.formatPrice(item.salesPrice) }}</span>
                  <span>起</span>
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>

.home {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
}

.home .container {
  background-color: #f5f5f5;
  width: 100%;
}

.content {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}

.content .box {
  width: 1226px;
}

.content .box .box-bd {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.box-bd .item {
  width: 230px;
  margin-right: 14px;
  margin-bottom: 14px;
  background-color: #FFFFFF;
}

.box-bd .item:first-child {
  margin-left: 0;
}

.product-hover {
  box-shadow: 1px 4px 20px #33333359;
  transition: all .20s ease-in;
}

.box .box-hd .title {
  font-weight: 330;
  line-height: 58px;
  font-size: 22px;
}

.box .box-bd {
  /*border: 1px solid red;*/
  /*flex-direction: row;*/
}

.item .item-a-tag {
  padding: 25px;
  text-decoration: none;
  text-align: center;
}

.item .product-img {
  margin-bottom: 14px;
}

.item .title {
  font-size: 14px;
  font-weight: 400;
  color: #333;
  margin-bottom: 6px;
}

.item .desc {
  height: 18px;
  font-size: 12px;
  color: #b0b0b0;
  margin-bottom: 5px;
}

.item .price {
  text-align: center;
  color: #ff6700;
}

</style>
