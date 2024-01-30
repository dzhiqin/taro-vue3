<template>
  <view class="my-nav" @click="navBack">
    <view class="my-nav-left">
      <rect-left color="white" size="20" />
    </view>
    <view class="my-nav-title">{{ prop.title }}</view>
  </view>
  <!-- <view class="my-nav-box"></view> -->
</template>
<script setup>
import Taro from '@tarojs/taro'
import { RectLeft } from '@nutui/icons-vue-taro'
const prop = defineProps({
  title: String
})
const navBack = () => {
  Taro.navigateBack()
}
</script>
<style>
.my-nav {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  padding-top: 55px;
  width: 100%;
  /* position: fixed; */
}
.my-nav-title {
  color: white;
}
.my-nav-left {
  padding: 10px;
  position: absolute;
  left: 10px;
}
.my-nav-box {
  height: 80px;
}
</style>
