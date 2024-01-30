<template>
  <view
    class="bg-white radius margin padding flex align-center justify-between"
    @click="navToPage()"
  >
    <view class="flex align-center">
      <img :src="userInfo.avatarUrl" class="avatar" />
      <view class="margin-left">{{ userInfo.nickName || '微信用户' }}</view>
    </view>

    <ArrowRight />
  </view>
</template>
<script setup>
import { ArrowRight } from '@nutui/icons-vue-taro'
import Taro from '@tarojs/taro'
import { taroNavigateToPage } from '@/tools/tools'
import { ref } from 'vue'
const userInfo = ref(Taro.getStorageSync('USER_INFO'))
const navToPage = () => {
  taroNavigateToPage('/pages/user-info/user-info')
}
</script>
<style lang="scss">
.profile-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
</style>
