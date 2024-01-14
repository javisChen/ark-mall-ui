<template>
  <div class="search-result">
    <div class="result-order">
      <div class="order-list-box clearfix">
        <div class="address-box" style="display: none;">
          <div class="edit-address">
            <div class="address-select">
              <div class="address-select-box address-select-box-direct">
                <div class="con">
                  <div class="search-address"><i class="iconfont iconfont-search"></i>
                    <div class="col search-input mi-input "><label
                        for="search" class="input-label"></label><input
                        type="text" name="search"
                        placeholder="输入街道、乡镇、小区或商圈名称"
                        maxlength=""
                        autocomplete="off"
                        class="input-text show-placeholder"
                        style="height: 44px; padding-left: 45px;">
                      <i class="iconfont iconfont-circle-close clear"></i>
                      <p class="msg msg-error" style="display: none;"></p><span
                          class="iconfont-circle-close icon-error"
                          style="display: none;"></span>
                    </div>
                    <div class="search-example">例如：北京 华润五彩城</div>
                  </div>
                  <div class="oper-box"><span
                      class="oper-text">手动选择地址 &gt;</span><span
                      class="oper-text" style="display: none;">搜索地址快速定位 &gt;</span></div>
                </div>
              </div>
            </div>
            <div class="address-box">
              <div class="title">我的收货地址</div>
              <div class="no-login">现在<a>登录</a>，可根据收货地址快速定位</div>
            </div>
          </div>
        </div>
        <ul class="order-list">
          <li class="order-item active">
            <a href="javascript: void(0);">综合</a>
          </li>
          <li class="order-item">
            <a href="javascript: void(0);">新品</a>
          </li>
          <li class="order-item">
            <a href="javascript: void(0);">销量</a>
          </li>
          <li class="order-item">
            <a href="javascript: void(0);">价格<i class="iconfont"></i>
            </a>
          </li>
        </ul>
        <ul class="type-list">
          <li>
            <div class="address-choose">
              <span class="label">收货地</span>
              <a href="javascript: void(0);">
                <span class="address-show address-info">北京 北京市</span>
              </a>
            </div>
          </li>
          <li>
            <a href="javascript: void(0);" class="goods-order-item filter-order-item">
              <span class="checkbox"><i class="iconfont">√</i></span>促销</a>
          </li>
          <li>
            <a href="javascript: void(0);" class="goods-order-item filter-order-item">
              <span class="checkbox"><i class="iconfont">√</i></span>分期</a>
          </li>
          <li>
            <a href="javascript: void(0);" class="goods-order-item filter-order-item"><span
                class="checkbox"><i class="iconfont">√</i></span>仅看有货</a>
          </li>
        </ul>
      </div>
      <div class="goods-list-box">
        <div class="goods-list clearfix">
          <div
              v-for="(item, idx) in goods"
              class="goods-item">
            <a target="_blank"
               href="javascript: void(0);">
              <div class="figure figure-img">
                <img :src="item.pictures?.[0]"
                     width="200" height="200" alt="">
              </div>
              <h2 class="title">{{ item.skuName }}</h2>
              <p class="price"><span>{{ $filters.formatShowPrice(item.showPrice) }}</span></p>
              <div class="thumbs">
                <ul class="thumb-list">
                  <li v-for="pic in item.pictures">
                    <img :src="pic" width="34" height="34" alt="">
                  </li>
                </ul>
              </div>
              <!--              <div class="flags">-->
              <!--                <span class="salel-label">-->
              <!--                  <img width="42" height="18" class="sale-icon" alt="" src="">-->
              <!--                </span>-->
              <!--              </div>-->
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>

import {onMounted, reactive, toRefs, watch, ref, toRaw} from "vue";
import {search} from "@/api/product/goods-api";
import {useRoute, useRouter} from "vue-router";

const route = useRoute();
const router = useRouter();

watch(
    () => route.query,
    async newQuery => {
      console.log('query change', newQuery)
      const {keyword} = newQuery
      searchQueryParams.value = {
        keyword
      }
      await performSearch();
    }
)

onMounted(async () => {
  if (!route.query) {
    return;
  }
  const {keyword, brand, category, attrs} = route.query;
  data.searchQueryParams = {
    keyword,
    attrs,
    brand,
    category
  }
  console.log(data.searchQueryParams)
  await performSearch();
})

const performSearch = async () => {
  const {keyword, brand, category, attrs} = data.searchQueryParams;
  console.log(keyword)
  try {
    const result = await search({keyword});
    data.goods = result.data
  } catch (e) {

  }
};

const searchQueryParams = ref({
  attrs: null,
  brand: null,
  category: null,
  current: 1,
  keyword: '',
  // priceRange: "",
  size: 20,
  // sortAsc: "",
  // sortDesc: "",
  // sortDirection: "",
  // sortField: ""
})

const data = reactive({
  goods: [],
  // searchQueryParams: {
  //   attrs: null,
  //   brand: null,
  //   category: null,
  //   current: 1,
  //   keyword: '',
  //   // priceRange: "",
  //   size: 20,
  //   // sortAsc: "",
  //   // sortDesc: "",
  //   // sortDirection: "",
  //   // sortField: ""
  // }
})

const {
  goods
} = toRefs(data)


</script>
<style scoped>

.search-result {
  padding: 20px 0 100px;
}

.search-result .result-order {
  position: relative;
  margin: 0 auto;
  width: 1226px;
}

