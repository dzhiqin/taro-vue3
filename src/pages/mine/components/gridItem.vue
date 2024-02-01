<template>
  <nut-grid-item @click="handleClick">
    <img :src="requireImage(props.imgName)" class="my-grid-img" />
    <view class="my-grid-name">{{ props.title }}</view>
  </nut-grid-item>
</template>
<script setup>
import { requireImage, taroNavigateToPage } from '@/tools/tools'

let props = defineProps({
  imgName: String,
  title: String,
  path: String
})
const handleClick = () => {
  console.log(props.title)
  if (props.path) {
    taroNavigateToPage(props.path)
  }
}
</script>
<style lang="scss">
.my-grid {
  margin-top: 20px;
  &-img {
    width: 24px;
    height: 24px;
  }
  &-name {
    font-size: 12px;
    margin-top: 8px;
  }
}
</style>
