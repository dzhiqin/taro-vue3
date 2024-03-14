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
  <nut-form ref="loanPersonForm" :model-value="loanPerson" :rules="formRules">
    <nut-form-item label="姓名" prop="name">
      <nut-input
        v-model="loanPerson.name"
        class="nut-input-text"
        placeholder="上传身份证后自动识别"
        readonly
        type="text"
      />
    </nut-form-item>
    <nut-form-item label="身份证号" prop="idNum">
      <nut-input
        v-model="loanPerson.idNum"
        class="nut-input-text"
        placeholder="上传身份证后自动识别"
        readonly
        type="text"
      />
    </nut-form-item>
    <nut-form-item label="现居住地" prop="residence">
      <picker mode="region" @change="onRegionChange" :value="loanPerson.residence">
        <my-select-cell>
          <view class="text-black"> {{ loanPerson.residence.join('') }} </view>
        </my-select-cell>
      </picker>
    </nut-form-item>
    <nut-form-item label="详细地址" prop="residenceDetail">
      <nut-input
        class="nut-input-text"
        v-model="loanPerson.residenceDetail"
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
        v-model="loanPerson.phone"
        @blur="blurValidator('phone')"
      >
        <template #right>
          <my-sms-btn :phone="loanPerson.phone" type="personal" />
        </template>
      </nut-input>
    </nut-form-item>
    <nut-form-item label="验证码" prop="sms">
      <nut-input
        class="nut-input-text"
        placeholder="请输入验证码"
        type="text"
        v-model="loanPerson.sms"
      />
    </nut-form-item>
    <nut-form-item label="电子邮箱" prop="email">
      <nut-input
        class="nut-input-text"
        placeholder="请输入电子邮箱"
        type="text"
        v-model="loanPerson.email"
      />
    </nut-form-item>
    <nut-form-item label="婚姻状况" prop="maritialStatus">
      <picker
        mode="selector"
        :range="MaritalStatusOptions.map(i => i.text)"
        @change="onPickerChange($event, 'maritialStatus', MaritalStatusOptions)"
        :value="loanPerson.maritialStatus"
      >
        <my-select-cell>
          <view class="text-black">{{
            MaritalStatusOptions.find(i => i.value === loanPerson.maritialStatus)?.text ||
            '请选择婚姻状态'
          }}</view>
        </my-select-cell>
      </picker>
    </nut-form-item>
    <nut-form-item label="教育程度" prop="education">
      <picker
        mode="selector"
        :range="EducationOptions.map(i => i.text)"
        @change="onPickerChange($event, 'education', EducationOptions)"
        :value="loanPerson.education"
      >
        <my-select-cell>
          <view class="text-black">{{
            EducationOptions.find(i => i.value === loanPerson.education)?.text || '请选择教育程度'
          }}</view>
        </my-select-cell>
      </picker>
    </nut-form-item>
    <nut-form-item label="单位名称" prop="enterpriseName">
      <nut-input
        class="nut-input-text"
        placeholder="请填写单位名称"
        type="text"
        v-model="loanPerson.enterpriseName"
      />
    </nut-form-item>
    <nut-form-item label="任职部门" prop="department">
      <nut-input
        class="nut-input-text"
        placeholder="请填写任职部门"
        type="text"
        v-model="loanPerson.department"
      />
    </nut-form-item>
    <nut-form-item label="职务" prop="job">
      <picker
        mode="selector"
        :range="JobOptions.map(i => i.text)"
        @change="onPickerChange($event, 'job', JobOptions)"
        :value="loanPerson.job"
      >
        <my-select-cell>
          <view class="text-black">
            {{ JobOptions.find(i => i.value === loanPerson.job)?.text || '请选择职务' }}</view
          >
        </my-select-cell>
      </picker>
    </nut-form-item>
    <nut-form-item label="职称" prop="title">
      <picker
        mode="selector"
        :range="TitleOptions.map(i => i.text)"
        @change="onPickerChange($event, 'title', TitleOptions)"
        :value="loanPerson.title"
      >
        <my-select-cell>
          <view class="text-black">
            {{ TitleOptions.find(i => i.value === loanPerson.title)?.text || '请选择职称' }}</view
          >
        </my-select-cell>
      </picker>
    </nut-form-item>
    <nut-form-item label="单位电话" prop="officePhone">
      <nut-input
        class="nut-input-text"
        placeholder="请填写单位电话(选填)"
        type="text"
        v-model="loanPerson.officePhone"
      />
    </nut-form-item>
    <nut-form-item label="单位地址" prop="officeAddress">
      <nut-input
        class="nut-input-text"
        placeholder="请填写单位地址"
        type="text"
        v-model="loanPerson.officeAddress"
      />
    </nut-form-item>
    <view class="margin-lg flex-column align-center">
      <view class="margin-bottom-sm flex align-center">
        <nut-checkbox v-model="agreed" class="text-sm"> 本人已阅读并同意 </nut-checkbox>
        <view class="text-blue text-sm" @click="handleClick">《新市民积分贷款合同》</view>
      </view>
      <nut-button type="primary" block @click="onSubmit">下一步</nut-button>
    </view>
  </nut-form>
  <my-agreement-modal :visible="modalVisible" @confirm="modalChange">
    content....
  </my-agreement-modal>
