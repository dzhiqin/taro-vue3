<template>
  <view class="pre padding">
    <view class="flex align-center">
      <img
        :src="formatImgUrl('weapp/temp7030910804946959156img-prepayment_1707006539881.png')"
        class="pre-img"
      />
    </view>

    <view v-show="hasRecord" class="pre-record">
      <my-title class="margin"><view class="text-bold">申请记录</view></my-title>
      <nut-cell-group>
        <nut-cell title="名称" :desc="record.customerName"></nut-cell>
        <nut-cell title="还款账号" :desc="record.customerAccount"></nut-cell>
        <nut-cell title="申请提交还款金额" :desc="record.prePaymentSum"></nut-cell>
        <nut-cell title="申请提交还款日期" :desc="record.appointmentTime"></nut-cell>
        <nut-cell title="审核状态" :desc="record.statusStr"></nut-cell>
        <nut-cell
          v-if="record.prePaymentStatus === APPLY_STATUS.pass"
          title="同意提前还款日期"
          :desc="record.checkPrePaymentTime"
        ></nut-cell>
        <nut-cell
          v-if="record.prePaymentStatus === APPLY_STATUS.rejected"
          title="审核不通过原因"
          :desc="record.rejectReason"
        ></nut-cell>
      </nut-cell-group>
    </view>
    <nut-form v-show="!hasRecord" ref="stateForm" :model-value="state" :rules="formRules">
      <my-title class="margin"><view class="text-bold">填写申请</view></my-title>
      <nut-form-item label="账户类型" prop="accountType">
        <nut-radio-group direction="horizontal" v-model="state.accountType">
          <nut-radio label="对公客户">对公客户</nut-radio>
          <nut-radio label="个人客户">个人客户</nut-radio>
        </nut-radio-group>
      </nut-form-item>
      <nut-form-item
        v-show="state.accountType === '对公客户'"
        label="企业名称"
        prop="enterpriseName"
        required
      >
        <nut-input
          v-model="state.enterpriseName"
          class="nut-input-text"
          placeholder="请填写企业名称"
          type="text"
        />
      </nut-form-item>
      <nut-form-item v-show="state.accountType === '个人客户'" label="姓名" prop="name" required>
        <nut-input
          v-model="state.name"
          class="nut-input-text"
          placeholder="请填写姓名"
          type="text"
          @blur="blurValidator('name')"
        />
      </nut-form-item>
      <nut-form-item
        v-show="state.accountType === '个人客户'"
        label="证件号码"
        prop="idNum"
        required
      >
        <nut-input
          v-model="state.idNum"
          type="text"
          class="nut-input-text"
          :border="false"
          placeholder="请填写身份证号"
          @blur="blurValidator('idNum')"
        />
      </nut-form-item>
      <nut-form-item label="手机号" prop="phone">
        <nut-input
          class="nut-input-text"
          placeholder="请输入手机号"
          type="number"
          v-model="state.phone"
          @blur="blurValidator('phone')"
        >
        </nut-input>
      </nut-form-item>
      <nut-form-item label="预约还款日期" :label-width="110" prop="appointmentDate">
        <view class="nut-input-text" @click="calendarVisible = true">
          <my-select-cell>
            {{ state.appointmentDate || '请选择日期' }}
          </my-select-cell>
        </view>
        <nut-calendar
          v-model:visible="calendarVisible"
          :default-value="state.appointmentDate"
          :start-date="startDate"
          :end-date="endDate"
          @close="calendarVisible = false"
          @choose="onChooseDate"
        >
        </nut-calendar>
        <view class="text-sm">只能预约30天后的日期</view>
      </nut-form-item>
      <nut-form-item label="提前还款理由" :label-width="110" prop="reason">
        <nut-input
          v-model="state.reason"
          type="text"
          class="nut-input-text"
          :border="false"
          placeholder="请填写理由"
        />
      </nut-form-item>
      <nut-form-item label="提前还款金额" :label-width="110" prop="prepaymentSum">
        <nut-input
          v-model="state.prepaymentSum"
          type="digit"
          class="nut-input-text"
          :border="false"
          placeholder="请填写金额"
        >
          <template #right>
            <text class="nutui-iconfont nut-icon">元</text>
          </template>
        </nut-input>
      </nut-form-item>
      <view class="margin-lg">
        <nut-button type="primary" block @click="onSubmit">提交</nut-button>
      </view>
    </nut-form>
  </view>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { phoneValidator } from '@/tools/validator'
