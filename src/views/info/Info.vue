<script setup lang="ts">
import CommonTopBar from "../common/CommonTopBar.vue";
import {onMounted, reactive, toRefs, computed, ref} from 'vue';
import {getInfo} from "../../api/commodity/commodity-api"
import {addCartItem} from "../../api/order/order-api"
import {useRoute, useRouter} from 'vue-router';
import {yuanToFen, fenToYuan} from '../../utils/util';

const route = useRoute();
const router = useRouter();

const data = reactive({
  currentSku: {},
  selectedAttrCount: 0,
  attrCount: 0,
  product: {},
  selectedSpecValue: []
})


onMounted(async () => {
  try {
    const result = await getInfo({id: route.query.id});
    data.product = result.data
    data.product.attrList.forEach((item, idx) => {
      data.selectedSpecValue[idx] = {attrId: item.id}
      data.attrCount++;
    })
  } catch (e) {
  }
})

const onAttrOver = (item) => {
  if (!item.selected) {
    item.onHover = !item.onHover
  }
}

const addToCart = async () => {
  try {
    await addCartItem()
  } catch (e) {
  }
}


const onAttrClick = (item, specItem) => {
  specItem.optionList.forEach(item => {
    item.selected = false
    item.onHover = false
  })
  item.selected = true;
  item.onHover = true;

  // 更新选中的属性值名称，用于展示的
  data.selectedSpecValue.forEach(obj => {
    if (item.attrId == obj.attrId) {
      obj.value = item.value
    }
  })

  data.selectedAttrCount = data.selectedSpecValue.filter(item => item.value && item.value !='').length
  // 找到对应的SKU价
  if (data.selectedAttrCount === data.attrCount) {
    findSKU()
  }
}

const findSKU = () => {
  console.log('查找对应的SKU')
  const skuArr = data.product.skuList.map(sku => {
    return {
      ...sku,
      values: sku.specList.map(spec => {
        return spec.attrValue
      })
    }
  })
  for (let idx in skuArr) {
    const sku = skuArr[idx]
    const match = data.selectedSpecValue.every(spec => sku.values.includes(spec.value));
    if (match) {
      data.currentSku = sku
      console.log(data.currentSku)
      break;
    }
  }
}

const selectedFullName = computed(() => {
  let s = product.value.name + ' ';
  selectedSpecValue.value.forEach(item => {
    if (item.value) {
      s += item.value + ' '
    }
  })
  return s
})

const {
  currentSku,
  product,
  selectedSpecValue
} = toRefs(data)

</script>

<template>
  <common-top-bar></common-top-bar>
  <div class="container">
    <div class="main">
      <div class="image">
        <img :src="product.mainPicture" alt="">
      </div>
      <div class="info">
        <div class="title">
          {{ product.name }}
        </div>
        <div class="sub-title">
          {{ product.description }}
        </div>
        <div class="price-info">
          <span>{{ product.price }} 元</span>
        </div>
        <div class="line"></div>
        <div class="spec">
          <div class="spec-item"
               v-for="specItem in product.attrList">
            <div class="attr-name">
              选择{{ specItem.name }}
            </div>
            <ul class="attr-value-list clear">
              <li v-for="attrItem in specItem.optionList"
                  @mouseover="onAttrOver(attrItem)"
                  @mouseout="onAttrOver(attrItem)"
                  @click="onAttrClick(attrItem, specItem)"
                  :class="{
                    'active': attrItem.onHover || attrItem.selected,
                    'unactive': !attrItem.onHover
                  }">
                {{ attrItem.value }}
              </li>
            </ul>
          </div>
        </div>
        <div class="selected-list">
          <div class="selected-info">
            <span class="selected-product">{{ selectedFullName }}</span>
            <span class="selected-product-price">{{ fenToYuan(currentSku.salesPrice) }} 元</span>
          </div>
          <div class="total-price">
            总计：{{ fenToYuan(currentSku.salesPrice) }} 元
          </div>
        </div>
        <div class="btn-box">
          <div class="add-cart">
            <a href="" @click.prevent="addToCart">加入购物车</a>
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
  width: 1200px;
}

.main .image {
  width: 600px;
  height: 450px;
  text-align: center;
  margin-right: 10px;
}

.main .image img {
  width: 600px;
  height: 450px;
}

.main .info {
  width: 600px;
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

}

.main .info li {
  margin-right: 12px;
  margin-top: 10px;
  line-height: 42px;
  height: 42px;
  list-style: none;
  cursor: pointer;
  -webkit-transition: all .2s ease;
  transition: all .2s ease;
  width: 280px;
  font-size: 16px;
  text-align: center;
  float: left;
}

.main .info li:last-child {
  margin-right: 0;
}

.other-info {
  width: 85%;
  /*border-bottom: 1px solid #e0e0e0;*/
  margin-bottom: 50px;
}

.selected-list {
  background: #f9f9fa;
  padding: 30px;
  margin-bottom: 30px;
}

.selected-list .selected-info .selected-product {
  color: #616161;
}

.selected-list .selected-info .selected-product-price {
  float: right;
}

.selected-list .total-price {
  color: #ff6700;
  font-size: 24px;
  padding-top: 20px;
}

.btn-box {
}

.btn-box .add-cart {
  width: 298px;
  height: 52px;
  line-height: 52px;
  font-size: 16px;
  background: #ff6700;
  border-color: #ff6700;
  color: #fff;
  text-align: center;
}

.container {
  background-color: #FFFFFF;
}

.active {
  border: 1px solid #ff6700;
  color: #ff6700;
}

.unactive {
  border: 1px solid #e0e0e0;
  color: #000000;
}

</style>
