<script setup lang="ts">

import {onMounted, reactive, toRefs} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import CommonTopBar from "@/views/common/CommonTopBar.vue";

const route = useRoute();
const router = useRouter();

onMounted(async () => {

})

const data = reactive({})

const {} = toRefs(data)


</script>

<template>
  <common-top-bar/>
  <div class="main">
    <div class="container">
      <div id="J_userMenu" class="user-address-menu">
        <div class="menu-box"><h3 class="title">订单中心</h3>
          <ul class="list">
            <li class="active"><a href="//www.mi.com/shop/user/orderList?r=1701067386">我的订单</a></li>
          </ul>
        </div>
        <div class="menu-box"><h3 class="title">账户管理</h3>
          <ul class="list">
            <li><a href="javascript:void(0)">地址管理</a></li>
            <li><a href="javascript:void(0)">修改密码</a>
            </li>
          </ul>
        </div>
      </div>
      <!-- 右侧内容  -->
      <div class="right-content">
        <div class="uc-box uc-main-box">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  margin-top: 38px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.container {
  width: 1226px;
  display: flex;
  flex-direction: row;
}

.right-content {
  width: 978px;
  margin-left: 14px;
}

#J_userMenu {
  background: #fff;
}

.user-address-menu .menu-box {
  margin: 0 30px 20px 30px;
}

.user-address-menu h3 {
  font-size: 14px;
  font-weight: bold;
  line-height: 52px;
  color: #333;
  margin: 0;
  padding: 0;
}

.user-address-menu ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.user-address-menu li {
  padding: 0 0 15px 0;
  font-size: 13px;
}

.user-address-menu li a {
  color: #757575;
}

.user-address-menu .active a, .user-address-menu .active a:hover {
  color: #ff6700;
}

.span16 {
  width: 978px;
}

</style>
