<template>
  <view class="success">
    <my-navigator title="提交成功" />
    <view style="height: 70px"></view>
    <view class="success-content">
      <img
        :src="formatImgUrl('weapp/temp601656707492274038img-submit-success_1706572947781.png')"
        class="success-content-img"
      />
      <view class="success-content-title">{{ title ? title : '提交成功' }}</view>
      <view class="success-content-text">客户经理会在近日联系您</view>
      <view class="success-content-text">客服热线: 96336,0595-36696336</view>
    </view>
  </view>
</template>
<script setup>
import { MyNavigator } from '@/components/index'
import { formatImgUrl, taroGetParams } from '@/tools/tools'
const { title } = taroGetParams()
</script>
<style lang="scss">
.success {
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
      width: 240px;
      height: 190px;
    }
    &-title {
      font-size: 20px;
      font-weight: 700;
      margin-top: 32px;
      margin-bottom: 24px;
    }
    &-text {
      font-size: 14px;
      margin-bottom: 5px;
      width: 300px;
      text-align: center;
    }
  }
}
</style>
