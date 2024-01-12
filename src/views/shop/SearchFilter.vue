<template>
  <div class="search-filter">
    <div class="filter-wrap">
      <div class="filter-list">

        <div v-if="selectedParams.length > 0" class="item choose-item"><span class="label">已选：</span>
          <div
              v-for="param in selectedParams"
              class="item-option selected-item">
            <a @click="removeSelectedParam(param)"
               href="javascript: void(0);">{{ param.label }}：{{ formatSelectedOptions(param.options) }}
              <i class="iconfont">×</i>
            </a>
          </div>
        </div>

        <div
            v-for="param in filteredSearchParams"
            class="item"
            :class="param.showMore || param.inCheckedMode ? '' : 'show-less'">
          <div class="label">{{ param.label }}：</div>
          <div class="item-wrapper">
            <!-- 参数选项 -->
            <div class="item-option"
                 v-for="option in param.options">

              <!-- 单选模式 -->
              <div v-if="!param.inCheckedMode">
                <a @click="selectParam(param, option)"
                   href="javascript: void(0);">{{ option.label }}
                </a>
              </div>
              <!-- 单选模式 -->

              <!-- 复选模式 -->
              <div v-else>
                <n-checkbox size="small"
                            @update:checked="checkOption($event, param, option)"
                            :label="option.label">
                </n-checkbox>
              </div>
              <!-- 复选模式 -->

            </div>
            <!-- 参数选项 -->

            <!-- 多选模式的按钮组 -->
            <div class="item-confirm" v-if="param.inCheckedMode">
              <n-button style="margin-right: 5px"
                        secondary
                        :disabled="param.selected.length === 0"
                        @click="confirmChecked(param)"
                        size="small">确定
              </n-button>
              <n-button
                  secondary
                  @click="cancelChecked(param)"
                  size="small">取消
              </n-button>
            </div>
            <!-- 多选模式的按钮组 -->

          </div>
          <div class="operation-bar">
            <div class="operation"
                 v-if="param.options.length >= 12 && !param.inCheckedMode"
                 @click="param.showMore = !param.showMore">
              更多
              <n-icon>
                <md-arrow-dropup v-if="param.showMore"/>
                <md-arrow-dropdown v-else/>
              </n-icon>
            </div>
            <!-- 参数支持多选且当前不在多选模式下才展示多选按钮 -->
            <div v-if="param.multiple && !param.inCheckedMode"
                 @click="param.inCheckedMode = true;param.showMore = true"
                 class="operation">多选
              <n-icon>
                <ios-add/>
              </n-icon>
            </div>

          </div>
        </div>

        <div class="fix-position-box">
          <div class="item level-item show-less">
            <div class="label">其他选项：</div>
            <div
                v-for="item in otherAttrs"
                @mouseleave="selectOther({})"
                @mouseenter="selectOther(item)"
                :class="selectedOther.id === item.id ? 'show-child' : ''"
                class="item-option level-menu">
              <a href="javascript: void(0);">{{ item.label }}
                <n-icon>
                  <md-arrow-dropdown/>
                </n-icon>
              </a>
            </div>
          </div>

          <ul
              v-for="item in otherAttrs"
              class="item-child"
              @mouseenter="selectOther(item)"
              @mouseleave="selectOther({})"
              :style="[{display: selectedOther.id === item.id ? 'block':'none'}]">
            <li class="child-list" v-for="option in item.options">
              <a class="product-filter-item"
                 href="javascript: void(0);">{{ option.label }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted, reactive, toRefs} from "vue";
import {MdArrowDropdown, MdArrowDropup, IosAdd} from '@vicons/ionicons4'
import {useRoute, useRouter} from "vue-router";

const route = useRoute();
const router = useRouter();

/**
 * 构建搜索条件的索引，提升性能
 */
const createSearchParamIndex = () => {
  data.searchParams.forEach((param, idx) => {
    data.selectedParamIndexMap.set(param.key, idx)
  })
};

onMounted(() => {
  // 构建索引
  createSearchParamIndex()
  // 解析查询语句
  parseSearchQuery();
})


/**
 * 解析查询字符串，添加到已选参数里面
 */
