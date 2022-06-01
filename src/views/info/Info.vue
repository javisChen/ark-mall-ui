<script setup lang="ts">
import CommonTopBar from "../common/CommonTopBar.vue";
import {reactive} from 'vue';
import {useRoute, useRouter} from 'vue-router';

const data = reactive({
  product: {}
})

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
          苹果(Apple) iPhone 13 128GB 午夜色 移动联通电信5G全网通手机 双卡双待 苹果iphone13
        </div>
        <div class="sub-title">
          天玑8100｜144Hz高配LCD屏幕｜6400万像素｜VC液冷散热
        </div>
        <div class="price-info">
          <span>1699 元</span>
          <del class="discounts">1799 元</del>
        </div>
        <div class="line"></div>
        <div class="spec">
          <div class="spec-item">
            <div class="attr-name">
              选择产品
            </div>
            <ul class="attr-value-list">
              <li class="attr-value">
                Redmi Note 11T Pro
              </li>
              <li class="attr-value">
                Redmi Note 11T Pro
              </li>
            </ul>
          </div>
          <div class="spec-item">
            <div class="attr-name">
              选择产品
            </div>
            <ul class="attr-value-list">
              <li class="attr-value">
                Redmi Note 11T Pro
              </li>
              <li class="attr-value">
                Redmi Note 11T Pro
              </li>
              <li class="attr-value">
                Redmi Note 11T Pro
              </li>
            </ul>
          </div>
          <div class="spec-item">
            <div class="attr-name">
              选择产品
            </div>
            <ul class="attr-value-list">
              <li class="attr-value">
                Redmi Note 11T Pro
              </li>
              <li class="attr-value">
                Redmi Note 11T Pro
              </li>
              <li class="attr-value">
                Redmi Note 11T Pro
              </li>
            </ul>
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
  width: 1226px;
}

.main .image {
  width: 606px;
  height: 450px;
  text-align: center;
}

.other-info {
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
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.main .info .attr-value {
  margin-right: 12px;
  margin-top: 10px;
  line-height: 42px;
  height: 42px;
  border: 1px solid #e0e0e0;
  list-style: none;
  cursor: pointer;
  -webkit-transition: all .2s ease;
  transition: all .2s ease;
  width: 292px;
  font-size: 16px;
  text-align: center;
}

.other-info {
  width: 85%;
  border-bottom: 1px solid #e0e0e0;
}

</style>
