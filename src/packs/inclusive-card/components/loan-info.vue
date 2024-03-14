<template>
  <view>
    <my-title class="margin"><view class="text-bold">借款信息填写</view></my-title>
    <nut-form ref="loanInfoForm" :model-value="loanInfo" :rules="formRules">
      <nut-form-item label="申请额度" prop="loanLimit" required>
        <nut-input
          class="nut-input-text"
          v-model="loanInfo.loanLimit"
          type="digit"
          :border="false"
          placeholder="请输入申请金额(最高30万元)"
          input-align="right"
        >
          <template #right>
            <text class="nutui-iconfont nut-icon">万</text>
          </template>
        </nut-input>
      </nut-form-item>
      <nut-form-item label="申请期限" prop="loanTerm">
        <nut-radio-group direction="horizontal" v-model="loanInfo.loanTerm">
          <nut-radio v-for="item in LoanTermOptions" :key="item.value" :label="item.value">
            {{ item.text }}
          </nut-radio>
        </nut-radio-group>
      </nut-form-item>
      <nut-form-item label="借款用途" prop="loanPurpose">
        <nut-radio-group direction="horizontal" v-model="loanInfo.loanPurpose">
          <nut-radio v-for="item in LoanPurposeOptions" :key="item.value" :label="item.value">
            {{ item.text }}
          </nut-radio>
        </nut-radio-group>
      </nut-form-item>
      <nut-form-item label="借款性质" prop="loanType">
        <nut-radio-group direction="horizontal" v-model="loanInfo.loanType">
          <nut-radio v-for="item in LoanTypeOptions" :key="item.value" :label="item.value">
            {{ item.text }}
          </nut-radio>
        </nut-radio-group>
      </nut-form-item>
      <nut-form-item label="卡片形式" prop="cardType">
        <nut-radio-group direction="horizontal" v-model="loanInfo.cardType">
          <nut-radio v-for="item in CardTypeOptions" :key="item.value" :label="item.value">
            {{ item.text }}
          </nut-radio>
        </nut-radio-group>
      </nut-form-item>
      <nut-form-item label="账单寄送方式" prop="billShippingMethod" :label-width="110">
        <nut-radio-group direction="horizontal" v-model="loanInfo.billShippingMethod">
          <nut-radio v-for="item in BillSendOptions" :key="item.value" :label="item.value">
            {{ item.text }}
          </nut-radio>
        </nut-radio-group>
      </nut-form-item>
      <nut-form-item label="账单寄送地址" prop="billShippingAddress" :label-width="110">
        <nut-input
          class="nut-input-text"
          v-model="loanInfo.billShippingAddress"
          type="text"
          :border="false"
          placeholder="请填写账单寄送地址"
        />
      </nut-form-item>

      <nut-form-item label="还款方式(选填)" prop="repaymentMethod" :label-width="110">
        <picker
          mode="selector"
          :range="FinanceRepayTypeOptions.map(i => i.text)"
          @change="onPickerChange"
          :value="loanInfo.repaymentMethod"
        >
          <my-select-cell>
            <view class="text-black">{{
              FinanceRepayTypeOptions.find(i => i.value === loanInfo.repaymentMethod)?.text ||
              '请选择'
            }}</view>
          </my-select-cell>
        </picker>
      </nut-form-item>
      <nut-form-item
        v-show="!!loanInfo.repaymentMethod"
        label="还款卡号"
        prop="cardNo"
        :label-width="110"
      >
        <nut-input
          class="nut-input-text"
          v-model="loanInfo.cardNo"
          type="number"
          :border="false"
          placeholder="请填写还款卡号"
        />
      </nut-form-item>
      <nut-form-item label="担保方式" prop="guaranteeMethod">
        <nut-radio-group direction="horizontal" v-model="loanInfo.guaranteeMethod">
          <nut-radio v-for="item in GuaranteeTypeOptions" :key="item.value" :label="item.value">
            {{ item.text }}
          </nut-radio>
        </nut-radio-group>
      </nut-form-item>
      <nut-form-item label="联系人姓名" prop="contactName" :label-width="110">
        <nut-input
          class="nut-input-text"
          v-model="loanInfo.contactName"
          type="text"
          :border="false"
          placeholder="请填写联系人姓名"
        />
      </nut-form-item>
      <nut-form-item label="联系人手机号" prop="contactPhone" :label-width="110">
        <nut-input
          class="nut-input-text"
          v-model="loanInfo.contactPhone"
          type="number"
          :border="false"
          placeholder="请填写联系人手机号"
        />
      </nut-form-item>
      <nut-form-item label="与申请人关系" prop="relationship" :label-width="110">
        <nut-radio-group direction="horizontal" v-model="loanInfo.relationship">
          <nut-radio v-for="item in RelationshipOptions" :key="item.value" :label="item.value">
            {{ item.text }}
          </nut-radio>
        </nut-radio-group>
      </nut-form-item>
      <nut-form-item label="联系人证件号码" prop="contactIdNum" :label-width="120">
        <nut-input
          class="nut-input-text"
          v-model="loanInfo.contactIdNum"
          type="text"
          :border="false"
          placeholder="请填写联系人证件号码"
        />
      </nut-form-item>
    </nut-form>
    <view class="flex justify-between margin-lg">
      <nut-button plain type="primary" @click="onPrev">上一步</nut-button>
      <nut-button type="primary" @click="onNext">下一步</nut-button>
    </view>
  </view>
