<script setup lang="ts">

import {onMounted, reactive, toRefs} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {useCartStore} from "@/store/cart";
import CommonTopBar from "@/views/common/CommonTopBar.vue";

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();

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
        <div class="menu-box">
          <h3 class="title">个人中心</h3>
          <ul class="list">
            <li><a href="//www.mi.com/shop/user/portal?r=1701067386">我的个人中心</a></li>
          </ul>
        </div>
        <div class="menu-box"><h3 class="title">售后服务</h3>
          <ul class="list">
            <li><a href="//www.mi.com/service/aftersale/list?r=1701067386">服务记录</a></li>
          </ul>
        </div>
        <div class="menu-box"><h3 class="title">账户管理</h3>
          <ul class="list">
            <li><a href="//account.xiaomi.com" target="_blank">个人信息</a></li>
            <li><a href="//account.xiaomi.com/pass/auth/security/home#service=setPassword" target="_blank">修改密码</a>
            </li>
            <li>
              <a id="J_cancleService" href="https://m.mi.com/userdelete?from=pc"
                 data-log_code="bpm=70.497.3944901.*&amp;cdm=&amp;uni=&amp;next=" target="_blank" data-settrack="true"
                 onclick="_msq.push(['trackEvent','bpm=70.497.3944901.*&amp;cdm=&amp;uni=&amp;next=','https://m.mi.com/userdelete?from=pc','&quot;&quot;']);">注销服务</a>
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
  padding: 36px 0;
  width: 234px;
}

.user-address-menu .menu-box {
  margin: 0 48px 12px;
}

.user-address-menu .menu-box {
  margin: 0 48px 12px;
}

.user-address-menu h3 {
  font-size: 16px;
  font-weight: 400;
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
  padding: 6px 0;
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
