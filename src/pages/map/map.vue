<template>
  <map
    id="map"
    style="width: 100vw; height: 100vh"
    :longitude="longitude"
    :latitude="latitude"
    :markers="markers"
    scale="14"
    :show-location="true"
  />
  <view class="map-content">
    <view class="text-bold">石狮农商银行服装城支行</view>
    <img
      src="../../assets/img/icon-navigate.png"
      class="map-content-icon"
      @click="handleNavigate"
    />
  </view>
</template>
<script setup>
import Taro from '@tarojs/taro'
import { ref } from 'vue'
const longitude = ref(118.616623)
const latitude = ref(24.73376)
const markers = ref([
  {
    id: 0,
    latitude: 24.73376,
    longitude: 118.616623,
    width: 30,
    height: 40
  }
])
const handleNavigate = () => {
  Taro.openLocation({
    latitude: latitude.value,
    longitude: longitude.value,
    scale: 18
  })
}
</script>
<style lang="scss">
.map-content {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
  background-color: white;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
.map-content-icon {
  width: 50px;
  height: 50px;
}
</style>
