<template>
  <view class="flex align-center">
    <view class="my-input-name">{{ props.name }}</view>
    <slot></slot>
  </view>
</template>
<script setup>
const props = defineProps({
  name: String
})
</script>
<style>
.my-input-name {
  min-width: 80px;
  word-break: keep-all;
}
</style>
