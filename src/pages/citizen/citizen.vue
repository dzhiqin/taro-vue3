<template>
  <view class="citizen">
    <!-- <my-logo class="margin" /> -->
    <view class="citizen-banner">
      <view class="flex align-center">
        <my-tag><view class="text-slim">信用贷</view></my-tag>
        <view class="citizen-title font-fzsk">新市民贷款</view>
      </view>
      <view class="citizen-banner-title font-fzsk"> 最高可借额度 </view>
      <view class="flex justify-between">
        <view class="text-xxl margin-top margin-left-lg text-white text-bold font-fzsk"
          >300000元</view
        >
        <view class="flex-column align-center citizen-banner-abs">
          <view class="citizen-banner-btn" @click="navToPage">测算额度</view>
          <view class="text-slim text-white text-sm">(以实际审批为准)</view>
        </view>
      </view>
      <view class="text-slim text-white margin-left-lg margin-top">年贷款利率(单利)5.58%起</view>
      <view class="citizen-banner-tags margin-left margin-top">
        <my-tag color="red"><view class="text-white text-slim">授信期限3年</view></my-tag>
        <my-tag color="red"><view class="text-white text-slim">循环额度</view></my-tag>
        <my-tag color="red"><view class="text-white text-slim">快速审批</view></my-tag>
      </view>
    </view>
    <view class="citizen-apply">
      <my-title><view class="text-bold">申请条件</view></my-title>
      <apply-option class="margin-top-sm">个人信用记录良好</apply-option>
      <apply-option>申请过石狮市新市民积分</apply-option>
      <apply-option>申请年龄23-55周岁</apply-option>
      <apply-option>现居住或工作在石狮，并且超过12个月</apply-option>
    </view>
    <view class="citizen-product">
      <my-title><view class="text-bold">产品</view></my-title>
      <view class="radius padding bg-white margin-top">
        <view class="flex align-center">
          <my-tag><view class="text-slim">信用贷</view></my-tag>
          <view class="text-lg text-bold margin-left">普惠信用贷</view>
        </view>
        <view class="flex justify-between margin-top-sm">
          <view>
            <view class="text-black">最高可借额度<text class="text-red">10万</text>元</view>
            <view class="text-gray text-sm margin-top-sm"
              >日费率低至<text class="text-red">0.02%</text></view
            >
          </view>
          <view class="primary-button-sm" @click="navToProduct('普惠信用贷')">点击办理</view>
        </view>
        <view class="flex align-center margin-top-sm">
          <my-tag color="red"><view class="text-white text-sm">授信期限3年</view></my-tag>
          <my-tag color="red"><view class="text-white text-sm">循环额度</view></my-tag>
          <my-tag color="red"><view class="text-white text-sm">快速审批</view></my-tag>
        </view>
      </view>

      <view class="radius padding bg-white margin-top">
        <view class="flex align-center">
          <my-tag><view class="text-slim">信用贷</view></my-tag>
          <view class="text-lg text-bold margin-left">普惠金融卡</view>
        </view>
        <view class="flex justify-between margin-top-sm">
          <view>
            <view class="text-black">最高可借额度<text class="text-red">30万</text>元</view>
            <view class="text-gray text-sm margin-top-sm"
              >日费率低至<text class="text-red">0.02%</text></view
            >
          </view>
          <view class="primary-button-sm" @click="navToProduct('普惠金融卡')">点击办理</view>
        </view>
        <view class="flex align-center margin-top-sm">
          <my-tag color="red"><view class="text-white text-sm">授信期限3年</view></my-tag>
          <my-tag color="red"><view class="text-white text-sm">循环额度</view></my-tag>
          <my-tag color="red"><view class="text-white text-sm">快速审批</view></my-tag>
        </view>
      </view>

      <view class="radius padding bg-white margin-top">
        <view class="flex align-center">
          <my-tag><view class="text-slim">信用贷</view></my-tag>
          <view class="text-lg text-bold margin-left">业主全额贷</view>
        </view>
        <view class="flex justify-between margin-top-sm">
          <view>
            <view class="text-black">最高可达房屋评估<text class="text-red">100%</text></view>
            <view class="text-gray text-sm margin-top-sm"
              >日费率低至<text class="text-red">0.02%</text></view
            >
          </view>
          <view class="primary-button-sm" @click="navToProduct('房产抵押贷')">点击办理</view>
        </view>
        <view class="flex align-center margin-top-sm">
          <my-tag color="red"><view class="text-white text-sm">授信期限3年</view></my-tag>
          <my-tag color="red"><view class="text-white text-sm">循环额度</view></my-tag>
          <my-tag color="red"><view class="text-white text-sm">快速审批</view></my-tag>
        </view>
      </view>
    </view>
    <view class="padding-tb">
      <img :src="requireImage('logo-ssrcb2.png')" class="logo-bottom margin-auto flex" />
    </view>
  </view>
</template>
<script setup>
import MyTag from '@/components/my-tag'
import ApplyOption from './components/apply-option.vue'
import { requireImage, taroNavigateToPage } from '@/tools/tools'
import Taro from '@tarojs/taro'
const navToPage = () => {
  Taro.navigateTo({ url: '/pages/loan-limit/loan-limit' })
}
const navToProduct = prodName => {
  taroNavigateToPage(`/pages/loan-apply/loan-apply?prodName=${prodName}`)
}
</script>
<style lang="scss">
.citizen {
  width: 100vw;
  min-height: 100vh;
  // background: linear-gradient(180deg, rgba(242, 36, 36, 100) 0%, rgba(255, 234, 212, 1) 76.29%);
  background-image: url('https://ssrcb.fjnx.com.cn/jcgprodes/proxy/sys/common/staticPreview/weapp/temp3470112258193129430bg-citizen_1706085068983.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
  padding: 16px;
  &-apply {
    background: linear-gradient(180deg, rgba(255, 248, 247, 1) 0%, rgba(245, 221, 209, 1) 100%);
    width: 346px;
    padding: 10px;
    box-sizing: border-box;
    margin-top: 8px;
    border-radius: 8px;
  }
  &-product {
    background: linear-gradient(180deg, rgba(255, 248, 247, 1) 0%, rgba(245, 221, 209, 1) 100%);
    width: 346px;
    padding: 10px;
    box-sizing: border-box;
    margin-top: 16px;
    border-radius: 8px;
  }
  &-banner {
    background-image: url(../../assets/img/bg-file-gold.png);
    background-repeat: no-repeat;
    background-size: contain;
    width: 346px;
    height: 220px;
    position: relative;
    &-title {
      font-size: 24px;
      margin-left: 20px;
      margin-top: 20px;
      color: white;
    }
    &-btn {
      background-color: #f22424;
      color: white;
      border-radius: 4px;
      padding: 10px 20px;
    }
    &-abs {
      position: absolute;
      right: 16px;
    }
  }
  &-title {
    font-size: 20px;
    font-weight: 700;
    margin-left: 20px;
    color: white;
  }
}
</style>
