<script setup>
import { NMessageProvider, NDialogProvider } from "naive-ui";
// 引入上面你所定义的全局挂载组件
import GlobalContainer from "./global.vue";

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
