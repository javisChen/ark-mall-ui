<template>
  <div class="search-filter">
    <div class="filter-wrap">
      <div class="filter-list">
        <ul class="item choose-item"><span class="label">已选：</span>
          <li
              v-for="item in selectedParams"
              class="selected-item">
            <a href="javascript: void(0);">{{ item.label }}：{{ item.valuesFormat() }}<i
                class="iconfont">×</i></a></li>
        </ul>

        <!-- 品牌 -->
        <ul
            v-for="param in filterParams"
            class="item"
            :class="param.showMore ? '' : 'show-less'">
          <span class="label">{{ param.label }}：</span>
          <li class="" v-for="option in param.options">
            <a @click="selectParam(param, option)" href="javascript: void(0);">{{ option.name }}</a>
          </li>
          <div class="operation-bar">
            <div class="operation"
                 v-if="param.options.length >= 12"
                 @click="param.showMore = !param.showMore">
              更多
              <n-icon><md-arrow-dropdown v-if="!param.showMore"/><md-arrow-dropup v-else/></n-icon>
            </div>&nbsp;
            <div v-if="param.multiple"
                 @click="param.showMore = !param.showMore"
                 class="operation">多选<n-icon><ios-add/></n-icon>
            </div>
          </div>
          <div class=""></div>
        </ul>

        <div class="fix-position-box">
          <ul class="item level-item show-less">
            <span class="label">其他选项：</span>
            <li
                v-for="item in otherAttrs"
                @mouseleave="selectOther({})"
                @mouseenter="selectOther(item)"
                :class="selectedOther.id === item.id ? 'show-child' : ''"
                class="level-menu">
              <a href="javascript: void(0);">{{ item.label }}
                <n-icon>
                  <md-arrow-dropdown/>
                </n-icon>
              </a>
            </li>
          </ul>

          <ul
              v-for="item in otherAttrs"
              class="item-child"
              @mouseenter="selectOther(item)"
              :style="[{display: selectedOther.id === item.id ? 'block':'none'}]">
            <li class="child-list" v-for="option in item.options">
              <a class="product-filter-item"
                 href="javascript: void(0);">{{ option.name }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, reactive, toRefs} from "vue";
import {search} from "@/api/product/goods-api";
import {MdArrowDropdown, MdArrowDropup, IosAdd} from '@vicons/ionicons4'
import ShowMore from "@/views/shop/ShowMore.vue";


// brandIds=2^3^4^5&attrs=attrId_attrValueA||attrValueB^attrId_attrValue^attrId_attrValue

onMounted(async () => {
  try {
    const result = await search();
    data.productList = result.data
  } catch (e) {
  }
})

const selectOther = (item) => {
  data.selectedOther = item
  console.log(data.selectedOther)
}

const selectParam = (param, selectedOption) => {
  const {label, key} = param
  data.selectedParams.push({
    label,
    key,
    values: [{id: '1', name: '小米'}, {id: '2', name: '华为'}],
    valuesFormat() {
      return this.values.map(value => value.name).join('、');
    },
  })
}

