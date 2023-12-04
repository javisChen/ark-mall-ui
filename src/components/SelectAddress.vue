<script setup lang="ts">

import districts from "@/utils/address.js";
import {computed, defineProps, reactive, toRefs, watch} from "vue";

const data = reactive({
  l1: null,
  l2: null,
  l3: null,
  l4: null,
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
  if (!data.l1 || data.l1 === '') {
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
  if (!data.l2 || data.l2 === '') {
    return []
  }
  const dis = []
  let ddd = districts[data.l1].districts[data.l2].districts
  for (let i in ddd) {
    dis.push({label: ddd[i].name, value: i})
  }
  return dis
})

const level4Options = computed(() => {
  if (!data.l3 || data.l3 === '') {
    return []
  }
  const dis = []
  let ddd = districts[data.l1].districts[data.l2].districts[data.l3].districts
  for (let i in ddd) {
    dis.push({label: ddd[i].name, value: i})
  }
  return dis
})


const district = computed(() => {
  let d = {}
  if (!data.l1 || data.l1 != '') {
    d.province = districts[data.l1]
  }
  if (!data.l2 || data.l2 != '') {
    d.city = districts[data.l1]?.districts[data.l2]
  }
  if (!data.l3 || data.l3 != '') {
    d.district = districts[data.l1]?.districts[data.l2]?.districts[data.l3]
  }
  if (!data.l4 || data.l4 != '') {
    d.street = districts[data.l1]?.districts[data.l2]?.districts[data.l3]?.districts[data.l4]
  }
  return d
})

defineProps({
  modelValue: {
    type: Object,
  },
})

const emit = defineEmits(['update:modelValue'])

watch(
    district,
    (newV, oldV) => {
      emit('update:modelValue', newV)
    }
)

const {
  l1,
  l2,
  l3,
  l4
} = toRefs(data)

</script>

<template>
  <n-space>
    <n-select placeholder="省" v-model:value="l1" :options="level1Options"
              @update-value="l2=null;l3=null;l4=null"></n-select>
    <n-select placeholder="市" v-model:value="l2" :options="level2Options" @update-value="l3=null;l4=null"></n-select>
    <n-select placeholder="区" v-model:value="l3" :options="level3Options" @update-value="l4=null"></n-select>
    <n-select placeholder="街道" v-model:value="l4" :options="level4Options"></n-select>
  </n-space>
</template>

<style scoped>
.n-select {
  width: 120px;
}
</style>
