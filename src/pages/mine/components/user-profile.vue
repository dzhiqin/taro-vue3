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
import { taroNavigateToPage, getUserInfoStorageSync } from '@/tools/tools'
import { ref } from 'vue'
import { useDidShow } from '@tarojs/taro'
useDidShow(() => {
  userInfo.value = getUserInfoStorageSync()
})
const userInfo = ref('')
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