const data = reactive({
  /**
   * 已选中的参数
   */
  selectedParams: [
    {
      label: '品牌',
      key: 'brandId',
      values: [{id: '1', name: '小米'}, {id: '2', name: '华为'}],
      valuesFormat() {
        return this.values.map(value => value.name).join('、');
      },
    },
    {
      label: '品牌',
      key: 'brandId',
      values: [{id: '1', name: '小米'}, {id: '2', name: '华为'}],
      valuesFormat() {
        return this.values.map(value => value.name).join('、');
      },
    },
    {
      label: '品牌',
      key: 'brandId',
      values: [{id: '1', name: '小米'}, {id: '2', name: '华为'}],
      valuesFormat() {
        return this.values.map(value => value.name).join('、');
      },
    },
    {
      label: '品牌',
      key: 'brandId',
      values: [{id: '1', name: '小米'}, {id: '2', name: '华为'}],
      valuesFormat() {
        return this.values.map(value => value.name).join('、');
      },
    },
    {
      label: '品牌',
      key: 'brandId',
      values: [{id: '1', name: '小米'}, {id: '2', name: '华为'}],
      valuesFormat() {
        return this.values.map(value => value.name).join('、');
      },
    },
    {
      label: '品牌',
      key: 'brandId',
      values: [{id: '1', name: '小米'}, {id: '2', name: '华为'}],
      valuesFormat() {
        return this.values.map(value => value.name).join('、');
      },
    },
    {
      label: '品牌',
      key: 'brandId',
      values: [{id: '1', name: '小米'}, {id: '2', name: '华为'}],
      valuesFormat() {
        return this.values.map(value => value.name).join('、');
      },
    },
    {
      label: '品牌',
      key: 'brandId',
      values: [{id: '1', name: '小米'}, {id: '2', name: '华为'}],
      valuesFormat() {
        return this.values.map(value => value.name).join('、');
      },
    },
    {
      label: '品牌',
      key: 'brandId',
      values: [{id: '1', name: '小米'}, {id: '2', name: '华为'}],
      valuesFormat() {
        return this.values.map(value => value.name).join('、');
      },
    },
    {
      label: '品牌',
      key: 'brandId',
      values: [{id: '1', name: '小米'}, {id: '2', name: '华为'}],
      valuesFormat() {
        return this.values.map(value => value.name).join('、');
      },
    },
    {
      label: '品牌',
      key: 'brandId',
      values: [{id: '1', name: '小米'}, {id: '2', name: '华为'}],
      valuesFormat() {
        return this.values.map(value => value.name).join('、');
      },
    },
    {
      label: '品牌',
      key: 'brandId',
      values: [{id: '1', name: '小米'}, {id: '2', name: '华为'}],
      valuesFormat() {
        return this.values.map(value => value.name).join('、');
      },
    },
  ],
  filterParams: [
    {
      label: '品牌',
      key: 'brandIds',
      showMore: false,
      multiple: true,
      options: [{id: '1', name: '小米'}, {id: '2', name: '华为'}]
    },
    {
      label: '分类',
      key: 'categoryIds',
      showMore: false,
      multiple: false,
      options: [{id: '1', name: '手机'}, {id: '2', name: '冰箱'}]
    },
    {
      label: '运行内存',
      key: 'attrs',
      showMore: false,
      multiple: false,
      options: [{id: '1', name: '16G'}, {id: '2', name: '32G'}]
    },
    {
      label: '电池续航',
      key: 'attrs',
      showMore: false,
      multiple: false,
      options: [
        {id: '1', name: '4050mAh'},
        {id: '2', name: '4500mAh'},
        {id: '3', name: '4600mAh'},
        {id: '4', name: '4610mAh'},
        {id: '5', name: '4800mAh'},
        {id: '6', name: '4820mAh'},
        {id: '7', name: '4880mAh'},
        {id: '3', name: '4600mAh'},
        {id: '4', name: '4610mAh'},
        {id: '5', name: '4800mAh'},
        {id: '6', name: '4830mAh'},
        {id: '7', name: '4890mAh'},
      ]
    },
  ],
  otherAttrs: [
    {
      label: 'CPU型号',
      key: 'other',
      id: 1,
      options: [{id: '1', name: '骁龙'}, {id: '2', name: '骁龙8'}]
    },
    {
      label: 'CPU主频',
      key: 'other',
      id: 2,
      options: [{id: '1', name: '3.3'}, {id: '2', name: '3.6'}]
    },
    {
      label: 'CPU型号',
      key: 'other',
      id: 3,
      options: [{id: '1', name: '骁龙'}, {id: '2', name: '骁龙8'}]
    },
  ],
  selectedOther: {}
})

const {
  otherAttrs,
  selectedOther,
  selectedParams,
  filterParams
} = toRefs(data)

