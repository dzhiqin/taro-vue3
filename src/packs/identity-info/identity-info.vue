<template>
  <view class="iden padding">
    <nut-form ref="idenForm" :model-value="state" :rules="idenFormRules">
      <my-title class="margin-top margin-left">
        <view class="text-bold">请上传身份证正反面，确保照片清晰完整</view>
      </my-title>
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
      <nut-form-item label="国家" prop="country">
        <nut-input
          v-model="state.country"
          type="text"
          class="nut-input-text"
          readonly
          :border="false"
          placeholder="上传身份证后自动识别"
        />
      </nut-form-item>
      <nut-form-item label="民族" prop="nation">
        <nut-input
          v-model="state.nation"
          type="text"
          class="nut-input-text"
          readonly
          :border="false"
          placeholder="上传身份证后自动识别"
        />
      </nut-form-item>
      <nut-form-item label="性别" prop="sex">
        <nut-input
          v-model="state.sex"
          type="text"
          class="nut-input-text"
          readonly
          :border="false"
          placeholder="上传身份证后自动识别"
        />
      </nut-form-item>
      <nut-form-item label="姓名" prop="name">
        <nut-input
          v-model="state.name"
          class="nut-input-text"
          type="text"
          readonly
          :border="false"
          placeholder="上传身份证后自动识别"
        />
      </nut-form-item>
      <nut-form-item label="证件号码" prop="idNum">
        <nut-input
          v-model="state.idNum"
          type="text"
          class="nut-input-text"
          readonly
          :border="false"
          placeholder="上传身份证后自动识别"
        />
      </nut-form-item>
      <nut-form-item label="签发机关" prop="authority" :label-width="100">
        <nut-input
          v-model="state.authority"
          type="text"
          class="nut-input-text"
          readonly
          :border="false"
          placeholder="上传身份证后自动识别"
        />
      </nut-form-item>
      <nut-form-item label="证件有效期" prop="validDate">
        <nut-input
          v-model="state.validDate"
          class="nut-input-text"
          type="text"
          readonly
          :border="false"
          placeholder="上传身份证后自动识别"
        />
      </nut-form-item>

      <nut-form-item label="证件地址" prop="address">
        <nut-input
          v-model="state.address"
          class="nut-input-text"
          type="text"
          readonly
          :border="false"
          placeholder="上传身份证后自动识别"
        />
      </nut-form-item>
      <my-title class="margin-top margin-left"><view class="text-bold">个人信息</view></my-title>
      <nut-form-item v-model="state.residence" label="现居住地" prop="residence">
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
      <nut-form-item v-model="state.occupation" label="选择职业" prop="occupation">
        <view class="text-black" @click="modalVisible = true">
          <my-select-cell>
            {{ state.occupation.length ? state.occupation.join('-') : '请选择职业' }}
          </my-select-cell>
        </view>

        <nut-cascader
          title="选择职业"
          v-model:visible="modalVisible"
          v-model="state.occupation"
          :options="occupations"
        ></nut-cascader>
      </nut-form-item>
      <nut-form-item label="具体职业" prop="occupationDetail">
        <nut-input
          class="nut-input-text"
          v-model="state.occupationDetail"
          :border="false"
          placeholder="请输入具体职业信息"
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
          <template #right>
            <my-sms-btn :phone="state.phone" type="personal" />
          </template>
        </nut-input>
      </nut-form-item>
      <nut-form-item label="验证码" prop="sms">
        <nut-input
          class="nut-input-text"
          placeholder="请输入验证码"
          type="text"
          v-model="state.sms"
        />
      </nut-form-item>
      <nut-form-item label="固定电话" prop="linePhone">
        <nut-input
          class="nut-input-text"
          type="number"
          v-model="state.linePhone"
          placeholder="选填"
        />
      </nut-form-item>
      <view class="margin-lg">
        <nut-button type="primary" block @click="onSubmit">保存</nut-button>
      </view>
    </nut-form>
  </view>
