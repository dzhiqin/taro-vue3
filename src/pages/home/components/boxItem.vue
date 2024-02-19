<template>
  <nut-grid-item @click="handleClick">
    <img :src="requireImage(props.imgName)" class="home-grid-img" />
    <view>{{ props.title }}</view>
  </nut-grid-item>
</template>
<script setup>
import { requireImage, taroToast } from '@/tools/tools'
import Taro from '@tarojs/taro'
let props = defineProps({
  imgName: String,
  title: String,
  path: String
})
const handleClick = () => {
  if (props.path) {
    Taro.navigateTo({ url: props.path })
  } else {
    taroToast('功能完善中')
  }
}
</script>
<style lang="scss">
.home-grid {
  margin-top: 20px;
  &-img {
    width: 42px;
    height: 42px;
  }
  &-name {
    font-size: 12px;
    margin-top: 4px;
  }
}
</style>