</template>
<script setup>
import { formatImgUrl, taroToast, taroFailureToast } from '@/tools/tools'
import { reactive, ref } from 'vue'
import { MaritalStatusOptions, EducationOptions, JobOptions, TitleOptions } from '@/tools/static'
import { phoneValidator, emailValidator } from '@/tools/validator'
import Taro from '@tarojs/taro'
import { MyAgreementModal } from '@/components/index'
const props = defineProps({
  current: Number
})
const emits = defineEmits(['change'])
const agreed = ref(false)
const loanPersonForm = ref(null)
const loanPersonTemp = Taro.getStorageSync('loanPersonForm') || null
const modalVisible = ref(false)
const handleClick = () => {
  modalVisible.value = true
}
const modalChange = () => {
  modalVisible.value = false
}
let loanPerson = reactive(
  loanPersonTemp
    ? loanPersonTemp
    : {
        name: '',
        idNum: '',
        nameSpelling: '',
        address: '',
        sex: '',
        birth: '',
        validDate: '',
        residence: ['福建省', '泉州市', '石狮市'],
        residenceDetail: '',
        phone: '',
        sms: '',
        email: '',
        maritialStatus: '',
        maritialStatusText: '',
        education: '',
        enterpriseName: '',
        department: '', // 部门
        job: '', // 职务
        title: '', //职称
        officeAddress: '',
        officePhone: ''
      }
)
const onSubmit = () => {
  loanPersonForm.value.validate().then(({ valid, errors }) => {
    if (valid) {
      if (!agreed.value) {
        taroFailureToast('请勾选协议')
        return
      }
      emits('change', { page: props.current + 1 })
      Taro.setStorageSync('loanPersonForm', loanPerson)
    } else {
      console.log(errors)
      taroFailureToast('信息不完整')
    }
  })
}
const onPickerChange = (e, name, obj) => {
  const index = e.detail.value
  loanPerson[name] = obj[index].value
  // console.log('obj', obj[index].value)
}
const onOcrFrontResult = e => {
  const { result, message, data } = e
  if (result) {
    const { name, idNum, nameSpelling, address, birth, sex } = data
    loanPerson = Object.assign(loanPerson, { name, idNum, nameSpelling, address, birth, sex })
  } else {
    taroToast(message)
  }
}
const onOcrBackResult = e => {
  const { result, message, data } = e
  if (result) {
    const { validDate } = data
    loanPerson = Object.assign(loanPerson, { validDate })
  } else {
    taroToast(message)
  }
}
const onRegionChange = e => {
  loanPerson.residence = e.detail.value
}
const blurValidator = prop => {
  loanPersonForm.value.validate(prop)
}
const formRules = {
  name: [{ required: true }],
  idNum: [{ required: true }],
  validDate: [{ required: true }],
  address: [{ required: true }],
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
