<template>
  <n-modal
      :close-on-esc="true"
      :mask-closable="false"
      :on-mask-click="() => console.log(123)"
      :show="show"
      class="loading-wrapper"
      transform-origin="center"
      @update:show="() => console.log(666)">
    <div class="loading">
      <n-spin size="small">
        <template #description>
          {{ description }}
        </template>
      </n-spin>
    </div>
  </n-modal>
</template>
<script setup lang="ts">

import {defineProps, defineEmits} from 'vue'

defineProps({
  show: {
    type: Boolean,
    default: false,
    required: true
  },
  description : {
    type: String,
    required: false
  }
})

// defineEmits(['update:show'])

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