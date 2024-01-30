<template>
  <nut-grid-item class="my-grid-item" @click="handleClick">
    <img :src="requireImage(props.imgName)" class="home-grid-img" />
    <view class="my-grid-title">{{ props.title }}</view>
  </nut-grid-item>
</template>

<script setup>
import { requireImage } from '@/tools/tools'

let props = defineProps({
  imgName: String,
  title: String,
  path: String
})
const handleClick = () => {
  console.log(props.path)
}
</script>

<style lang="scss">
.my-grid-item {
  .nut-grid-item__content {
    background: transparent;
    padding-left: 0;
    padding-right: 0;
  }
}

.my-grid-title {
  font-size: 13px;
  margin-top: 4px;
}
</style>
