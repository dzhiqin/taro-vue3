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
      <loan-person v-if="currentPage === 0" :current="0" @change="onPageChange"></loan-person>
      <loan-info v-if="currentPage === 1" :current="1" @change="onPageChange"></loan-info>
      <tax-statement v-if="currentPage === 2" :current="2" @change="onPageChange" />
      <conversation-record
        v-if="currentPage === 3"
        :current="3"
        @change="onPageChange"
        @submit="onSubmit"
      />
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
// import { taroGetParams } from '@/tools/tools'
import { NoTaxCodeReasonOptions } from '@/tools/static'
// const { managerNum, managerName, id, type } = taroGetParams()
// const openId = ''
const currentPage = ref(0)
const steps = ref([
  { title: '填写借款人信息', step: 1 },
  { title: '填写借款申请', step: 2 },
  { title: '填写借款税收声明', step: 3 },
  { title: '填写借款谈话记录', step: 4 }
])
const currentStep = computed(() => currentPage.value + 1)

const onPageChange = e => {
  currentPage.value = e.page
  Taro.pageScrollTo({ scrollTop: 0 })
}
const onSubmit = () => {
  console.log('submit')
  buildParams()
}
const getTaxCode = taxState => {
  if (taxState.taxType === '1' || taxState.hasTaxCode === '0') {
    // 仅为中国税收居民 或 无法提供税收号的
    return ''
  }
  return taxState.taxCodes.map(i => i.value).join(',')
}
const getNoTaxCodeReason = taxState => {
  if (taxState.taxType === '1' || taxState.hasTaxCode === '1') {
    // 仅为中国税收居民 或 可以提供税收号的
    return ''
  }
  return NoTaxCodeReasonOptions.find(i => i.value === taxState.noTaxCodeReason)?.text
}
const getReasonDetail = taxState => {
  if (taxState.taxType === '1' || taxState.hasTaxCode === '1' || taxState.noTaxCodeReason === '1') {
    // 仅为中国税收居民 或 可以提供税收号的 或 已明确其地区不发放税收号的
    return ''
  }
  return taxState.reason
}
const buildParams = () => {
  const loanPerson = Taro.getStorageSync('loanPersonForm') || {}
  const loanInfo = Taro.getStorageSync('loanInfoForm') || {}
  const conversationRecord = Taro.getStorageSync('recordForm') || {}
  const taxState = Taro.getStorageSync('taxStateForm') || {}

  const params = {
    chineseName: loanPerson.name,
    nameSpelling: loanPerson.nameSpelling,
    idCardApply: loanPerson.idNum,
    sexApply: loanPerson.sex,
    validDate: loanPerson.validDate,
    birthday: loanPerson.birth,
    censusRegisterAddressDetail: loanPerson.address,
    phoneApply: loanPerson.phone,
    checkCode: loanPerson.sms,
    email: loanPerson.email,
    maritialStatus: loanPerson.maritialStatus,
    educationLevel: loanPerson.education,
    houseAddressDetail: loanPerson.residence.join('') + loanPerson.residenceDetail,
    institutionName: loanPerson.enterpriseName,
    officeOrg: loanPerson.department,
    officeDuty: loanPerson.job,
    officePost: loanPerson.title,
    officePhone: loanPerson.officePhone,
    officeAddress: loanPerson.officeAddress,
    applyBorrowMoney: loanInfo.loanLimit,
    applyTime: loanInfo.loanTerm,
    borrowUse: loanInfo.loanPurpose,
    borrowClassify: loanInfo.loanType,
    cardClassify: loanInfo.cardType,
    sendClassify: loanInfo.billShippingMethod,
    sendAddress: loanInfo.billShippingAddress,
    repaymentClassify: loanInfo.repaymentMethod,
    repaymentCard: loanInfo.repaymentMethod ? loanInfo.cardNo : '',
    guaranteeClassify: loanInfo.guaranteeMethod,
    linkName: loanInfo.contactName,
    linkPhone: loanInfo.contactPhone,
    linkRelation: loanInfo.relationship,
    linkCard: loanInfo.contactIdNum,
    talkOne: conversationRecord.state1,
    talkTwo: conversationRecord.state2,
    talkThree: conversationRecord.state3,
    talkFour: conversationRecord.state4,
    talkFive: conversationRecord.state5,
    taxClassify: taxState.taxType,
    birthplace: taxState.birthplace,
    taxCountryCode: getTaxCode(taxState),
    noSupportCodeReason: getNoTaxCodeReason(taxState),
    noReasonChooseDetail: getReasonDetail(taxState)
  }
  console.log('params=', params)
  return params
}
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
  &-content {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    background-color: #ffffff;
  }
  .nut-cell-group__wrap {
    box-shadow: none;
  }
  .nut-checkbox {
    margin-right: 0;
  }
}
</style>
