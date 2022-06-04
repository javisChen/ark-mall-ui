<script setup lang="ts">

import {reactive, toRefs} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import CommonTopBar from "../common/CommonTopBar.vue";

const route = useRoute();
const router = useRouter();

interface Login {
  username: string
  password: string
}

const toInfoPage = (item: object) => {
  router.push({
    name: 'info',
    query: {
      id: 1,
    },
  })
}

const onMouseOver = (item: object) => {
  item.onHover = !item.onHover
}

const categoryHover = (item: object) => {
  item.showChildren = !item.showChildren
}

const data = reactive({
  categories: [
    {
      name: '手机',
    },
    {
      name: '电视',
    },
    {
      name: '笔记本 平板',
    },
    {
      name: '出行 穿戴',
    },
    {
      name: '耳机 音箱',
    },
    {
      name: '家电',
    },
    {
      name: '智能 路由器',
    },
    {
      name: '电源 配件',
    },
    {
      name: '健康 儿童',
    },
    {
      name: '生活 箱包',
    },
  ],
  productList: [
    {
      title: 'Redmi Note 11T Pro+',
      desc: '天玑8100｜真旗舰芯',
      price: 2099
    },
    {
      title: 'Redmi Note 11T Pro+',
      desc: '天玑8100｜真旗舰芯',
      price: 2099
    },
    {
      title: 'Redmi Note 11T Pro+',
      desc: '天玑8100｜真旗舰芯',
      price: 2099
    },
    {
      title: 'Redmi Note 11T Pro+',
      desc: '天玑8100｜真旗舰芯',
      price: 2099
    },
    {
      title: 'Redmi Note 11T Pro+',
      desc: '天玑8100｜真旗舰芯',
      price: 2099
    },
    {
      title: 'Redmi Note 11T Pro+',
      desc: '天玑8100｜真旗舰芯',
      price: 2099
    },
    {
      title: 'Redmi Note 11T Pro+',
      desc: '天玑8100｜真旗舰芯',
      price: 2099
    },
    {
      title: 'Redmi Note 11T Pro+',
      desc: '天玑8100｜真旗舰芯',
      price: 2099
    },
    {
      title: 'Redmi Note 11T Pro+',
      desc: '天玑8100｜真旗舰芯',
      price: 2099
    },
    {
      title: 'Redmi Note 11T Pro+',
      desc: '天玑8100｜真旗舰芯',
      price: 2099
    },
  ]
})

const {
  categories,
  productList,
  login,
} = toRefs(data)


</script>

<template>
  <common-top-bar/>
  <div id="container">
    <div class="header">
      <div class="navs">
        <div class="container">
          <div class="header-logo">
            <img src="@/assets/logo-mi.png" alt="">
          </div>
          <div class="header-nav">

          </div>
          <div class="header-search">

          </div>
        </div>
      </div>
    </div>

    <div class="category">
      <a href="#">
        <div class="category-nav">
          <ul class="category-nav-wrapper">
            <li class="category-nav-li" @mouseover="categoryHover(item)"
                @mouseout="categoryHover(item)"
                v-for="item in categories">
              <a href="#">{{ item.name }}</a>
              <div class="category-product" v-if="item.showChildren">
                <ul class="category-product-wrapper">
                  <li class="category-product-item" v-for="item in 24">
                    <a class="" href="#">
                      <img class="product-img" src="../../assets/test-prod.webp" alt="">
                      <span class="category-product-item-title">Note 11T Pro+</span>
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
                <img width="160" height="160" src="src/assets/test-prod.webp" alt="">
              </div>
              <h3 class="title">{{ item.title }}</h3>
              <p class="desc">{{ item.desc }}</p>
              <p class="price">
                <span class="num">{{ item.price }}</span>
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
                <img width="160" height="160" src="src/assets/test-prod.webp" alt="">
              </div>
              <h3 class="title">{{ item.title }}</h3>
              <p class="desc">{{ item.desc }}</p>
              <p class="price">
                <span class="num">{{ item.price }}</span>
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
                <img width="160" height="160" src="src/assets/test-prod.webp" alt="">
              </div>
              <h3 class="title">{{ item.title }}</h3>
              <p class="desc">{{ item.desc }}</p>
              <p class="price">
                <span class="num">{{ item.price }}</span>
                <span>起</span>
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>

#container {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
}

.header {
  width: 100%;
}

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
}

.category-nav .category-nav-wrapper li a:visited {
  color: #fff;
}

.header .navs {
  height: 100px;
  background-color: #FFFFFF;
  display: flex;
  justify-content: center;
}

.header .navs .container {
  width: 1226px;
  height: 100%;
  display: flex;

}

.header .navs .container .header-logo {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.header .navs .container .header-search {
}


.header .navs .container .header-logo img {
  float: left;
  width: 56px;
}

.top-bar .container {
  width: 1226px;
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

.content {
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
