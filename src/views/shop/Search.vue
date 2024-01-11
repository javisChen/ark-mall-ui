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
  <div class="search-container">
    <div class="loading" style="display: none;">
      <div class="loader"></div>
    </div>
    <div class="container-main" style="">
      <div class="breadcrumbs">
        <div class="container">
          <a href="//www.mi.com">首页</a><span
            class="sep">&gt;</span><a
            href="//www.mi.com/shop/search?keyword=xiaomimix系列">全部结果</a>
        </div>
      </div>
      <search-filter/>
    </div>
  </div>
</template>

<style scoped>


.search-container {
  width: 100%;
}

.search-container .container-main {
  position: relative;
}

.search-container .container-main .breadcrumbs {
  height: 40px;
  font-size: 12px;
  line-height: 40px;
  background: #f5f5f5;
  color: #757575;
}

.search-container a {
  cursor: pointer;
}

.breadcrumbs a {
  color: #757575;
}

.search-container .container-main .breadcrumbs .container {
  width: 1226px;
  margin-right: auto;
  margin-left: auto;
}

.search-container .container-main .breadcrumbs .sep {
  margin: 0 0.5em;
  color: #b0b0b0;
}

</style>
