<script setup lang="ts">

import {useAuthStore} from '../../store/auth'
import md5 from 'md5'
import {reactive, ref, toRefs, computed} from 'vue';
import {useRoute, useRouter} from 'vue-router';

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();

const loginBtnDisabled = computed(() => {
  return !(data.login.username && data.login.password)
})

const data = reactive({
  login: {
    username: '',
    password: '',
  },
  loginBtnLoading: false,
  doLogin: async () => {
    data.loginBtnLoading = true
    try {
      const result = await auth.login({
        username: data.login.username,
        password: md5(data.login.password)
      })
      if (result) {
        router.push({
          name: 'shop'
        })
      }
    } catch (e) {
      console.log(e)
    } finally {
      data.loginBtnLoading = false
    }
  },
})

const {
  doLogin,
  login,
  loginBtnLoading
} = toRefs(data)


</script>

<template>
  <div id="login-container">
    <div id="login-right">
      <div id="login-form">
        <div class="login-tabs">
          <div class="tabs-nav">
            <button class="tabs-nav-bottom" @click="doLogin">登录</button>
            <button class="tabs-nav-bottom">注册</button>
          </div>
        </div>
        <div class="login-content">
          <div class="login-field-input-wrapper">
            <input v-model="login.username" type="text" class="login-field-input" placeholder="用户名">
          </div>
          <div class="login-field-input-wrapper">
            <input v-model="login.password" type="password" class="login-field-input" placeholder="密码">
          </div>
          <div class="login-field-button-wrapper">
            <n-button
                :loading="loginBtnLoading"
                color="#ff5c00" class="login-btn"
                :class="loginBtnDisabled ? ' login-btn-disabled' : ''"
                @click="doLogin">
              登录
            </n-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#login-container {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#login-right {
  width: 100%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  flex-direction: row;
}

#login-form {
  width: 400px;
  height: 400px;
  background-color: #fff;
  border-radius: 4px;
  padding: 40px 20px;
  box-shadow: 0 20px 50px 0 hsl(0deg 0% 64% / 10%);
}

.tabs-nav-bottom {
  background: rgba(0, 0, 0, 0);
  border: 0;
  font-size: 22px;
  font-weight: 400;
}

.login-field-button-wrapper {
  width: 100%;
}

.login-btn {
  border-radius: 4px;
  font-size: 18px;
  width: 100%;
  border: 0;
  outline: none;
  line-height: 60px;
  height: 60px;
  background-color: #ff5c00;
  color: #fff;
}

.login-btn-disabled {
  opacity: .4;
  border: 1px solid gray;
  outline: none;
}

.login-content {
  margin-top: 40px;
}

.login-field-input-wrapper {
  background-color: #f9f9f9;
  border-radius: 4px;
  margin-bottom: 15px;
}

.login-field-input {
  background-color: #f9f9f9;
  border: 0;
  padding: 15px;
  width: 90%;
}

.login-field-input:focus {
  border: 0;
  outline: none;
}
</style>
