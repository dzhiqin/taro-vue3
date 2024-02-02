<template>
  <view class="flex justify-between">
    <slot></slot>
    <arrow-right color="#CCCCCC" />
  </view>
</template>
<script setup>
import { ArrowRight } from '@nutui/icons-vue-taro'
</script>
