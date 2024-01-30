<template>
  <view>
    <slot></slot>
    <view class="title-bottom"></view>
  </view>
</template>
<script setup></script>
<style lang="scss">
.title-bottom {
  width: 75.89px;
  height: 2.21px;
  opacity: 1;
  background: linear-gradient(90deg, rgba(255, 72, 0, 1) 0%, rgba(255, 72, 0, 0) 100%);
}
</style>
