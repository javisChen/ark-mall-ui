<script setup lang="ts">
import CommonTopBar from "../common/CommonTopBar.vue";
import {reactive, ref, toRefs, computed} from 'vue';
import {useRoute, useRouter, onBeforeRouteUpdate, onBeforeRouteLeave} from 'vue-router';

const route = useRoute();
const router = useRouter();

const data = reactive({
  product: {}
})
onBeforeRouteLeave((to, from) => {
  const answer = window.confirm(
      'Do you really want to leave? you have unsaved changes!'
  )
  // 取消导航并停留在同一页面上
  if (!answer) return false
})

const userData = ref()

// 与 beforeRouteUpdate 相同，无法访问 `this`
onBeforeRouteUpdate(async (to, from) => {
  //仅当 id 更改时才获取用户，例如仅 query 或 hash 值已更改
  console.log(123)
})

const {
  product
} = toRefs(data)


</script>

<template>
  <div class="container">
    <common-top-bar/>
    123
  </div>
</template>

<style scoped>

</style>