const parseSearchQuery = () => {
  const routeQuery = route.query;
  console.log('search query', routeQuery)
  if (!routeQuery) {
    return;
  }

  // 这样Hard code的性能和可读性比较好，整个过滤条件组件的结构相对还是比较固定的，所以个人认为没必要太抽象。

  if (routeQuery.brand) {
    const searchParam = data.searchParams[data.selectedParamIndexMap.get('brand')];
    let params = routeQuery.brand.split('^');
    const selectedOptions = searchParam.options.filter(option => params.includes(option.value))
    addParam(searchParam, selectedOptions)
  }

  if (routeQuery.category) {
    const searchParam = data.searchParams[data.selectedParamIndexMap.get('category')];
    let params = routeQuery.category.split('^');
    const selectedOptions = searchParam.options.filter(option => params.includes(option.value))
    addParam(searchParam, selectedOptions)
  }

  if (routeQuery.attrs) {
    const attrs = decodeURIComponent(routeQuery.attrs)
    let params = attrs.split('^');
    params.forEach(param => {
      const attrInfo = param.split('_');
      const attrId = attrInfo[0];
      const searchParam = data.searchParams[data.selectedParamIndexMap.get(`attr_${attrId}`)];
      const attrValues = attrInfo[1].split('||');
      const selectedOptions = searchParam.options.filter(option => attrValues.includes(option.value))
      addParam(searchParam, selectedOptions)
    })
  }
};

const selectOther = (item) => {
  data.selectedOther = item
}


const filteredSearchParams = computed(() => {
  return data.searchParams.filter(item => {
    return !data.selectedParamKeys.has(item.key)
  })
})


/**
 * 多选模式下，选中参数选项
 * @param checked 是否选中 true or false
 * @param param
 * @param option
 */
const checkOption = (checked, param, option) => {
  if (checked) {
    param.selected.push(option)
  } else {
    param.selected = param.selected.filter(o => o.value !== option.value)
  }
}

/**
 * 取消选中的参数
 * @param param
 */
const removeSelectedParam = (param) => {
  data.selectedParamKeys.delete(param.key)
  data.selectedParams = data.selectedParams.filter(o => o.key !== param.key)
  rebuildSearchQuery()
}

/**
 * 取消多选
 * @param param
 */
const cancelChecked = (param) => {
  param.selected = []
  param.inCheckedMode = false
}

/**
 * 提交多选项
 * @param param
 */
const confirmChecked = (param) => {
  const {selected} = param
  addParam(param, selected)
  param.inCheckedMode = false
}

/**
 * 选中过滤参数
 */
const selectParam = (param, option) => {
  addParam(param, [option])
}

/**
 * 构建规格属性的查询字符串
 * @param param
 * @returns attrId_attrValueA||attrValueB
 *
 */
const buildAttrSearchQuery = param => {
  const attrId = param.key.split('_')[1];
  const attrValues = param.options.map(option => option.value);
  return attrId + '_' + attrValues.join('||');
};

/**
 * 构建Uri的查询字符串
 */
const rebuildSearchQuery = () => {
  data.searchQuery = {}
  data.selectedParams.forEach(param => {
    if (param.type === 'attrs') {
      if (data.searchQuery[param.type]) {
        data.searchQuery[param.type] += '^' + buildAttrSearchQuery(param)
      } else {
        data.searchQuery[param.type] = buildAttrSearchQuery(param)
      }
    } else {
      data.searchQuery[param.type] = param.options.map(option => option.value).join('^')
    }
  })
  console.log(data.searchQuery)

  if (data.searchQuery.attrs) {
    data.searchQuery.attrs = encodeURIComponent(data.searchQuery.attrs)
  }

  router.push({
    name: 'search',
    query: {
      keyword: route.query.keyword,
      ...data.searchQuery
    }
  })

}


/**
 * 选中过滤参数
 */
