<script setup lang="ts">
import {ref} from 'vue'

const count = ref(0)
const login = ref({})
let loginBtnDisabled = ref(true)

const doLogin = () => {
}

const onChange = ($event, value) => {
  loginBtnDisabled.value = !(login.value.username && login.value.password)
}
</script>

<template>
  <div id="login-container">
<!--    <div id="login-left">-->
<!--    </div>-->
    <div id="login-right">
      <div id="login-form">
        <div></div>
        <div class="login-tabs">
          <div class="tabs-nav">
            <button class="tabs-nav-bottom">登录</button>
            <button class="tabs-nav-bottom">注册</button>
          </div>
        </div>

        <div class="login-content">
          <div class="login-field-input-wrapper">
            <input @keyup="onChange($event, value)"
                   v-model="login.username" type="text" class="login-field-input" placeholder="用户名">
          </div>
          <div class="login-field-input-wrapper">
            <input @keyup="onChange($event, value)"
                   v-model="login.password" type="text" class="login-field-input" placeholder="密码">
          </div>
          <div class="login-field-button-wrapper">
            <button class="login-btn"
                    :class="loginBtnDisabled ? ' login-btn-disabled': ''"
                    @click="doLogin">登录</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

#login-container {
  display: flex;
  min-height: 100%;
}

#login-right {
  width: 100%;
  background-color: #fff;
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
}

#login-form {
  border: 1px solid red;
  min-width: 400px;
  height: 598px;
  background-color: #fff;
  border-radius: 4px;
  padding: 40px 20px;
  margin: 0 auto 80px;
  box-shadow: 0 20px 50px 0 hsl(0deg 0% 64% / 10%);
}

.tabs-nav-bottom {
  background: rgba(0,0,0,0);
  border: 0;
  font-size: 22px;
  font-weight: 400;
}

.login-field-button-wrapper {
  width: 100%;
  /*border: 1px solid red;*/
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
}

.login-field-input:focus {
  border: 0;
  outline: none;
}

</style>
