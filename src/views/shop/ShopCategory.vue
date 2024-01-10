<template>
  <div class="category">
    <a href="#">
      <div class="category-nav">
        <ul class="category-nav-wrapper">
          <li class="category-nav-li"
              @mouseover="categoryHover(item)"
              @mouseout="categoryHover(item)"
              v-for="item in categories">
            <a href="#">{{ item.categoryName }}</a>
            <div class="category-product"
                 v-show="item.showChildren && item.commodities && item.commodities.length > 0">
              <ul class="category-product-wrapper">
                <li class="category-product-item"
                    @click.prevent="toInfoPage(commodityItem)"
                    v-for="commodityItem in item.commodities">
                  <a class="" href="#">
                    <img class="product-img" :src="commodityItem.picUrl" alt="">
                    <span class="category-product-item-title">{{ commodityItem.spuName }}</span>
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <img src="../../assets/category-bg.webp" alt="">
    </a>
  </div>
</template>
<script setup>

import {onMounted, reactive, toRefs} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {getCategories} from "@/api/product/category-api"

const route = useRoute();
const router = useRouter();

const categoryHover = (item) => {
  item.showChildren = !item.showChildren
}

onMounted(async () => {
  try {
    const result = await getCategories();
    data.categories = result.data
  } catch (e) {
  }
})

const data = reactive({
  categories: [],
})

const {
  categories
} = toRefs(data)

</script>

<style scoped>

.category a {
  position: relative;
}

.category-nav {
  position: absolute;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  align-content: center;
}

.category-product-wrapper {
  display: flex;
  flex-wrap: wrap;
}

.category-product .category-product-item .product-img {
  width: 45px;
  height: 45px;
}

.category-product .category-product-wrapper .category-product-item {
  width: 220px;
  height: 50px;
  color: #333333;
  margin-bottom: 20px;
}

.category-product .category-product-wrapper .category-product-item a {
  display: flex;
  height: 100%;
  flex-direction: row;
  align-items: center;
}

.category-product .category-product-wrapper .category-product-item a:visited {
  color: #333333;
}

.category-product .category-product-wrapper .category-product-item a:hover {
  color: #ff6700;
}

.category-nav .category-nav-wrapper {
  background-color: rgba(105, 101, 101, .6);
  width: 234px;
  font-size: 14px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.category-nav .category-product {
  padding: 20px 20px;
  position: absolute;
  left: 234px;
  top: 0;
  background-color: #fff;
  box-shadow: 1px 4px 20px #33333359;
}

.category-nav .category-nav-wrapper li {
  color: #fff;
  height: 40px;
}

.category-nav .category-nav-wrapper .category-nav-li:hover {
  background-color: #ff6700;
}

.category-nav .category-nav-wrapper li a {
  padding-left: 30px;
  text-decoration: none;
  line-height: 42px;
  color: #fff;
}

.category-nav .category-nav-wrapper li a:visited {
  color: #fff;
}

.top-bar .container .top-bar-navs a:visited {
  color: #b0b0b0;
}

.top-bar .container .top-bar-navs ul {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  height: 100%;
}


.top-bar .container .info ul {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  height: 100%;
}

.top-bar .container .info ul li {
  padding: 0 5px;
  border-right: 1px solid grey;
}

.top-bar .container .info ul li:last-child {
  border-right: 0;
}

.category {
  width: 100%;
  height: 460px;
  display: flex;
  justify-content: center;
  background-color: #FFFFFF;
}

.category a img {
  width: 1226px;
  height: 460px;
}

.item .product-img {
  margin-bottom: 14px;
}

.category-product-item-title {
  color: #000000;
}

</style>