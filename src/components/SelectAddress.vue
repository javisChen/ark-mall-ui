<script setup lang="ts">

import districts from "@/utils/address.js";
import {computed, reactive, toRefs, watch} from "vue";

const data = reactive({
  l1: '',
  l2: '',
  l3: '',
  d: ''
})

const level1Options = computed(() => {
  const dis = []
  let ddd = districts
  for (let i in ddd) {
    dis.push({label: ddd[i].name, value: i})
  }
  return dis
})


const level2Options = computed(() => {
  if (data.l1 === '') {
    return []
  }
  const dis = []
  let ddd = districts[data.l1].districts
  for (let i in ddd) {
    dis.push({label: ddd[i].name, value: i})
  }
  return dis
})


const level3Options = computed(() => {
  if (data.l2 === '') {
    return []
  }
  const dis = []
  let ddd = districts[data.l1].districts[data.l2].districts
  for (let i in ddd) {
    dis.push({label: ddd[i].name, value: i})
  }
  return dis
})


const district = computed(() => {
  let d = {}
  if (data.l1 != '') {
    d.province = districts[data.l1]
  }
  if (data.l2 != '') {
    d.city = districts[data.l1].districts[data.l2]
  }
  if (data.l3 != '') {
    d.district = districts[data.l1].districts[data.l2].districts[data.l3]
  }
  return d
})

const emit = defineEmits(['selectedDistrict'])

watch(
    district,
    (newV, oldV) => {
      emit('selectedDistrict', newV)
    }
)

const {
  l1,
  l2,
  l3
} = toRefs(data)

</script>


<template>
  <n-space>
    <n-select v-model:value="l1" :options="level1Options" @update-value="l2='';l3=''"></n-select>
    <n-select v-model:value="l2" :options="level2Options" @update-value="l3=''"></n-select>
    <n-select v-model:value="l3" :options="level3Options"></n-select>
  </n-space>
</template>

<style scoped>
.n-select {
  width: 100px;
}
</style>