import {
  taroFailureToast,
  taroShowLoading,
  taroHideLoading,
  taroRedirectToPage,
  taroToast,
  taroGetParams,
  humanDate,
  formatImgUrl
} from '@/tools/tools'
import { chineseNameRegex, idCardRegex } from '@/tools/static'
import { getPrepaymentApplyRecord, addPrepaymentApplyRecord } from '@/apis/prepayment.api'
const { openId, code } = taroGetParams()
const APPLY_STATUS = {
  pass: '1',
  rejected: '2'
}
const stateForm = ref(null)
const hasRecord = ref(false)
const idNumValidator = idNum => {
  if (state.accountType === '对公客户') {
    return Promise.resolve()
  }
  if (!idNum) {
    return Promise.reject('请填写身份证号')
  }
  if (idCardRegex.test(idNum)) {
    return Promise.resolve()
  } else {
    return Promise.reject('请输入正确格式的身份证号')
  }
}
const enterpriseNameValidator = name => {
  if (state.accountType === '个人客户') {
    return Promise.resolve()
  }
  if (!name) {
    return Promise.reject('请填写企业名称')
  } else {
    return Promise.resolve()
  }
}
const nameVlidator = name => {
  if (state.accountType === '对公客户') {
    return Promise.resolve()
  }
  if (!name) {
    return Promise.reject('请填写姓名')
  }
  if (chineseNameRegex.test(name)) {
    return Promise.resolve()
  } else {
    return Promise.reject('请输入2个或以上汉字的姓名')
  }
}
const calendarVisible = ref(false)
const onChooseDate = param => {
  state.appointmentDate = param[3]
}
const currentTime = new Date().getTime()
const MonthDurationMs = 30 * 24 * 60 * 60 * 1000
const YearDurationMs = 12 * MonthDurationMs
const startDate = humanDate(new Date(currentTime + MonthDurationMs))
const endDate = humanDate(new Date(currentTime + YearDurationMs))
const state = reactive({
  accountType: '个人客户',
  enterpriseName: '',
  idNum: '',
  phone: '',
  appointmentDate: startDate,
  reason: '',
  prepaymentSum: ''
})
let record = reactive({
  customerName: '',
  customerAccount: '',
  prePaymentSum: '',
  appointmentTime: '',
  statusStr: '',
  status: '',
  checkPrePaymentTime: '',
  rejectReason: ''
})
const formRules = {
  accountType: [{ required: true, message: '请选择类型' }],
  name: [{ validator: nameVlidator, message: '请输入2个或以上汉字的姓名' }],
  phone: [
    { required: true, message: '请填写手机号' },
    { validator: phoneValidator, message: '请填写正确格式手机号' }
  ],
  idNum: [{ validator: idNumValidator, message: '请填写身份证号' }],
  enterpriseName: [{ validator: enterpriseNameValidator, message: '请填写现居住地详细地址' }],
  reason: [{ required: true, message: '请填写理由' }],
  prepaymentSum: [{ required: true, message: '请填写金额' }],
  appointmentDate: [{ required: true, message: '请选择日期' }]
}
const onSubmit = () => {
  stateForm.value.validate().then(({ valid, errors }) => {
    if (valid) {
      console.log('errors', errors)
      handleSubmit()
    } else {
      taroFailureToast('信息不完整')
    }
  })
}
const handleSubmit = () => {
  console.log('submit', state)
  taroShowLoading()
  const params = {
    code,
    applyOpenId: openId,
    accountType: state.accountType,
    appointmentTime: state.appointmentDate,
    enterpriseName: state.enterpriseName,
    applyIdNumber: state.idNum,
    applyName: state.name,
    applyMobile: state.phone,
    reason: state.reason,
    prePaymentSum: state.prepaymentSum
  }
  addPrepaymentApplyRecord(params).then(res => {
    if (res.success) {
      taroHideLoading()
      taroRedirectToPage('/pages/success/success?title=提前还款申请提交成功')
    } else {
      taroToast(res.message)
    }
  })
}
const blurValidator = prop => {
  stateForm.value.validate(prop)
}
getPrepaymentApplyRecord({ applyOpenId: openId }).then(res => {
  console.log('get record', res)
  if (res.success) {
    hasRecord.value = true
    record = res.result
  }
})
</script>
<style lang="scss">
.pre-img {
  width: 320px;
  height: 240px;
  margin: auto;
}
</style>
