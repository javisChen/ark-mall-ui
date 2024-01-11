<template>
  <div v-if="data.length >= 12"
       class="more-btn"
       @click="showMore = !showMore">更多
    <n-icon>
      <md-arrow-dropdown v-if="!showMore"/>
      <md-arrow-dropup v-else/>
    </n-icon>
  </div>
</template>
<script setup>
defineProps({
  showMore: {
    type: Boolean,
    default: false,
    required: true
  },
  data: {
    type: Array,
    required: true
  },
})

import {MdArrowDropdown, MdArrowDropup} from '@vicons/ionicons4'

</script>

<style scoped>

</style>