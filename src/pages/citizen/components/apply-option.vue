<template>
  <view class="apply-option flex align-center padding-bottom-sm">
    <Success color="#fb6869" />
    <slot></slot>
  </view>
</template>
<script setup>
import { Success } from '@nutui/icons-vue-taro'
</script>
<style>
.apply-option {
  color: #fb6869;
  width: 100%;
  padding-left: 8px;
}
</style>
