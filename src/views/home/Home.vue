<script setup lang="ts">

import {reactive, ref, toRefs, computed} from 'vue';
import {useRoute, useRouter} from 'vue-router';

const route = useRoute();
const router = useRouter();

interface Login {
  username: string
  password: string
}

const data = reactive({})

const {
  login,
} = toRefs(data)


</script>

<template>
  <div id="container">
    <div></div>
    <div class="header">
      <div class="top-bar">
        1
      </div>
      <div class="navs">
        2
      </div>
    </div>

    <div class="category">
      3
    </div>

    <div class="content">
      <div class="box">
        <div class="box-hd">
          <h2 class="title">手机</h2>
        </div>
        <div class="box-bd">
          <ul class="item-list">
            <li class="item" v-for="item in 8">
              <a href="#">
                <div class="product-img">
                  <img width="160" height="160" src="src/assets/test-prod.webp" alt="">
                </div>
                <h3 class="title">Redmi Note 11T Pro+</h3>
                <p class="desc">天玑8100｜真旗舰芯</p>
                <p class="price">
                  <span class="num">2099</span>
                  <span>起</span>
                </p>
              </a>
            </li>
          </ul>
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

.header .top-bar {
  color: #b0b0b0;
  background-color: #333333;
  height: 40px;
}

.header .navs {
  background-color: saddlebrown;
  height: 100px;
}

.category {
  width: 100%;
  background-color: darkcyan;
  height: 460px;
}

.content {
  width: 1226px;
}

.item-list .item {
  height: 300px;
  width: 234px;
  border: 1px solid red;
  float: left;
}

</style>
