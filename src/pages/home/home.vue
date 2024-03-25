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
      <view class="panel bg-white margin radius">
        <my-title class="padding-top padding-left"
          ><view class="text-bold">线上申贷</view></my-title
        >
        <nut-grid class="" :column-num="4" :border="false">
          <home-box-item
            imgName="icon-card@2x.png"
            title="信用卡申请"
            path="/pages/citizen/citizen"
          />
          <home-box-item imgName="loan.png" title="新市民贷" path="/pages/citizen/citizen" />
          <home-box-item
            imgName="icon-business-loan.png"
            title="创业担保贷"
            path="/pages/business/business"
          />
          <home-box-item
            imgName="icon-list.png"
            title="贷款需求采集"
            path="/pages/citizen/citizen"
          />
        </nut-grid>
      </view>
      <view class="panel bg-white radius margin">
        <my-title class="padding-top padding-left">
          <view class="text-bold">业务办理</view>
        </my-title>
        <nut-grid class="" :column-num="4" :border="false">
          <home-box-item
            imgName="huikuan.png"
            title="还款预约"
            path="/pages/prepayment/prepayment"
          />

          <home-box-item
            imgName="icon-fill-info@2x.png"
            title="信息完善"
            path="/packs/identity-info/identity-info"
          />
        </nut-grid>
      </view>
      <view class="panel bg-white radius margin">
        <my-title class="padding-top padding-left">
          <view class="text-bold">产品推荐</view>
        </my-title>
        <view class="flex padding-tb">
          <!-- <view class="flex-1 bg-blue">123</view> -->
          <view class="prod-item flex align-center bg-yellow">
            <img :src="requireImage('icon-loan2.png')" class="prod-item-img" />
            <view class="text-normal margin-left">贷款</view>
          </view>
          <view class="prod-item flex align-center bg-red">
            <img :src="requireImage('icon-money2.png')" class="prod-item-img" />
            <view class="text-normal margin-left">存款</view>
          </view>
        </view>
      </view>
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

      <!-- <view class="home-panel bg-white">
        <view class="home-panel-head flex align-center bg-blue">
          <img :src="requireImage('chart.png')" class="home-panel-image" />
          <view>
            <view>主打产品</view>
            <view class="text-gray">Main products</view>
          </view>
        </view>
        <view class="flex margin-top">
          <view class="home-panel-item">
            <img :src="requireImage('icon-loan2.png')" class="" style="width: 42px; height: 42px" />
            <view class="text-normal margin-left">贷款</view>
          </view>
          <view class="home-panel-item margin-left">
            <img
              :src="requireImage('icon-money2.png')"
              class=""
              style="width: 42px; height: 42px"
            />
            <view class="text-normal margin-left">存款</view>
          </view>
        </view>
      </view> -->
      <view v-show="false" class="home-panel" style="background: rgba(144, 200, 252, 0.15)">
        <view class="home-panel-head flex align-center">
          <img :src="requireImage('chart.png')" class="home-panel-image" />
          <view>
            <view>金融服务</view>
            <view class="text-gray">Main products</view>
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
      <view class="panel bg-white radius margin">
        <my-title class="padding-top padding-left">
          <view class="text-bold">网点导航</view>
        </my-title>
        <view class="padding">
          <view class="home-manager-content padding flex align-center margin-top-xs">
            <nut-avatar size="large">
              <img :src="userInfo.avatarUrl" class="round" />
            </nut-avatar>
            <view class="margin-left">
              <view class="text-size-lg text-bold">{{ userInfo.managerName }}</view>
              <view class="text-slim">{{ userInfo.managerDept }} - 金融专员</view>
              <view class="text-slim text-sm">{{ userInfo.branchAddress }}</view>
            </view>
          </view>
          <view class="flex home-manager-footer bg-yellow">
            <view
              class="flex-1 flex justify-center align-center"
              @click="navToPage('/pages/branch-list/branch-list')"
            >
              <Location2 color="#0081ff" />
              <div class="text-blue">附近网点</div>
            </view>
            <!-- <view>
            <nut-divider direction="vertical" />
          </view>
          <view class="flex-1 flex justify-center align-center">
            <div>网点</div>
          </view> -->
          </view>
        </view>
      </view>
    </view>

    <!-- <view @click="handleClick">click me</view> -->

    <div class="home-footer">
      <img :src="requireImage('logo-ssrcb2.png')" class="home-footer-logo" />
    </div>

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
import { Location2 } from '@nutui/icons-vue-taro'
const auth = useStore('auth')
const openId = computed(() => auth.userInfo.openId)
const userInfo = computed(() => auth.userInfo)
console.log('openId', openId)
// const app = useStore('app')
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
// const handleClick = () => {
//   app.setPageUrl(
//     // 'https://wx106.bestsign.info/fe/intf/v2/#/signPage?developerId=1585626842014078682&rtick=1711071243430874&signType=token&sign=eyJkZXZlbG9wZXJJZCI6IjE1ODU2MjY4NDIwMTQwNzg2ODIiLCJjYXRhbG9nSWQiOiIzNzk1NzM1NzcxNTcyNTcwMTIwIiwiY29udHJhY3RJZCI6IiIsImV4cGlyZUF0IjoiMTcxMTY3NjA0MyIsImFjY291bnQiOiIzNTA2MjgxOTk4MTIyNzM1MTUifS4xNzExMDcxMjQzNDMwOTI1OQ__.6c856fe81f8d4ad70c5aee6c9354eee4&catalogId=3795735771572570120&signerAccount=350628199812273515&dpi=96&sid='
//     'https://wx106.bestsign.info/fe/intf/v2/#/signPage?developerId=1585626842014078682&rtick=1711094574866732&signType=token&sign=eyJkZXZlbG9wZXJJZCI6IjE1ODU2MjY4NDIwMTQwNzg2ODIiLCJjYXRhbG9nSWQiOiI4MDA3MTMyNzQ5OTE2MzQ0MzczIiwiY29udHJhY3RJZCI6IiIsImV4cGlyZUF0IjoiMTcxMTY5OTM3NCIsImFjY291bnQiOiIzNTA1ODExOTg2MTExMTA1MzUifS4xNzExMDk0NTc0ODY2OTA0Mg__.36ecaa60377bc7f070897082b98f89aa&catalogId=8007132749916344373&signerAccount=350581198611110535&dpi=96&sid=&asyn=0&showDefault=0'
//   )
//   Taro.navigateTo({ url: '/pages/webview/webview' })
// }
</script>
<style lang="scss">
@import './home.scss';

.home {
  .nut-grid-item__content {
    // border-radius: 10px;
    padding-left: 0;
    padding-right: 0;
  }
  .nut-swiper {
    border-radius: 10px;
  }
}
</style>
