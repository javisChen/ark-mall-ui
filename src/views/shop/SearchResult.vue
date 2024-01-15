<template>
  <div class="search-result">
    <div class="result-order">
      <div v-if="goods && goods.length > 0"
           class="goods-list-box">
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
              <div class="thumbs">
                <ul class="thumb-list">
                  <li v-for="pic in item.pictures">
                    <a href=""><img :src="pic" alt=""></a>
                  </li>
                </ul>
              </div>
              <div class="price-wrapper">
                <span class="price">
                  <strong>
                    <em>￥</em><i>{{ $filters.formatRawPrice(item.salesPrice) }}</i>
                  </strong>
                </span>
              </div>
              <div class="title-wrapper">
                <h2 class="title">
                  <n-ellipsis :line-clamp="2">
                    {{ item.skuName }}
                  </n-ellipsis>
                </h2>
              </div>
              <div class="evaluate-wrapper">
                <strong>
                  <a href="javascript:void(0)">50万+</a>条评价
                </strong>
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
      <div class="no-goods" v-else>
        抱歉，没有找到与关键词相关的商品
      </div>
    </div>
  </div>
</template>
<script setup>

import {onMounted, reactive, toRefs} from "vue";
import {useRoute, useRouter} from "vue-router";

const route = useRoute();
const router = useRouter();

defineProps({
  goods: {
    type: Array,
    default: [],
    required: true
  },
})

onMounted(async () => {
})

const data = reactive({})

const {} = toRefs(data)


</script>
<style scoped>

.search-result {
  //padding: 20px 0 100px;
  background: #fff;
}

.search-result .result-order {
  position: relative;
  margin: 0 auto;
  width: 1226px;
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
  margin-right: 3px;
  margin-bottom: 14px;
  padding: 0 5px;
  background: #fff;
  -webkit-transition: -webkit-box-shadow .5s linear;
  transition: -webkit-box-shadow .5s linear;
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

.search-result .result-order .goods-list-box .goods-list .goods-item .title-wrapper {
  height: 40px;
  text-align: left;
  line-height: 20px;
  font-size: 13px;
  padding: 0 4px;
  margin-bottom: 8px;
}

.search-result .result-order .goods-list-box .goods-list .goods-item .price-wrapper {
  text-align: left;
  margin-bottom: 8px;
  margin-top: 10px;
}


.search-result .result-order .goods-list-box .goods-list .goods-item .evaluate-wrapper {
  padding: 0 4px;
}

.search-result .result-order .goods-list-box .goods-list .goods-item .evaluate-wrapper strong {
  color: #a7a7a7;
  font-weight: 400;
  font-size: 13px;
}

.search-result .result-order .goods-list-box .goods-list .goods-item .evaluate-wrapper a {
  color: #646fb0;
  font-weight: 700;
  font-size: 13px;
}

.search-result .result-order .goods-list-box .goods-list .goods-item .price {
  font-size: 20px;
  font-weight: 400;
  color: #ff6700;
}

.search-result .result-order .goods-list-box .goods-list .goods-item .price em {
  font-size: 16px;
}

.search-result .result-order .goods-list-box .goods-list .goods-item .thumbs {
  width: 100%;
  height: 29px;
  //padding: 5px 0;
  overflow: hidden;
}

.search-result .result-order .goods-list-box .goods-list .goods-item .thumb-list {
}

.search-result .result-order .goods-list-box .goods-list .goods-item .thumb-list li {
  display: inline-block;
  //width: 34px;
  //height: 29px;
  margin: 0 3px;
  border: 1px solid #e0e0e0;
  cursor: pointer;
  text-align: center;
  -webkit-transition: border-color .2s linear;
  transition: border-color .2s linear;
}

.search-result .result-order .goods-list-box .goods-list .goods-item .thumb-list li a {
  width: 25px;
  height: 25px;
}


.search-result .result-order .goods-list-box .goods-list .goods-item .thumb-list img {
  width: 25px;
  height: 25px;
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

.search-result .no-goods {
  display: flex;
  justify-content: center;
  color: #ff6700;;
  font-weight: bold;
  font-size: 16px;
}


</style>