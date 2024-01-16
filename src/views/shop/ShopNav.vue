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
          <div class="input-wrapper">
            <input
                v-model="keyword"
                type="search" id="search"
                autocomplete="off"
                class="search-text" placeholder="手机">
          </div>
          <div class="search-btn-wrapper">
            <button @click="toSearchPage"
                      class="search-btn"
                      type="tertiary">搜索
              <!--            <template #icon>-->
              <!--              <n-icon>-->
              <!--                <md-search/>-->
              <!--              </n-icon>-->
              <!--            </template>-->
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import {MdSearch} from '@vicons/ionicons4'
import {useRoute, useRouter} from 'vue-router';
import {onMounted, reactive, toRefs, watch} from "vue";

const route = useRoute();
const router = useRouter();


const keywordChangeEmit = 'keywordChange';
const emit = defineEmits([keywordChangeEmit])

onMounted(async () => {
  const {keyword} = route.query;
  data.keyword = keyword
})


const toSearchPage = () => {
  if (route.name === 'shop') {
    router.push({
      name: 'search',
      query: {
        keyword: data.keyword || '手机'
      }
    })
  } else {
    emit(keywordChangeEmit, data.keyword)
  }

}

const data = reactive({
  keyword: ''
})

const {
  keyword
} = toRefs(data)


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
  right: 100px;
  display: flex;
}

.header .navs .wrapper .header-search .input-wrapper {
  width: 400px;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  border: 2px solid #ff6700;
  border-right: 0;
}
.header .navs .wrapper .header-search input {
  box-sizing: content-box;
  width: 300px;
  padding: 9px 10px 9px 10px;
  height: 18px;
  line-height: 18px;
  margin-top: 0;
  border: 0;
  background: #FFF;
  color: #BBB;
  font-size: 12px;
  border-radius: 0;
  -webkit-border-radius: 0;
}
.header .navs .wrapper .header-search input:focus {
  outline: none;
  border: none;
}


.header .navs .wrapper .header-search input::-ms-clear {
  display: none;
}

input::-webkit-search-cancel-button {
  display: none;
}

.search-btn-wrapper {
}

.header .navs .wrapper .header-search .search-btn {
  -webkit-appearance: none;
  border-radius: 0;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  position: relative;
  height: 40px;
  width: 100px;
  outline: none;
  right: 0;
  font-size: 20px;
  letter-spacing: 2px;
  text-indent: 2px;
  color: #FFF;
  border: none;
  cursor: pointer;
  background: #ff6700;
}


.search-btn:hover,.search-btn:focus {
  outline: none;
  border: none;
}

.header .navs .wrapper .header-logo img {
  float: left;
  width: 56px;
}

</style>