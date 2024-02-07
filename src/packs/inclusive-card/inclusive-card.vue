<template>
  <view class="incl">
    <my-navigator title="普惠金融卡" />
    <my-logo class="margin" />
    <view class="incl-content">
      <my-title class="padding-top padding-left"><view class="text-bold">申请步骤</view></my-title>
      <nut-steps :current="currentStep" class="margin-top">
        <nut-step v-for="item in steps" :key="item.step" :title="item.title">
          <template v-if="item.step < currentStep" #icon><Checklist /></template>
          <template v-else #icon>{{ item.step }}</template>
        </nut-step>
      </nut-steps>
      <nut-swiper
        ref="mySwiper"
        :init-page="currentPage"
        :pagination-visible="true"
        pagination-color="#426543"
        pagination-unselected-color="#808080"
        :loop="false"
        @change="onSwiperChange"
        :class="custHeight"
      >
        <nut-swiper-item>
          <loan-person :current="0" @change="onPageChange"></loan-person>
        </nut-swiper-item>
        <nut-swiper-item>
          <loan-info :current="1" @change="onPageChange"></loan-info>
        </nut-swiper-item>
        <nut-swiper-item>
          <tax-statement :current="2" @change="onPageChange" />
        </nut-swiper-item>
        <nut-swiper-item>
          <conversation-record :current="3" @change="onPageChange" />
        </nut-swiper-item>
      </nut-swiper>
    </view>
  </view>
</template>
<script setup>
import { Checklist } from '@nutui/icons-vue-taro'
import { ref, computed } from 'vue'
import LoanPerson from './components/loan-person'
import LoanInfo from './components/loan-info'
import TaxStatement from './components/tax-statement'
import ConversationRecord from './components/conversation-record'
import Taro from '@tarojs/taro'
const mySwiper = ref(null)
const currentPage = ref(1)
const steps = ref([
  { title: '填写借款人信息', step: 1 },
  { title: '填写借款申请', step: 2 },
  { title: '填写借款税收声明', step: 3 },
  { title: '填写借款谈话记录', step: 4 }
])
const currentStep = computed(() => currentPage.value + 1)
const onSwiperChange = e => {
  currentPage.value = e
}
const onPageChange = e => {
  currentPage.value = e.page
  Taro.pageScrollTo({ scrollTop: 0 })
}
const custHeight = computed(() => {
  return {
    height1: currentPage.value === 0,
    height2: currentPage.value === 1,
    height3: currentPage.value === 2,
    height4: currentPage.value === 3
  }
})
</script>
<style lang="scss">
.incl {
  background-image: url('https://ssrcb.fjnx.com.cn/jcgprodes/proxy/sys/common/staticPreview/weapp/temp487061977485329361bg-wave-red_1707037256989.png');
  background-repeat: no-repeat;
  background-size: 100%;
  min-height: 100vh;
  overflow: auto;
  .height1 {
    height: 1370px;
  }
  .height2 {
    height: 900px;
  }
  .height3 {
    height: 500px;
  }
  .height4 {
    height: 800px;
  }
  // &-swiper {
  //   height: 1300px;
  // }
  &-content {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    background-color: #ffffff;
    // padding: 16px;
  }
  .nut-cell-group__wrap {
    box-shadow: none;
  }
  .nut-checkbox {
    margin-right: 0;
  }
}
</style>
