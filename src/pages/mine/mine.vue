<template>
  <view class="mine">
    <view class="mine-head">
      <img :src="requireImage('slogan@2x.png')" class="mine-head-slogan" />
      <img :src="requireImage('eight@2x.png')" class="mine-head-eight" />
    </view>
    <user-profile />
    <view class="bg-white radius margin padding-sm">
      <nut-grid :border="false">
        <!-- <MyGridItem imgName="icon-pie-chart.png" title="我的额度" /> -->
        <!-- <MyGridItem imgName="icon-record-list.png" title="申请记录" /> -->
        <MyGridItem imgName="icon-telephone.png" title="客服中心" path="/packs/service/service" />
        <MyGridItem
          imgName="icon-fill-in.png"
          title="信息完善"
          path="/pages/identity-info/identity-info"
        />
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
      height: 37px;
      width: 184px;
    }
  }
}
</style>
