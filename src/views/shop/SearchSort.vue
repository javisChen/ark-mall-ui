<template>
  <div class="search-order">
    <div class="order-list-box clearfix">
      <ul class="order-list">
        <li class="order-item" v-for="sort in sorts">
          <a
              @click="clickSort(sort)"
              href="javascript: void(0);">{{ sort.title }}
            <n-icon v-if="sort.hasSort">
              <md-arrow-dropdown v-if="sort.sortDirection === 'asc'"/>
              <md-arrow-dropup v-else/>
            </n-icon>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>

import {MdArrowDropdown, MdArrowDropup} from '@vicons/ionicons4'
import {reactive, toRefs} from "vue";


const changeEmit = 'change';
const emit = defineEmits([changeEmit])

const data = reactive({
  sorts: [
    {
      title: '综合',
      hasSort: false,
      sortField: '',
      sortDirection: ''
    },
    {
      title: '销量',
      hasSort: true,
      sortField: '',
      sortDirection: ''
    },
    {
      title: '价格',
      hasSort: true,
      sortField: 'salesPrice',
      sortDirection: 'asc'
    },
  ],
  clickSort: (sort) => {
    if (sort.hasSort) {
      sort.sortDirection = sort.sortDirection === 'asc' ? 'desc' : 'asc'
    }
    const {sortField, sortDirection} = sort
    console.log(sort)
    emit(changeEmit, {sortField, sortDirection})
  }
})

const {
  sorts,
  clickSort
} = toRefs(data)

</script>

<style scoped>

.search-order {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  font-size: 13px;
}

.order-list-box {
  padding-top: 5px;
  padding-bottom: 5px;
  position: relative;
  width: 1226px;
  background-color: #f8f8fa;
}


.order-list-box .order-list {
  float: left;
  height: 30px;
  line-height: 30px;
  display: flex;
  align-items: center;
}

.order-list .order-item a {
  display: flex;
  align-items: center;
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

.order-list-box .type-list {
  float: right;
  height: 30px;
  line-height: 30px;
}

.order-list-box .type-list li {
  float: left;
  margin-left: 30px;
}

</style>