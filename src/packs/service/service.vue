<template>
  <view class="service">
    <my-navigator title="石狮农商客服热线" />
    <view style="height: 70px"></view>
    <view class="service-content">
      <img
        :src="formatImgUrl('weapp/temp2305301609940163687img-tel-service_1706748352306.png')"
        class="service-content-img"
      />
      <view class="service-content-title margin-top-lg">客服热线: 96336,</view>
      <view class="service-content-title margin-top">0595-36696336</view>
      <!-- <view class="service-content-text">客户经理会在近日联系您</view> -->
    </view>
  </view>
</template>
<script setup>
import { MyNavigator } from '@/components/index'
import { formatImgUrl } from '@/tools/tools'
</script>
<style lang="scss">
.service {
  background: #f5f5f5;
  background-image: url('../../assets/img/background.png');
  background-repeat: no-repeat;
  background-size: 100%;
  height: 100vh;
  &-content {
    width: 346px;
    margin: auto;
    background: white;
    border-radius: 16px;
    height: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &-img {
      width: 154px;
      height: 117px;
    }
    &-title {
      font-size: 20px;
      font-weight: 700;
      // margin-top: 32px;
      // margin-bottom: 24px;
    }
    &-text {
      font-size: 14px;
      margin-bottom: 5px;
    }
  }
}
</style>
