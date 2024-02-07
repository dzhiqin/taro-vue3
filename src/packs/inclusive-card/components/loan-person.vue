<template>
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
  <my-title class="margin"><view class="text-bold">个人信息填写</view></my-title>

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
    <nut-form-item label="电子邮箱" prop="email">
      <nut-input
        class="nut-input-text"
        placeholder="请输入电子邮箱"
        type="text"
        v-model="state.email"
      />
    </nut-form-item>
    <nut-form-item label="婚姻状况" prop="maritialStatus">
      <nut-input
        class="nut-input-text"
        placeholder="请选择婚姻状况"
        type="text"
        v-model="state.maritialStatus"
      />
    </nut-form-item>
    <nut-form-item label="教育程度" prop="education">
      <nut-input
        class="nut-input-text"
        placeholder="请选择教育承担"
        type="text"
        v-model="state.education"
      />
    </nut-form-item>
    <nut-form-item label="单位名称" prop="enterpriseName">
      <nut-input
        class="nut-input-text"
        placeholder="请填写单位名称"
        type="text"
        v-model="state.enterpriseName"
      />
    </nut-form-item>
    <nut-form-item label="任职部门" prop="department">
      <nut-input
        class="nut-input-text"
        placeholder="请填写任职部门"
        type="text"
        v-model="state.department"
      />
    </nut-form-item>
    <nut-form-item label="职务" prop="job">
      <nut-input class="nut-input-text" placeholder="请填写职务" type="text" v-model="state.job" />
    </nut-form-item>
    <nut-form-item label="职称" prop="title">
      <nut-input
        class="nut-input-text"
        placeholder="请选择职称"
        type="text"
        v-model="state.title"
      />
    </nut-form-item>
    <nut-form-item label="单位电话" prop="officePhone">
      <nut-input
        class="nut-input-text"
        placeholder="请填写单位电话(选填)"
        type="text"
        v-model="state.officePhone"
      />
    </nut-form-item>
    <nut-form-item label="单位地址" prop="officeAddress">
      <nut-input
        class="nut-input-text"
        placeholder="请填写单位地址(选填)"
        type="text"
        v-model="state.officeAddress"
      />
    </nut-form-item>
    <view class="margin-lg flex-column align-center">
      <view class="margin-bottom-sm">
        <nut-checkbox v-model="agreement" class="text-sm">
          本人已阅读并同意<text class="text-blue">《新市民积分贷款合同》</text>
        </nut-checkbox>
      </view>
      <nut-button type="info" block @click="onSubmit">NEXT</nut-button>
      <!-- <view> </view> -->
    </view>
  </nut-form>
</template>
<script setup>
import { formatImgUrl, taroToast, taroFailureToast } from '@/tools/tools'
import { reactive, ref } from 'vue'
import { phoneValidator, emailValidator } from '@/tools/validator'
const props = defineProps({
  current: Number
})
const emits = defineEmits(['change'])
const agreement = ref(false)
const stateForm = ref(null)
let state = reactive({
  name: '',
  idNum: '',
  nameSpelling: '',
  residence: ['福建省', '泉州市', '石狮市'],
  residenceDetail: '',
  phone: '',
  sms: '',
  email: '',
  maritialStatus: '',
  education: '',
  enterpriseName: '',
  department: '', // 部门
  job: '', // 职务
  title: '', //职称
  officeAddress: '',
  officePhone: '',
  authority: ''
})
const onSubmit = () => {
  stateForm.value.validate().then(({ valid, errors }) => {
    if (valid) {
      emits('change', { page: props.current + 1 })
    } else {
      console.log(errors)
      taroFailureToast('信息不完整')
    }
  })
  emits('change', { page: props.current + 1 })
}
const onOcrFrontResult = e => {
  const { result, message, data } = e
  if (result) {
    const { name, idNum, nameSpelling } = data
    state = Object.assign(state, { name, idNum, nameSpelling })
  } else {
    taroToast(message)
  }
}
const onOcrBackResult = e => {
  const { result, message, data } = e
  if (result) {
    const { authority } = data
    state = Object.assign(state, { authority })
  } else {
    taroToast(message)
  }
}
const onRegionChange = e => {
  state.residence = e.detail.value
}
const blurValidator = prop => {
  stateForm.value.validate(prop)
}
const formRules = {
  name: [{ required: true }],
  idNum: [{ required: true }],
  authority: [{ required: true }],
  residenceDetail: [{ required: true, message: '请填写居住地址' }],
  phone: [
    { required: true, message: '请填写手机号' },
    { validator: phoneValidator, message: '请填写正确格式手机号' }
  ],
  sms: [{ required: true, message: '请填写验证码' }],
  email: [
    { required: true, message: '请填写电子邮箱' },
    { validator: emailValidator, message: '请输入正确格式的电子邮箱' }
  ],
  maritialStatus: [{ required: true, message: '请选择婚姻状况' }],
  education: [{ required: true, message: '请选择教育程度' }],
  enterpriseName: [{ required: true, message: '请填写单位名称' }],
  department: [{ required: true, message: '请填写任职部门' }],
  job: [{ required: true, message: '请选择职务' }],
  title: [{ required: true, message: '请选择职称' }],
  officeAddress: [{ required: true, message: '请填写单位地址' }]
}
</script>
<style lang="scss">
.nut-cell-group__wrap {
  box-shadow: none;
}
.nut-checkbox {
  margin-right: 0;
}
</style>
