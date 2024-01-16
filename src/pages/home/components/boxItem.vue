<template>
  <nut-grid-item @click="handleClick">
    <img :src="requireImage(props.imgName)" class="home-grid-img" />
    <view>{{ props.title }}</view>
  </nut-grid-item>
</template>
<script setup>
import { requireImage } from '@/tools/tools'

let props = defineProps({
  imgName: String,
  title: String
})
const handleClick = () => {
  console.log(props.title)
}
</script>