const addParam = (selectedParam, selectOptions) => {
  const {label, key, type} = selectedParam
  if (!data.selectedParamKeys.has(key)) {
    data.selectedParams.push({
      label,
      key,
      type,
      options: selectOptions,
      formatValues: selectOptions.map(value => value.label).join('、')
    })
    // 把已选择条件的key保存起来
    data.selectedParamKeys.add(key)
  } else {
    const found = data.selectedParams[data.selectedParamIndexMap[key]];
    found.options = found.options.concat(selectOptions)
  }

  rebuildSearchQuery();

}

const data = reactive({
  searchQuery: {},
  /**
   * 已选中的参数
   */
  selectedParams: [],
  /**
   * 保存已经选中的参数keys，方便做判断
   */
  selectedParamKeys: new Set(),

  /**
   * 索引表
   */
  selectedParamIndexMap: new Map(),

  searchParams: [
    {
      label: '品牌',
      type: 'brand',
      key: 'brand',
      showMore: false,
      inCheckedMode: false,
      multiple: true,
      options: [{value: '1', label: '小米'}, {value: '2', label: '华为'}],
      selected: [],
    },
    {
      label: '分类',
      type: 'category',
      key: 'category',
      showMore: false,
      inCheckedMode: false,
      multiple: false,
      options: [{value: '1', label: '手机'}, {value: '2', label: '冰箱'}],
      selected: [],
    },
    {
      id: 1,
      type: 'attrs',
      label: '运行内存',
      key: 'attr_1',
      showMore: false,
      inCheckedMode: false,
      multiple: true,
      options: [
        {value: '16G', label: '16G'},
        {value: '32G', label: '32G'}
      ],
      selected: [],
    },
    {
      id: 2,
      type: 'attrs',
      label: '电池续航',
      key: 'attr_2',
      showMore: false,
      inCheckedMode: false,
      multiple: true,
      options: [
        {value: '4800mAh', label: '4800mAh'},
        {value: '4830mAh', label: '4830mAh'},
        {value: '4890mAh', label: '4890mAh'},
      ],
      selected: [],
    },
  ],
  otherAttrs: [
    {
      label: 'CPU型号',
      key: 'other',
      id: 1,
      options: [
        {value: '1', label: '骁龙'},
        {value: '2', label: '骁龙8'}
      ]
    },
    {
      label: 'CPU主频',
      key: 'other',
      id: 2,
      options: [
        {value: '3.3', label: '3.3'},
        {value: '3.6', label: '3.6'}
      ]
    },
    {
      label: 'CPU型号',
      key: 'other',
      id: 3,
      options: [
        {value: '骁龙8', label: '骁龙'},
        {value: '骁龙8', label: '骁龙8'}
      ]
    },
  ],
  selectedOther: {},
  formatSelectedOptions: (selectOptions) => {
    return selectOptions.map(value => value.label).join('、')
  }
})

const {
  otherAttrs,
  selectedOther,
  selectedParams,
  formatSelectedOptions
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
  min-width: 148px;
  //min-height: 41px;
}

.search-filter .filter-list .item {
  position: relative;
  overflow: hidden;
  border-top: 1px solid #ededed;
  padding: 0 60px 0 118px;
  margin: 0;
  list-style: none;
  font-size: 0;
}

.search-filter .filter-list .item:first-child {
  border-top: none;
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
  font-size: 13px;
}

.search-filter .filter-list .item .selected-item {
  height: auto;
  margin: 0 10px 0 0;
  padding: 0;
  width: auto;
  min-width: 148px;
}

.search-filter .filter-list .item .selected-item.item-option {
  padding: 0;
}

.search-filter .filter-list .item .selected-item a {
  position: relative;
  border: 1px solid #b0b0b0;
  display: inline-block;
  padding: 5px 58px 5px 20px;
  min-width: 138px;
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

.search-filter .filter-list .item .item-wrapper {
  //border: 1px solid blue;
}

.search-filter .filter-list .item .item-confirm {
  text-align: center;
  margin-bottom: 10px;
}

.search-filter .filter-list .item .item-option {
  display: inline-block;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #424242;
  font-size: 13px;
  min-width: 85px;
  padding: 10px 0;
  height: auto;
  line-height: 20px;
  margin-right: 10px;
}

.search-filter .filter-list .item .item-option a {
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
  font-size: 13px;
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
  font-size: 13px;
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