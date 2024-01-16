<template>
  <nut-grid-item class="my-grid-item" @click="handleClick">
    <img :src="requireImage(props.imgSrc)" class="home-grid-img" />
    <view class="my-grid-title">{{ props.title }}</view>
  </nut-grid-item>
</template>

<script setup>
import { requireImage } from '@/tools/tools'

let props = defineProps({
  imgSrc: String,
  title: String
})
const handleClick = () => {
  console.log(props.title)
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
