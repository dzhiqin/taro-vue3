<template>
  <view class="fina">
    <my-navigator title="普惠金融卡" />
    <!-- <my-logo class="margin" /> -->
    <view class="fina-head">
      <view class="fina-head-box">
        <view class="fina-head-title">30万</view>
        <view class="fina-head-text">最高可借</view>
      </view>
      <view class="fina-head-box">
        <view class="fina-head-title">0.02</view>
        <view class="fina-head-text">日费率低至</view>
      </view>
      <view class="fina-head-box">
        <view class="fina-head-title">3年</view>
        <view class="fina-head-text">授信期限</view>
      </view>
    </view>
    <view class="fina-card flex">
      <view class="fina-card-content padding flex-column justify-between">
        <img :src="requireImage('logo-ssrcb4.png')" class="fina-card-logo" />
        <view class="text-white">普惠金融卡</view>
        <view class="text-white">09/25</view>
      </view>
      <img class="fina-card-content" :src="requireImage('bg-card-net.png')" />
    </view>

    <view class="fina-content margin">
      <my-title class="margin-bottom"><view class="text-bold">申请条件</view></my-title>
      <option-item text="个人信用记录良好" />
      <option-item text="申请过石狮市新市民积分" />
      <option-item text="申请人年龄23-55周岁" />
      <option-item text="现居住或工作在石狮市，并且超过12个月" />
      <view class="margin-lg">
        <nut-button type="primary" block @click="navToApply">立即填写材料</nut-button>
        <view class="margin-top">
          <nut-button type="info" block @click="navToRecord">填写记录</nut-button>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup>
import { requireImage, taroNavigateToPage } from '@/tools/tools'
import OptionItem from './components/option-item.vue'
const navToApply = () => {
  taroNavigateToPage('/packs/inclusive-card/inclusive-card')
}
const navToRecord = () => {
  taroNavigateToPage('/packs/inclusive-apply-record/inclusive-apply-record')
}
</script>
<style lang="scss">
.fina {
  background-image: url('https://ssrcb.fjnx.com.cn/jcgprodes/proxy/sys/common/staticPreview/weapp/temp487061977485329361bg-wave-red_1707037256989.png');
  background-repeat: no-repeat;
  background-size: 100%;
  height: 100vh;
  overflow: auto;
  .nut-grid-item__content {
    background-color: transparent;
  }
  &-head {
    width: 300px;
    margin: auto;
    display: flex;
    margin-top: 20px;
    margin-bottom: 20px;
    justify-content: space-between;
    &-box {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    &-title {
      font-size: 24px;
      font-weight: bold;
      color: white;
    }
    &-text {
      color: white;
    }
  }
  &-card {
    width: 330px;
    height: 205px;
    margin: auto;
    border-radius: 10px;
    background-image: linear-gradient(90deg, rgba(0, 77, 64, 1) 0%, rgba(22, 161, 138, 1) 100%);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    &-logo {
      width: 40px;
      height: 40px;
    }
    &-content {
      width: 165px;
    }
  }
  &-content {
    padding: 16px;
    border-radius: 20px;
    background: linear-gradient(180deg, rgba(255, 248, 247, 1) 0%, rgba(245, 221, 209, 1) 100%);
  }
}
</style>
