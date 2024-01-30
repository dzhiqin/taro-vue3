<template>
  <view class="login">
    <img :src="requireImage('logo-ssrcb2.png')" class="login-logo" />
    <nut-avatar size="large" class="login-avatar">
      <!-- <img :src="url" /> -->
    </nut-avatar>
    <view class="login-title">您好，尊敬的客户</view>
    <view class="login-text">为了您的账户安全，请您绑定手机号</view>
    <view class="primary-button">微信手机号一键登录</view>
  </view>
</template>
<script setup>
import { requireImage } from '@/tools/tools'
</script>
<style lang="scss">
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  &-logo {
    width: 220px;
    height: 50px;
    margin-top: 30%;
  }
  &-avatar {
    margin-top: 38px;
  }
  &-title {
    font-size: 16px;
    font-weight: 500;
    margin-top: 36px;
  }
  &-text {
    font-size: 16px;
    margin-top: 20px;
  }
  .primary-button {
    margin-top: 30px;
  }
}
</style>
