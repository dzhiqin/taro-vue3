<template>
  <view class="citizen-loan-limit">
    <my-navigator title="测算额度" />
    <my-logo class="margin"></my-logo>
    <view class="citizen-content">
      <my-title><view class="text-bold">请上传身份证正反面，确保照片清晰完整</view></my-title>
      <view class="flex justify-around margin-top">
        <my-id-uploader @ocrResult="onOcrFrontResult" />
        <my-id-uploader size="back" @ocrResult="onOcrBackResult" />
      </view>
      <view class="margin-top text-center">
        <img
          :src="formatImgUrl('weapp/temp7753166143815885868img-id-example_1706240660023.png')"
          class="id-example"
        />
      </view>
      <my-title><view class="text-bold margin-top">详细信息</view></my-title>
      <nut-form ref="stateForm" :model-value="state" :rules="formRules">
        <nut-form-item label="姓名" prop="name">
          <nut-input
            v-model="state.name"
            class="nut-input-text"
            placeholder="上传身份证后自动识别"
            readonly
            type="text"
          />
        </nut-form-item>
        <nut-form-item label="身份证号" prop="idNum">
          <nut-input
            v-model="state.idNum"
            class="nut-input-text"
            placeholder="上传身份证后自动识别"
            readonly
            type="text"
          />
        </nut-form-item>
        <nut-form-item label="现居住地" prop="residence">
          <picker mode="region" @change="onRegionChange" :value="state.residence">
            <my-select-cell>
              <view class="text-black"> {{ state.residence.join('') }} </view>
            </my-select-cell>
          </picker>
        </nut-form-item>
        <nut-form-item label="详细地址" prop="residenceDetail">
          <nut-input
            class="nut-input-text"
            v-model="state.residenceDetail"
            type="text"
            :border="false"
            placeholder="请输入详细地址"
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
        <nut-form-item label="验证码" prop="sms">
          <nut-input
            class="nut-input-text"
            placeholder="请输入验证码"
            type="text"
            v-model="state.sms"
          >
            <template #right>
              <my-sms-btn :phone="state.phone" type="personal" />
            </template>
          </nut-input>
        </nut-form-item>

        <nut-form-item label="是否缴纳社保或公积金" :label-width="180" prop="hasSocialSecurity">
          <nut-radio-group direction="horizontal" v-model="state.hasSocialSecurity">
            <nut-radio label="1">是</nut-radio>
            <nut-radio label="0">否</nut-radio>
          </nut-radio-group>
        </nut-form-item>
        <nut-form-item label="是否在当地经商或创业" :label-width="180" prop="hasBusiness">
          <nut-radio-group direction="horizontal" v-model="state.hasBusiness">
            <nut-radio label="1">是</nut-radio>
            <nut-radio label="0">否</nut-radio>
          </nut-radio-group>
        </nut-form-item>
        <nut-form-item label="是否在泉州有固定资产" :label-width="180" prop="hasHouseProperty">
          <nut-radio-group direction="horizontal" v-model="state.hasHouseProperty">
            <nut-radio label="1">是</nut-radio>
            <nut-radio label="0">否</nut-radio>
          </nut-radio-group>
        </nut-form-item>
        <nut-form-item label="客户经理工号" prop="managerId" :label-width="100">
          <nut-input
            v-model="state.managerId"
            class="nut-input-text"
            placeholder="选填"
            type="text"
          />
        </nut-form-item>
        <nut-form-item label="推荐人工号" prop="recommendId" :label-width="100">
          <nut-input
            v-model="state.recommendId"
            class="nut-input-text"
            placeholder="选填"
            type="text"
          />
        </nut-form-item>
        <view class="margin-lg">
          <nut-button type="primary" block @click="onSubmit">提交</nut-button>
        </view>
      </nut-form>
    </view>
  </view>
</template>
<script setup>
import {
  MyIdUploader,
  MyTitle,
  MyLogo,
  MyNavigator,
  MySmsBtn,
  MySelectCell
} from '@/components/index'
import {
  formatImgUrl,
  taroFailureToast,
  taroShowLoading,
  taroHideLoading,
  taroRedirectToPage,
  taroToast,
  taroGetParams
} from '@/tools/tools'
import { reactive, ref } from 'vue'
import { Picker } from '@tarojs/components'
import { phoneValidator } from '@/tools/validator'
import { addCitizenLoanLimitApply } from '@/apis/citizen.api'
const stateForm = ref(null)
const formRules = {
  name: [{ required: true }],
  idNum: [{ required: true }],
  phone: [
    { required: true, message: '请填写手机号' },
    { validator: phoneValidator, message: '请填写正确格式手机号' }
  ],
  sms: [{ required: true, message: '请填写验证码' }],
  residence: [{ required: true, message: '请选择现居住地省市区' }],
  residenceDetail: [{ required: true, message: '请填写现居住地详细地址' }],
  hasSocialSecurity: [{ required: true, message: '请选择' }],
  hasBusiness: [{ required: true, message: '请选择' }],
  hasHouseProperty: [{ required: true, message: '请选择' }]
}
const { source, manager } = taroGetParams()
let state = reactive({
  name: '',
  idNum: '',
  phone: '',
  residence: ['福建省', '泉州市', '石狮市'],
  residenceDetail: '',
  hasSocialSecurity: '1',
  hasBusiness: '1',
  hasHouseProperty: '1',
  managerId: manager,
  recommendId: '',
  sex: '',
  address: ''
})
const onRegionChange = e => {
  state.residence = e.detail.value
}
const blurValidator = prop => {
  stateForm.value.validate(prop)
}
const onSubmit = () => {
  stateForm.value.validate().then(({ valid }) => {
    if (!valid) return taroFailureToast('信息不完整')
    handleSubmit()
  })
}
const onOcrFrontResult = e => {
  const { result, message, data } = e
  if (result) {
    const { sex, address, idNum, name } = data
    state = Object.assign(state, { sex, address, idNum, name })
  } else {
    taroToast(message)
  }
}
const onOcrBackResult = e => {
  const { result, message } = e
  if (result) {
    // const { validDate, authority } = data
    // state = Object.assign(state, { validDate, authority })
  } else {
    taroToast(message)
  }
}
const handleSubmit = () => {
  taroShowLoading()
  const params = {
    name: state.name,
    idcard: state.idNum,
    phone: state.phone,
    sex: state.sex,
    addr: state.address,
    checkCode: state.sms,
    isWork: state.hasSocialSecurity,
    isMerchant: state.hasBusiness,
    isHouse: state.hasHouseProperty,
    custManageStaffId: state.managerId,
    recommendId: state.recommendId,
    living: state.residence.join('') + state.residenceDetail,
    source,
    wxid: '',
    wxname: '',
    wximg: ''
  }
  addCitizenLoanLimitApply(params).then(res => {
    taroHideLoading()
    if (res.code === 200) {
      taroRedirectToPage('/pages/success/success')
    } else {
      taroToast(res.message)
    }
  })
}
</script>
<style lang="scss">
.citizen-loan-limit {
  background-image: url('../../assets/img/background.png');
  background-repeat: no-repeat;
  background-size: 100%;
  min-height: 100vh;
  .citizen {
    &-content {
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      background-color: white;
      // margin-top: 20px;
      padding: 16px;
    }
  }

  .nut-cell-group__wrap {
    box-shadow: none;
  }
}
</style>
