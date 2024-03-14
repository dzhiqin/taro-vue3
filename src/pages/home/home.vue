<template>
  <view class="home">
    <view class="home-head">
      <my-logo style="margin-top: 55px" />
    </view>
    <view class="home-content">
      <view class="home-swiper">
        <nut-swiper
          :pagination-visible="true"
          pagination-color="#426543"
          pagination-unselected-color="#808080"
          auto-play="4000"
        >
          <nut-swiper-item>
            <img
              @click="navToPage('/pages/business/business')"
              class="home-swiper-img"
              src="https://ssrcb.fjnx.com.cn/jcgprodes/proxy/sys/common/staticPreview/weapp/temp3874149963416703706banner-business-loan_1706079263293.png"
            />
          </nut-swiper-item>
          <nut-swiper-item>
            <img
              class="home-swiper-img"
              src="https://ssrcb.fjnx.com.cn/jcgprodes/proxy/sys/common/staticPreview/weapp/temp567811036168465928banner-new-citizen-loan_1706079324586.png"
            />
          </nut-swiper-item>
        </nut-swiper>
      </view>
      <nut-grid class="home-grid" :column-num="3" :border="false" gutter="20">
        <home-box-item
          imgName="icon-business-loan.png"
          title="创业担保贷"
          path="/pages/business/business"
        />
        <home-box-item imgName="huikuan.png" title="提前还款" path="/pages/prepayment/prepayment" />

        <home-box-item
          imgName="icon-fill-info@2x.png"
          title="信息完善"
          path="/packs/identity-info/identity-info"
        />
        <home-box-item imgName="loan.png" title="新市民贷" />
        <home-box-item imgName="icon-card@2x.png" title="普惠卡申领" />
        <home-box-item imgName="usercard.png" title="社保卡" />
        <!-- <home-box-item imgName="shop.png" title="商户" /> -->
        <!-- <home-box-item imgName="etccar.png" title="ETC" /> -->
        <!-- <home-box-item imgName="zhengxin.png" title="征信查询" /> -->
        <!-- <home-box-item imgName="bankcard.png" title="贷记卡申领" /> -->
        <!-- <home-box-item imgName="invoice.png" title="发票打印" /> -->
        <!-- <home-box-item imgName="estimate.png" title="风险评估" /> -->
      </nut-grid>

      <view v-show="false" class="home-panel" style="background: rgba(243, 84, 33, 0.15)">
        <view class="home-panel-head flex align-center">
          <img :src="requireImage('card.png')" class="home-panel-image" />
          <view>
            <view>用卡服务</view>
            <view class="text-gray">All service of your card</view>
          </view>
        </view>
        <nut-grid :border="false" class="margin-top">
          <home-grid-item imgName="Group-user2.png" title="金融服务"></home-grid-item>
          <home-grid-item imgName="Group-list.png" title="交易明细"></home-grid-item>
          <home-grid-item imgName="Group-card-add.png" title="贷记卡申领"></home-grid-item>
          <home-grid-item imgName="Group-message2.png" title="金额设置"></home-grid-item>
          <home-grid-item imgName="Group-card-min.png" title="信用卡"></home-grid-item>
          <home-grid-item imgName="Group-card-add.png" title="信用卡申请"></home-grid-item>
          <home-grid-item imgName="Group-shop.png" title="信用卡生活"></home-grid-item>
          <home-grid-item imgName="Group-card-user.png" title="社保卡"></home-grid-item>
        </nut-grid>
      </view>

      <view v-show="false" class="home-panel" style="background: rgba(144, 200, 252, 0.15)">
        <view class="home-panel-head flex align-center">
          <img :src="requireImage('chart.png')" class="home-panel-image" />
          <view>
            <view>金融服务</view>
            <view class="text-gray">Money transition</view>
          </view>
        </view>
        <nut-grid :border="false" class="margin-top">
          <home-grid-item imgName="Group-exchange.png" title="行内转账"></home-grid-item>
          <home-grid-item imgName="Group-card-flash.png" title="快捷转账"></home-grid-item>
          <home-grid-item imgName="Group-bank.png" title="跨行转账"></home-grid-item>
          <home-grid-item imgName="Group-heart.png" title="爱心捐赠"></home-grid-item>
          <home-grid-item imgName="Group-loan2.png" title="个人贷款"></home-grid-item>
          <home-grid-item imgName="Group-loan.png" title="企业贷款"></home-grid-item>
        </nut-grid>
      </view>

      <view v-show="false" class="home-panel" style="background: rgba(149, 198, 117, 0.15)">
        <view class="home-panel-head flex align-center">
          <img :src="requireImage('camera.png')" class="home-panel-image" />
          <view>
            <view>生活服务</view>
            <view class="text-gray">Daily services</view>
          </view>
        </view>
        <nut-grid :border="false" class="margin-top">
          <home-grid-item imgName="Group-phone.png" title="手机充值"></home-grid-item>
          <home-grid-item imgName="Group-flash.png" title="电费账单"></home-grid-item>
          <home-grid-item imgName="Group-water-bill.png" title="水费账单"></home-grid-item>
          <home-grid-item imgName="Group-car.png" title="高速ETC"></home-grid-item>
          <home-grid-item imgName="Group-invoice.png" title="增值税开票"></home-grid-item>
          <home-grid-item imgName="Group-user.png" title="征信查询"></home-grid-item>
          <home-grid-item imgName="Group-message.png" title="投诉建议"></home-grid-item>
          <home-grid-item imgName="Group-location.png" title="网点导航"></home-grid-item>
        </nut-grid>
      </view>

      <!-- <view class="home-manager margin">
        <my-title><view class="text-bold">专属服务</view></my-title>
        <view class="home-manager-content padding flex align-center margin-top-xs radius-sm">
          <nut-avatar size="large"></nut-avatar>
          <view class="margin-left">
            <view class="text-size-lg text-bold">陈先生</view>
            <view class="text-slim">港塘支行 - 金融专员</view>
            <view class="text-slim text-sm">泉州市石狮市北环路3363号</view>
          </view>
        </view>
      </view> -->
    </view>
    <view class="home-footer margin-top-xl">
      <img :src="requireImage('logo-ssrcb2.png')" class="home-footer-logo" />
    </view>
    <view class="margin"></view>
  </view>
</template>
<script setup>
import { requireImage } from '@/tools/tools'
import HomeGridItem from './components/gridItem'
import HomeBoxItem from './components/boxItem'
import Taro from '@tarojs/taro'
import { useStore } from '@/stores'
import { computed } from 'vue'
const auth = useStore('auth')
const openId = computed(() => auth.userInfo.openId)
console.log('openId', openId)
const navToPage = value => {
  Taro.navigateTo({ url: value })
}
Taro.getLocation({
  type: 'wgs84',
  success(res) {
    console.log('location', res)
  },
  complete(res) {
    console.log('location complete', res)
  }
})
</script>
<style lang="scss">
@import './home.scss';

.home {
  .nut-grid-item__content {
    border-radius: 10px;
  }
  .nut-swiper {
    border-radius: 10px;
  }
}
</style>
