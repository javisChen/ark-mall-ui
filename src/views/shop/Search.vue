<script setup lang="ts">

import {onMounted, reactive, toRefs} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import CommonTopBar from "@/views/common/CommonTopBar.vue";
import {search} from "@/api/product/goods-api"
import ShopNav from "@/views/shop/ShopNav.vue";
import SearchFilter from "@/views/shop/SearchFilter.vue";

const route = useRoute();
const router = useRouter();


onMounted(async () => {
  try {
    const result = await search();
    data.productList = result.data
  } catch (e) {
  }
})

const data = reactive({
  categories: [],
  productList: []
})

const {
  categories,
  productList
} = toRefs(data)


</script>

<template>
  <common-top-bar/>
  <shop-nav/>
  <div class="home">
    <div class="container">
      <search-filter/>
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
  background-color: #e0e0e0;
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

.category-product-item-title {
  color: #000000;
}

</style>
