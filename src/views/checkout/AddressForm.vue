<script setup lang="ts">

import {reactive, ref, toRefs} from "vue";
import {FormRules} from "naive-ui";
import SelectAddress from "../../components/SelectAddress.vue";
import {saveUserReceives} from "@/api/trade/trade-api"

const emit = defineEmits(['submitOk'])

defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const data = reactive({
  formRef: ref(null),
  receiveInfoModel: ref({
    name: '',
    mobile: '',
    address: '',
    districts: {
      province: '',
      city: '',
      district: '',
      street: ''
    },
  }),
  test: '',
  rules: <FormRules>{
    name: {
      required: true,
      message: '请输入姓名',
      trigger: 'blur'
    },
    mobile: {
      required: true,
      message: '请输入手机号码',
      trigger: ['blur']
    },
    address: {
      required: true,
      message: '请输入地址',
      trigger: ['blur']
    },
    districts: {
      required: true,
      message: '请选择【省/市/区/街道】',
      validator(rule, value) {
        if (!value || (!value.province || !value.city || !value.district)) {
          return new Error("请选择【省/市/区】");
        }
        return true;
      },
      trigger: ['blur']
    }
  },
  handleValidateClick(e: MouseEvent) {
    e.preventDefault()
    data.formRef?.validate(async (errors) => {
      if (!errors) {
        const {name, mobile, address, districts} = data.receiveInfoModel
        try {
          await saveUserReceives({
            name,
            mobile,
            address,
            province: districts.province?.name,
            city: districts.city?.name,
            district: districts.district?.name,
            street: districts.street?.name
          })
          emit('submitOk', {
            name,
            mobile,
            address,
            ...districts
          })
          window.$message.success('保存收货信息成功')
        } catch (e) {
          console.log(e)
          window.$message.error('保存收货信息失败')
        }

      }
    })
  }
})

const {
  formRef,
  receiveInfoModel,
  handleValidateClick,
  rules
} = toRefs(data);
</script>

<template>
  <n-modal
      :show="show"
      class="custom-card"
      preset="card"
      :style="{width: '600px'}"
      title="添加收货地址"
      size="huge"
      :bordered="true">

    <n-form ref="formRef"
            :model="receiveInfoModel"
            :rules="rules">

      <n-form-item path="name" label="姓名">
        <n-input v-model:value="receiveInfoModel.name"
                 placeholder="请输入姓名"
                 @keydown.enter.prevent/>
      </n-form-item>

      <n-form-item path="mobile" label="手机">
        <n-input v-model:value="receiveInfoModel.mobile"
                 placeholder="请输入手机"
                 @keydown.enter.prevent/>
      </n-form-item>

      <n-form-item path="districts" label="选择省市区">
        <select-address v-model="receiveInfoModel.districts"/>
      </n-form-item>

      <n-form-item path="address" label="地址">
        <n-input v-model:value="receiveInfoModel.address"
                 placeholder="请输入地址"
                 @keydown.enter.prevent/>
      </n-form-item>

      <n-row :gutter="[0, 24]">
        <n-col :span="24">
          <div style="display: flex; justify-content: flex-end">
            <n-button
                type="default"
                @click="() => data.show = false">
              取消
            </n-button>&nbsp;
            <n-button
                type="primary"
                @click="handleValidateClick">
              确定
            </n-button>
          </div>
        </n-col>
      </n-row>
    </n-form>
  </n-modal>
</template>

<style scoped>

</style>