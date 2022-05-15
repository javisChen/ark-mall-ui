<script setup>
import {ref} from 'vue'

const count = ref(0)
</script>

<template>
  <div id="login-container">

    <div id="login-left">
      123
    </div>
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
          <div class="login-field-input">

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

#login-left {
  background-image: url("../assets/login-left.jpg");
  background-color: #1aa5fb;
  background-size: cover;
  width: 20%;
  min-height: 100%;
}

#login-right {
  width: 80%;
  background-color: #fff;
  display: flex;
  justify-content: center;
}

#login-form {
  min-width: 450px;
  height: 598px;
  background-color: #fff;
  border-radius: 4px;
  padding: 40px 45px;
  margin: 0 auto 80px;
  box-shadow: 0 20px 50px 0 hsl(0deg 0% 64% / 10%);
}

.tabs-nav-bottom {
  background: rgba(0,0,0,0);
  border: 0;
  font-size: 22px;
  font-weight: 400;
}

</style>