</template>
<script setup>
import { reactive, ref } from 'vue'
import {
  LoanTermOptions,
  LoanPurposeOptions,
  LoanTypeOptions,
  CardTypeOptions,
  BillSendOptions,
  FinanceRepayTypeOptions,
  RelationshipOptions,
  GuaranteeTypeOptions,
  MaritalStatusOptions,
  idCardRegex,
  phoneNumberRegex
} from '@/tools/static'
import Taro from '@tarojs/taro'
import { taroFailureToast } from '@/tools/tools'
import { chineseNameValidator } from '@/tools/validator'
const props = defineProps({
  current: Number
})
const loanInfoForm = ref(null)
const loanPersonForm = Taro.getStorageSync('loanPersonForm') || {}
const loanInfoTemp = Taro.getStorageSync('loanInfoForm') || null
const emits = defineEmits(['change'])
const onPrev = () => {
  emits('change', { page: props.current - 1 })
}
const onNext = () => {
  loanInfoForm.value.validate().then(({ valid, errors }) => {
    if (valid) {
      emits('change', { page: props.current + 1 })
      Taro.setStorageSync('loanInfoForm', loanInfo)
    } else {
      console.log(errors)
      taroFailureToast('请按要求填完整信息再提交')
    }
  })
}
const loanLimitValidator = loanLimit => {
  if (!loanLimit) {
    return Promise.reject('请填写申请金额')
  }
  if (loanLimit <= 30) {
    return Promise.resolve()
  } else {
    return Promise.reject('申请金额不超过30万，请重新填写')
  }
}
const contactPhoneValidator = phone => {
  if (!phone) {
    return Promise.resolve()
  }
  if (!phoneNumberRegex.test(phone)) {
    return Promise.reject('请输入正确格式的手机号')
  }
  if (phone === loanPersonForm?.phone) {
    return Promise.reject('联系人手机号与申请人手机号不能相同')
  } else {
    return Promise.resolve()
  }
}
const contactIdNumValidator = idNum => {
  if (loanInfo.maritialStatus !== MaritalStatusOptions.find(i => i.text === '已婚')?.value) {
    return Promise.resolve()
  }
  if (idNum) {
    if (idCardRegex.test(idNum)) {
      return Promise.resolve()
    } else {
      return Promise.reject('请输入正确格式的身份证号')
    }
  } else {
    return Promise.reject('已婚人士需要填写配偶的证件号')
  }
}
const cardNoValidator = cardNo => {
  if (!loanInfo.repaymentMethod) {
    return Promise.resolve()
  }
  if (!cardNo) {
    return Promise.reject('请输入还款卡号')
  } else {
    return Promise.resolve()
  }
}
const relationshipValidator = relationship => {
  if (loanInfo.maritialStatus !== MaritalStatusOptions.find(i => i.text === '已婚')?.value) {
    return Promise.resolve()
  } else {
    if (relationship === RelationshipOptions.find(i => i.text === '配偶')?.value) {
      return Promise.resolve()
    } else {
      return Promise.reject('已婚人士只能选择配偶作为联系人')
    }
  }
}
const onPickerChange = e => {
  const index = e.detail.value
  loanInfo.repaymentMethod = FinanceRepayTypeOptions[index].value
  // console.log('obj', obj[index].value)
}
const loanInfo = reactive(
  Object.assign(
    loanPersonForm,
    loanInfoTemp
      ? loanInfoTemp
      : {
          loanLimit: '',
          loanTerm: '2',
          loanPurpose: '',
          loanType: '1',
          cardType: '0',
          billShippingMethod: '1',
          billShippingAddress: '',
          repaymentMethod: '',
          repaymentCard: '',
          guaranteeMethod: '1',
          contactName: '',
          contactPhone: '',
          relationship: '',
          contactIdNum: ''
        }
  )
)
const formRules = {
  loanLimit: [{ validator: loanLimitValidator, message: '申请金额不超过30万，请重新填写' }],
  loanTerm: [{ required: true, message: '请选择申请期限' }],
  loanPurpose: [{ required: true, message: '请选择借款用途' }],
  loanType: [{ required: true, message: '请选择借款性质' }],
  cardType: [{ required: true, message: '请选择卡片形式' }],
  cardNo: [{ validator: cardNoValidator, message: '' }],
  billShippingMethod: [{ required: true, message: '请选择账单寄送方式' }],
  billShippingAddress: [{ required: true, message: '请填写账单寄送地址' }],
  guaranteeMethod: [{ required: true, message: '请选择担保方式' }],
  contactName: [
    { required: true, message: '请填写联系人姓名' },
    { validator: chineseNameValidator, message: '' }
  ],
  relationship: [{ validator: relationshipValidator, message: '请选择与申请人关系' }],
  contactIdNum: [{ validator: contactIdNumValidator, message: '' }],
  contactPhone: [{ validator: contactPhoneValidator }]
}
</script>
<style lang="scss"></style>