</script>

<style scoped>

.search-filter {
  background: #fff;
}

.search-filter .filter-wrap {
  margin: auto;
  width: 1226px;
  padding: 18px 0;
}

.search-filter .filter-list {
  position: relative;
}

.search-filter .filter-list .item:first-child {
  border-top: none;
}

.search-filter .filter-list .item.choose-item {
  padding-bottom: 14px;
  min-width: 148px;
}

.search-filter .filter-list .item {
  position: relative;
  overflow: hidden;
  border-top: 1px solid #ededed;
  padding: 0 60px 0 124px;
  margin: 0;
  list-style: none;
  font-size: 0;
}

.search-filter .filter-list .label {
  top: 0;
  left: 0;
  color: #b0b0b0;
}

.search-filter .filter-list .label {
  position: absolute;
  height: 20px;
  line-height: 20px;
  padding: 10px 0;
  font-size: 12px;
}

.search-filter .filter-list .item .selected-item {
  height: auto;
  margin: 3px 10px 3px 0;
  padding: 0;
  width: auto;
  max-width: 100%;
}

.search-filter .filter-list .item .selected-item a {
  position: relative;
  border: 1px solid #b0b0b0;
  display: inline-block;
  padding: 5px 58px 5px 20px;
}

.search-filter .filter-list .item .selected-item a .iconfont {
  position: absolute;
  right: 0;
  top: 0;
  width: 32px;
  height: 32px;
  font-size: 18px;
  line-height: 28px;
  text-align: center;
  background-color: #b0b0b0;
  color: #fff;
}

.search-filter .filter-list .item li {
  display: inline-block;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #424242;
  font-size: 12px;
  max-width: 148px;
  min-width: 90px;
  padding: 10px 0;
  height: 20px;
  line-height: 20px;
}

.search-filter .filter-list .item a {
  max-width: 138px;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #424242;
}

.search-filter .filter-list .item.show-less {
  height: 40px;
}

.search-filter .filter-list .item a:hover {
  color: #f60;
}

.search-filter .filter-list .item .level-menu {
  text-align: center;
  padding: 10px;
}

.search-filter .filter-list .item .show-child {
  -webkit-box-shadow: -1px -4px 4px 0 rgba(0, 0, 0, .1);
  box-shadow: -1px -4px 4px 0 rgba(0, 0, 0, .1);
  position: relative;
  background: #fff;
  z-index: 100;
}

.search-filter .filter-list .item-child {
  position: absolute;
  background: #fff;
  -webkit-box-shadow: -1px 4px 10px 0 rgba(0, 0, 0, .1);
  box-shadow: -1px 4px 10px 0 rgba(0, 0, 0, .1);
  width: 1224px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 10px 36px;
  z-index: 99;
}

.search-filter .filter-list .item.level-item {
  padding-left: 100px;
}

.search-filter .filter-list .item-child .child-list .product-filter-item,
.search-filter .filter-list .item-child .child-list {
  display: inline-block;
  height: 40px;
  line-height: 40px;
  font-size: 12px;
  min-width: 100px;
}

.search-container .container-main .search-filter .fix-position-box .item {
  border-top: 1px solid #ededed !important;
}

.search-container .container-main .search-filter .filter-list .item .selected-item a:hover {
  color: #e53935;
  border: 1px solid #e53935;
}

.search-container .container-main .search-filter .filter-list .item .selected-item a:hover .iconfont {
  background-color: #e53935;
}

.operation-bar {
  cursor: pointer;
  color: #757575;
  right: 0;
  top: 0;
  position: absolute;
  height: 20px;
  line-height: 20px;
  padding: 10px 0;
  font-size: 12px;
  width: auto;
  display: flex;
  flex-direction: row;
}

.operation-bar . {
  cursor: pointer;
  color: #757575;
}

.operation-bar .operation {
  display: flex;
  align-items: center;
}

</style>