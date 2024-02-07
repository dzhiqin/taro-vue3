<template>
  <view class="flex align-center margin-tb-xs">
    <success color="#FB6869" />
    <view class="margin-left-sm option-text">{{ props.text }}</view>
  </view>
</template>
<script setup>
import { Success } from '@nutui/icons-vue-taro'
const props = defineProps({ text: String })
</script>
<style>
.option-text {
  color: #fb6869;
}
</style>
