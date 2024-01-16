<script setup lang="ts">

import {onMounted, reactive, toRefs} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import CommonTopBar from "@/views/common/CommonTopBar.vue";
import {search} from "@/api/product/goods-api"
import ShopNav from "@/views/shop/ShopNav.vue";
import SearchFilter from "@/views/shop/SearchFilter.vue";
import SearchResult from "@/views/shop/SearchResult.vue";
import SearchSort from "@/views/shop/SearchSort.vue";
import SearchBreadcrumbs from "@/views/shop/SearchBreadcrumbs.vue";

const route = useRoute();
const router = useRouter();

onMounted(async () => {
  if (!route.query) {
    return;
  }
  const {keyword} = route.query;
  data.searchQueryParams.keyword = keyword
})


const performSearch = async () => {
  try {
    const result = await search({...data.searchQueryParams});
    data.goods = result.data.skus
    data.agg = result.data.agg
  } catch (e) {

  }
};

const data = reactive({
  goods: [],
  agg: [],
  searchQueryParams: {
    attrs: null,
    brand: null,
    category: null,
    current: 1,
    keyword: '',
    size: 20,
    sortDirection: "",
    sortField: ""
  },
  onSearchQueryChange: (query) => {
    data.searchQueryParams.attrs = query.attrs
    data.searchQueryParams.brand = query.brand
    data.searchQueryParams.category = query.category
    data.searchQueryParams.keyword = query.keyword
    performSearch();
  },
  onKeywordChange: (keyword) => {
    data.searchQueryParams.keyword = keyword
  },
  onOrderQueryChange: (orderQuery) => {
    const {sortField, sortDirection} = orderQuery
    data.searchQueryParams.sortField = sortField
    data.searchQueryParams.sortDirection = sortDirection
    performSearch();
  }
})

const {
  agg,
  goods,
  onKeywordChange,
  onSearchQueryChange,
  onOrderQueryChange
} = toRefs(data)


</script>

<template>

  <common-top-bar/>

  <shop-nav @keywordChange="onKeywordChange"/>

  <div class="search-container">

    <div class="container-main">

      <!-- 面包屑 -->
      <search-breadcrumbs/>
      <!-- 面包屑 -->

      <!-- 搜索条件 -->
      <search-filter @change="onSearchQueryChange"
                     :agg="agg"
                     :keyword="data.searchQueryParams.keyword"/>
      <!-- 搜索条件 -->


      <search-sort @change="onOrderQueryChange"/>

      <search-result :goods="goods"/>
    </div>
  </div>

</template>

<style scoped>

.search-container {
  width: 100%;
  background-color: #ffffff;
  padding-bottom: 20px;
}

.search-container .container-main {
  position: relative;
}

.search-container a {
  cursor: pointer;
}

.breadcrumbs a {
  color: #757575;
}


.order-list-box .order-list li:first-child {
  border-left: none;
}

.order-list-box .order-list li {
  float: left;
  padding: 0 30px;
  border-left: 1px solid #e0e0e0;
  line-height: 20px;
}

.order-list-box .order-list li.active a {
  color: #ff6700;
}

.order-list-box .type-list li {
  float: left;
  margin-left: 30px;
}

</style>