</template>
<script setup>
import { MyTitle, MyIdUploader, MySelectCell } from '@/components/index'
import { reactive, ref } from 'vue'
import { phoneValidator } from '@/tools/validator'
import { provCityDistRegex } from '@/tools/static'
import Taro from '@tarojs/taro'
import {
  taroToast,
  taroFailureToast,
  taroShowLoading,
  taroHideLoading,
  formatImgUrl
} from '@/tools/tools'
import { occupations } from '@/libs/occupation'
import { updatePersonalIdInfo } from '@/apis/common.api'
const idenForm = ref(null)
let state = reactive({
  name: '',
  idNum: '',
  address: '',
  sex: '',
  nation: '',
  validDate: '',
  authority: '',
  country: '中华人民共和国',
  residence: ['福建省', '泉州市', '石狮市'],
  residenceDetail: '',
  occupation: [],
  occupationDetail: '',
  phone: '',
  sms: '',
  linePhone: ''
})
const idenFormRules = {
  country: [{ required: true }],
  name: [{ required: true }],
  idNum: [{ required: true }],
  address: [{ required: true }],
  sex: [{ required: true }],
  nation: [{ required: true }],
  authority: [{ required: true }],
  validDate: [{ required: true }],
  residence: [{ required: true, message: '请选择现居住地省市区' }],
  residenceDetail: [{ required: true, message: '请填写现居住地详细地址' }],
  occupation: [{ required: true, message: '请选择职业' }],
  occupationDetail: [{ required: true, message: '请填写详细职业信息' }],
  phone: [
    { required: true, message: '请填写手机号' },
    { validator: phoneValidator, message: '请填写正确格式手机号' }
  ],
  sms: [{ required: true, message: '请填写验证码' }]
}
const onOcrFrontResult = e => {
  const { result, message, data } = e
  if (result) {
    const { nation, sex, address, idNum, name } = data
    state = Object.assign(state, { nation, sex, address, idNum, name })
  } else {
    taroToast(message)
  }
}
const onOcrBackResult = e => {
  const { result, message, data } = e
  if (result) {
    const { validDate, authority } = data
    state = Object.assign(state, { validDate, authority })
  } else {
    taroToast(message)
  }
}
const onRegionChange = e => {
  state.residence = e.detail.value
}
const blurValidator = prop => {
  idenForm.value.validate(prop)
}
const onSubmit = () => {
  idenForm.value.validate().then(({ valid, errors }) => {
    if (valid) {
      console.log('errors', errors)
      handleSubmit()
    } else {
      taroFailureToast('信息不完整')
    }
  })
}
const handleSubmit = () => {
  const params = rebuildParams()
  taroShowLoading()
  updatePersonalIdInfo(params)
    .then(res => {
      taroHideLoading()
      if (res.code === 200) {
        Taro.showModal({
          title: '提示',
          content: '修改成功',
          cancelText: '返回上一页',
          confirmText: '确定',
          success: res => {
            if (res.cancel) {
              Taro.navigateBack()
            }
          }
        })
      } else {
        taroToast(res.message)
      }
    })
    .catch(err => {
      taroToast(err.message)
    })
}
const modalVisible = ref(false)
const rebuildParams = () => {
  const provCityDist = state.address.match(provCityDistRegex).join('')
  const params = {
    name: state.name,
    idcard: state.idNum,
    inst: state.authority,
    startDate: state.validDate.split('-')[0],
    endDate: state.validDate.split('-')[1],
    country: state.country,
    nation: state.nation,
    sex: state.sex,
    countyC: provCityDist,
    county: provCityDist,
    addrDetailC: state.address.replace(provCityDist, ''),
    addrDetail: state.address.replace(provCityDist, ''),
    phone: state.phone,
    checkCode: state.sms,
    fitell: state.linePhone,
    professionBig: state.occupation[0],
    professionMiddle: state.occupation[1],
    professionSmall: state.occupation[2],
    professionDetail: state.occupationDetail
  }
  return params
}
</script>
<style lang="scss"></style>
