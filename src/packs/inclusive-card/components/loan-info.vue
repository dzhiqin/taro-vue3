<template>
  <view>
    <my-title class="margin"><view class="text-bold">借款信息填写</view></my-title>
    <nut-form ref="stateForm" :model-value="state" :rules="formRules">
      <nut-form-item label="申请额度(万元)" prop="loanLimit" :label-width="110">
        <nut-input
          class="nut-input-text"
          v-model="state.loanLimit"
          type="digit"
          :border="false"
          placeholder="请输入申请额度"
        ></nut-input>
      </nut-form-item>
      <nut-form-item label="申请期限" prop="loanTerm">
        <nut-radio-group direction="horizontal" v-model="state.loanTerm">
          <nut-radio v-for="item in LoanTermOptions" :key="item.value" :label="item.value">
            {{ item.text }}
          </nut-radio>
        </nut-radio-group>
      </nut-form-item>
      <nut-form-item label="借款用途" prop="loanPurpose">
        <nut-radio-group direction="horizontal" v-model="state.loanPurpose">
          <nut-radio v-for="item in LoanPurposeOptions" :key="item.value" :label="item.value">
            {{ item.text }}
          </nut-radio>
        </nut-radio-group>
        <!-- <nut-input
          class="nut-input-text"
          v-model="state.loanPurpose"
          type="text"
          :border="false"
          placeholder="请输入借款用途"
        /> -->
      </nut-form-item>
      <nut-form-item label="借款性质" prop="loanType">
        <!-- <nut-input
          class="nut-input-text"
          v-model="state.loanType"
          type="text"
          :border="false"
          placeholder="请输入借款性质"
        /> -->
        <nut-radio-group direction="horizontal" v-model="state.loanType">
          <nut-radio v-for="item in LoanTypeOptions" :key="item.value" :label="item.value">
            {{ item.text }}
          </nut-radio>
        </nut-radio-group>
      </nut-form-item>
      <nut-form-item label="卡片形式" prop="cardType">
        <!-- <nut-input
          class="nut-input-text"
          v-model="state.cardType"
          type="text"
          :border="false"
          placeholder="请输入卡片形式"
        /> -->
        <nut-radio-group direction="horizontal" v-model="state.cardType">
          <nut-radio v-for="item in CardTypeOptions" :key="item.value" :label="item.value">
            {{ item.text }}
          </nut-radio>
        </nut-radio-group>
      </nut-form-item>
      <nut-form-item label="账单寄送方式" prop="billShippingMethod" :label-width="110">
        <!-- <nut-input
          class="nut-input-text"
          v-model="state.billShippingMethod"
          type="text"
          :border="false"
          placeholder="请输入账单寄送方式"
        /> -->
        <nut-radio-group direction="horizontal" v-model="state.billShippingMethod">
          <nut-radio v-for="item in BillSendOptions" :key="item.value" :label="item.value">
            {{ item.text }}
          </nut-radio>
        </nut-radio-group>
      </nut-form-item>
      <nut-form-item label="账单寄送地址" prop="billShippingAddress" :label-width="110">
        <nut-input
          class="nut-input-text"
          v-model="state.billShippingAddress"
          type="text"
          :border="false"
          placeholder="请填写账单寄送地址"
        />
      </nut-form-item>
      <nut-form-item label="还款方式(选填)" prop="repaymentMethod" :label-width="110">
        <!-- <nut-input
          class="nut-input-text"
          v-model="state.repaymentMethod"
          type="text"
          :border="false"
          placeholder="请填写还款方式"
        /> -->
        <nut-radio-group direction="horizontal" v-model="state.repaymentMethod">
          <nut-radio v-for="item in FinanceRepayTypeOptions" :key="item.value" :label="item.value">
            {{ item.text }}
          </nut-radio>
        </nut-radio-group>
      </nut-form-item>
      <nut-form-item label="担保方式" prop="guaranteeMethod">
        <nut-input
          class="nut-input-text"
          v-model="state.guaranteeMethod"
          type="text"
          :border="false"
          placeholder="请选择担保方式"
        />
      </nut-form-item>
      <nut-form-item label="联系人姓名" prop="contactName">
        <nut-input
          class="nut-input-text"
          v-model="state.contactName"
          type="text"
          :border="false"
          placeholder="请填写联系人姓名"
        />
      </nut-form-item>
      <nut-form-item label="联系人手机号" prop="contactPhone" :label-width="110">
        <nut-input
          class="nut-input-text"
          v-model="state.contactPhone"
          type="text"
          :border="false"
          placeholder="请填写联系人手机号"
        />
      </nut-form-item>
      <nut-form-item label="与申请人关系" prop="relationship" :label-width="110">
        <nut-input
          class="nut-input-text"
          v-model="state.relationship"
          type="text"
          :border="false"
          placeholder="请填写与申请人关系"
        />
      </nut-form-item>
      <nut-form-item label="联系人证件号码" prop="contactIdNum" :label-width="120">
        <nut-input
          class="nut-input-text"
          v-model="state.contactIdNum"
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
import { reactive } from 'vue'
import {
  LoanTermOptions,
  LoanPurposeOptions,
  LoanTypeOptions,
  CardTypeOptions,
  BillSendOptions,
  FinanceRepayTypeOptions
} from '@/tools/static'
const props = defineProps({
  current: Number
})
const emits = defineEmits(['change'])
const onPrev = () => {
  emits('change', { page: props.current - 1 })
}
const onNext = () => {
  emits('change', { page: props.current + 1 })
}
const state = reactive({
  loanLimit: '',
  loanTerm: '',
  loanPurpose: '',
  loanType: '',
  cardType: '',
  billShippingMethod: '',
  billShippingAddress: '',
  repaymentMethod: '',
  repaymentCard: '',
  guaranteeMethod: '',
  contactName: '',
  contactPhone: '',
  relationship: '',
  contactIdNum: ''
})
</script>
<style lang="scss"></style>