.search-result .result-order .order-list-box {
  position: relative;
  height: 30px;
  margin: 20px 0;
}

.search-container .address-box {
  position: absolute;
  padding: 42px 20px 0 20px;
  top: 28px;
  right: 0;
  background: #fff;
  z-index: 99;
  width: 582px;
  border: 1px solid #e3e3e3;
  -webkit-box-shadow: 0 6px 12px 0 rgba(0, 0, 0, .15);
  box-shadow: 0 6px 12px 0 rgba(0, 0, 0, .15);
  margin: 0;
}

.edit-address {
  min-height: 350px;
}

.search-result .result-order .order-list-box .order-list {
  float: left;
  height: 30px;
  line-height: 30px;
}

.search-result .result-order .order-list-box .order-list li:first-child {
  border-left: none;
}

.search-result .result-order .order-list-box .order-list li {
  float: left;
  padding: 0 30px;
  border-left: 1px solid #e0e0e0;
  line-height: 20px;
}

.search-result .result-order .order-list-box .order-list li.active a {
  color: #ff6700;
}

.search-result .result-order .order-list-box .type-list {
  float: right;
  height: 30px;
  line-height: 30px;
}

.search-result .result-order .order-list-box .type-list li {
  float: left;
  margin-left: 30px;
}

.search-result .result-order .order-list-box .address-choose {
  color: #424242;
}

.search-result .result-order .order-list-box .address-choose .label {
  display: inline-block;
  margin-right: 8px;
  height: 30px;
}

.search-result .result-order .order-list-box .address-choose {
  color: #424242;
}

.search-result .result-order .order-list-box .address-choose .address-show {
  position: relative;
  display: inline-block;
  background: #fff;
  border: 1px solid #e3e3e3;
  height: 14px;
  line-height: 14px;
  padding: 7px 14px;
  cursor: pointer;
}

.search-result .result-order .order-list-box .address-choose .address-show:after {
  width: 0;
  height: 0;
  overflow: hidden;
  font-size: 0;
  line-height: 0;
  border-width: 6px;
  border-style: dashed dashed dashed solid;
  border-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) #a9a9a9;
  position: absolute;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  right: -4px;
  bottom: -4px;
  content: " ";
}

.search-result .result-order .goods-list-box {
  width: 1226px;
}

.search-result .result-order .goods-list-box .goods-list {
  width: 1240px;
  margin: 0;
}

.search-result .result-order .goods-list-box .goods-list .goods-item {
  position: relative;
  float: left;
  width: 234px;
  height: 444px;
  margin-right: 14px;
  margin-bottom: 14px;
  text-align: center;
  background: #fff;
  -webkit-transition: -webkit-box-shadow .5s linear;
  transition: -webkit-box-shadow .5s linear;
  transition: box-shadow .5s linear;
  transition: box-shadow .5s linear, -webkit-box-shadow .5s linear;
}

.search-result .result-order .goods-list-box .goods-list .goods-item:hover {
  -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, .2);
  box-shadow: 0 5px 15px rgba(0, 0, 0, .2);
}

.search-result .result-order .goods-list-box .goods-list .goods-item > a {
  display: block;
  padding-top: 47px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 100%;
}

.search-result .result-order .goods-list-box .goods-list .goods-item .figure-img {
  width: 200px;
  height: 200px;
  margin: 0 auto 16px;
}

.search-result .result-order .goods-list-box .goods-list .goods-item .figure-img img {
  width: 200px;
  height: 200px;
}

.search-result .result-order .goods-list-box .goods-list .goods-item .title {
  margin: 0 auto;
  width: 230px;
  font-size: 14px;
  font-weight: 400;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.search-result .result-order .goods-list-box .goods-list .goods-item .price {
  margin: 15px 0 15px;
  color: #ff6700;
}

.search-result .result-order .goods-list-box .goods-list .goods-item .thumbs {
  width: 100%;
  height: 37px;
  overflow: hidden;
}

.search-result .result-order .goods-list-box .goods-list .goods-item .thumb-list {
  margin: 0;
  padding: 0;
  font-size: 0;
}

.search-result .result-order .goods-list-box .goods-list .goods-item .thumb-list li {
  display: inline-block;
  width: 34px;
  height: 34px;
  margin: 0 4px;
  border: 1px solid #e0e0e0;
  cursor: pointer;
  -webkit-transition: border-color .2s linear;
  transition: border-color .2s linear;
}

.search-result .result-order .goods-list-box .goods-list .goods-item .thumb-list img {
  width: 34px;
  height: 34px;
}

.search-result .result-order .goods-list-box .goods-list .goods-item .thumb-list li.active,
.search-result .result-order .goods-list-box .goods-list .goods-item .thumb-list li:hover {
  border-color: #ff6700;
}

.search-result .result-order .goods-list-box .goods-list .goods-item .flags {
  position: absolute;
  overflow: hidden;
  left: 0;
  bottom: 36px;
  z-index: 1;
  width: 100%;
  font-size: 0;
  max-height: 18px;
  text-align: center;
}

.search-result .result-order .goods-list-box .goods-list .goods-item .flags .salel-label {
  margin: 0 2px;
}

.search-result .result-order .goods-list-box .goods-list .goods-item .flags .sale-icon {
  margin-left: 4px;
}

.search-result .result-order .goods-list-box .goods-list .goods-item .flags .sale-icon:first-child {
  margin: 0;
}


</style>