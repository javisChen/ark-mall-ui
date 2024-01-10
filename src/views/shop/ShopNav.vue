<template>
  <div class="header">
    <div class="navs">
      <div class="wrapper">
        <div class="header-logo">
          <img src="@/assets/logo-mi.png" alt="">
        </div>
        <div class="header-nav">

        </div>

        <!-- 搜索 -->
        <div class="header-search">
          <input type="search" id="search"
                 autocomplete="off"
                 class="search-text" placeholder="耳机">
          <n-button @click="toSearchPage" class="search-btn" round="false" type="tertiary">
            <template #icon>
              <n-icon>
                <md-search/>
              </n-icon>
            </template>
          </n-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import {MdSearch} from '@vicons/ionicons4'
import {useRoute, useRouter} from 'vue-router';

const route = useRoute();
const router = useRouter();

const toSearchPage = (item) => {
  router.push({
    name: 'search',
  })
}


</script>

<style scoped>

.header {
  width: 100%;
}

.header .navs {
  height: 100px;
  background-color: #FFFFFF;
  display: flex;
  justify-content: center;
}

.header .navs .wrapper {
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  width: 1226px;
  position: relative;
}

.header .navs .wrapper .header-logo {

}

.header .navs .wrapper .header-search {
  position: absolute;
  right: 0;
  width: 296px;
}

.header .navs .wrapper .header-search input {
  width: 224px;
  height: 51px;
  border: 1px solid #e0e0e0;
  border-right: 0;
  outline: 0;
  padding-left: 10px;
}

.header .navs .wrapper .header-search input::-ms-clear {
  display: none;
}

.header .navs .wrapper .header-search .search-btn {
  width: 51px;
  height: 51px;
  position: relative;
  top: 4px;
  border-radius: 0;
}

.header .navs .wrapper .header-search .search-btn:hover {
  border: 1px solid #e0e0e0;
}

.header .navs .wrapper .header-logo img {
  float: left;
  width: 56px;
}

</style>