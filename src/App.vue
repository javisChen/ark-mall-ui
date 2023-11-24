<script setup>
import { NMessageProvider, NDialogProvider } from "naive-ui";
// 引入上面你所定义的全局挂载组件
import GlobalContainer from "./global.vue";
import {onMounted} from "vue";
import {useCartStore} from "@/store/cart";

onMounted(() => {
  // 尝试初始化购物车信息
  try {
    useCartStore().loadCartInfo();
  } catch (e) {
    console.log(e)
  }
})


</script>

<template>
  <n-message-provider>
    <n-dialog-provider>
      <global-container />
    </n-dialog-provider>
  </n-message-provider>
</template>

<style>
#app {
  height: 100%;
}
</style>
