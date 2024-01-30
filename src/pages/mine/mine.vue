<template>
  <view class="mine">
    <view class="mine-head">
      <img :src="requireImage('slogan@2x.png')" class="mine-head-slogan" />
      <img :src="requireImage('eight@2x.png')" class="mine-head-eight" />
    </view>
    <user-profile />
    <view class="bg-white radius margin padding-sm">
      <nut-grid :border="false">
        <MyGridItem imgName="card-icon@2x.png" title="我的额度" />
        <MyGridItem imgName="record-icon@2x.png" title="申请记录" />
        <MyGridItem imgName="service-icon@2x.png" title="客服中心" />
      </nut-grid>
    </view>
    <view class="mine-footer">
      <img :src="requireImage('logo-ssrcb2.png')" class="mine-footer-logo" />
    </view>
  </view>
</template>
<script setup>
import { requireImage } from '@/tools/tools'
import MyGridItem from './components/gridItem.vue'
import UserProfile from './components/user-profile.vue'
// import Taro from '@tarojs/taro'
</script>
<style lang="scss">
.mine {
  background: #f5f5f5;
  height: 100vh;
  &-head {
    background: #f5f5f5;
    background-image: url('../../assets/img/background.png');
    background-repeat: no-repeat;
    background-size: 100%;
    height: 260px;
    position: relative;
    overflow: hidden;
    &-slogan {
      width: 235px;
      height: 88px;
      margin-top: 74px;
      margin-left: 20px;
    }
    &-eight {
      width: 236px;
      height: 99px;
      margin-left: 139px;
    }
  }
  &-footer {
    position: absolute;
    left: calc(187px - 92px);
    bottom: 30px;
    &-logo {
      height: 42px;
      width: 184px;
    }
  }
}
</style>
