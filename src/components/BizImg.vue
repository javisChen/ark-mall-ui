<template>
  <img :src="src"
       :width="width"
       @error="onError"
       :height="height"/>
</template>
<script setup lang="ts">

import {reactive} from 'vue'
import image404 from '@/assets/image404.png';

defineProps({
  width: {
    type: Number,
    default: 50,
    required: false
  },
  height: {
    type: Number,
    default: 50,
    required: false
  },
  src: {
    type: String,
    required: true
  }
})

const data = reactive({

  onError: async (orderItem) => {
    orderItem.picUrl = image404
  },
})

</script>

<style scoped>

.header-logo img {
  width: 48px;
  height: 48px;
}

.address-info.address-con span {
  margin-right: 3px;
  word-wrap: break-word;
  display: inline-block;
}

.address-action span {
  color: #ff6700;
}

.header-logo img {
  width: 48px;
  height: 48px;
}

.address-info .address-con span {
  margin-right: 3px;
  word-wrap: break-word;
  display: inline-block;
}

.address-action span {
  color: #ff6700;
  margin-left: 10px;
}

.good-name a {
  color: #424242;
}


.count-detail .section-bill .total-price em {
  font-size: 30px;
  line-height: 1;
}

.loading {
  width: 350px;
  height: 100px;
  background-color: #f9f9fa;
  border-radius: 3px;
}

.loading-wrapper {
  display: flex;
  justify-content: center;
}

</style>