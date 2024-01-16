<template>
  <view class="home">
    <view class="home-head">
      <img :src="requireImage('ssrcb-logo2.png')" class="home-head-logo" />
    </view>
    <view class="home-content">
      <view class="home-swiper">
        <nut-swiper
          :pagination-visible="true"
          pagination-color="#426543"
          pagination-unselected-color="#808080"
          auto-play="3000"
        >
          <nut-swiper-item>
            <view class="home-swiper-item">
              <view class="home-swiper-item-title">新市民积分贷</view>
              <view class="home-swiper-item-text">最高额度300000</view>
            </view>
          </nut-swiper-item>
          <nut-swiper-item>
            <view class="home-swiper-item">
              <view class="home-swiper-item-title">ETC申领</view>
              <view class="home-swiper-item-text">ETC在线申领</view>
            </view>
          </nut-swiper-item>
        </nut-swiper>
      </view>
      <nut-grid class="home-grid" :column-num="3" :border="false" gutter="20">
        <home-box-item imgName="usercard.png" title="社保卡" />
        <home-box-item imgName="etccar.png" title="ETC" />
        <home-box-item imgName="shop.png" title="商户" />
        <home-box-item imgName="zhengxin.png" title="征信查询" />
        <home-box-item imgName="loan.png" title="贷款申请" />
        <home-box-item imgName="bankcard.png" title="贷记卡申领" />
        <home-box-item imgName="invoice.png" title="发票打印" />
        <home-box-item imgName="estimate.png" title="风险评估" />
        <home-box-item imgName="huikuan.png" title="汇款" />
      </nut-grid>

      <view class="home-panel" style="background: rgba(243, 84, 33, 0.15)">
        <view class="home-panel-head flex align-center">
          <img :src="requireImage('card.png')" class="home-panel-image" />
          <view>
            <view>用卡服务</view>
            <view class="text-gray">All service of your card</view>
          </view>
        </view>
        <nut-grid :border="false" class="margin-top">
          <home-grid-item imgSrc="Group-user2.png" title="金融服务"></home-grid-item>
          <home-grid-item imgSrc="Group-list.png" title="交易明细"></home-grid-item>
          <home-grid-item imgSrc="Group-card-add.png" title="贷记卡申领"></home-grid-item>
          <home-grid-item imgSrc="Group-message2.png" title="金额设置"></home-grid-item>
          <home-grid-item imgSrc="Group-card-min.png" title="信用卡"></home-grid-item>
          <home-grid-item imgSrc="Group-card-add.png" title="信用卡申请"></home-grid-item>
          <home-grid-item imgSrc="Group-shop.png" title="信用卡生活"></home-grid-item>
          <home-grid-item imgSrc="Group-card-user.png" title="社保卡"></home-grid-item>
        </nut-grid>
      </view>

      <view class="home-panel" style="background: rgba(144, 200, 252, 0.15)">
        <view class="home-panel-head flex align-center">
          <img :src="requireImage('chart.png')" class="home-panel-image" />
          <view>
            <view>金融服务</view>
            <view class="text-gray">Money transition</view>
          </view>
        </view>
        <nut-grid :border="false" class="margin-top">
          <home-grid-item imgSrc="Group-exchange.png" title="行内转账"></home-grid-item>
          <home-grid-item imgSrc="Group-card-flash.png" title="快捷转账"></home-grid-item>
          <home-grid-item imgSrc="Group-bank.png" title="跨行转账"></home-grid-item>
          <home-grid-item imgSrc="Group-heart.png" title="爱心捐赠"></home-grid-item>
          <home-grid-item imgSrc="Group-loan2.png" title="个人贷款"></home-grid-item>
          <home-grid-item imgSrc="Group-loan.png" title="企业贷款"></home-grid-item>
        </nut-grid>
      </view>

      <view class="home-panel" style="background: rgba(149, 198, 117, 0.15)">
        <view class="home-panel-head flex align-center">
          <img :src="requireImage('camera.png')" class="home-panel-image" />
          <view>
            <view>生活服务</view>
            <view class="text-gray">Daily services</view>
          </view>
        </view>
        <nut-grid :border="false" class="margin-top">
          <home-grid-item imgSrc="Group-phone.png" title="手机充值"></home-grid-item>
          <home-grid-item imgSrc="Group-flash.png" title="电费账单"></home-grid-item>
          <home-grid-item imgSrc="Group-water-bill.png" title="水费账单"></home-grid-item>
          <home-grid-item imgSrc="Group-car.png" title="高速ETC"></home-grid-item>
          <home-grid-item imgSrc="Group-invoice.png" title="增值税开票"></home-grid-item>
          <home-grid-item imgSrc="Group-user.png" title="征信查询"></home-grid-item>
          <home-grid-item imgSrc="Group-message.png" title="投诉建议"></home-grid-item>
          <home-grid-item imgSrc="Group-location.png" title="网点导航"></home-grid-item>
        </nut-grid>
      </view>
    </view>
    <view class="home-footer">
      <img :src="requireImage('ssrcb-logo.png')" class="home-footer-logo" />
    </view>
    <view class="margin"></view>
  </view>
</template>
<script setup>
import { requireImage } from '@/tools/tools'
import HomeGridItem from './components/gridItem'
import HomeBoxItem from './components/boxItem'
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
