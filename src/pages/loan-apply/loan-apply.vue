<template>
  <view class="loan">
    <my-navigator title="业务办理" />
    <my-logo class="margin" />
    <view class="loan-content">
      <my-title><view class="text-bold">申请步骤</view></my-title>
      <nut-steps :current="1" class="margin-top">
        <nut-step title="提交需求">1</nut-step>
        <nut-step title="专员服务">2</nut-step>
        <nut-step title="处理完成">3</nut-step>
      </nut-steps>
      <view v-if="imgUrl" class="flex justify-center">
        <img :src="imgUrl" class="loan-poster" />
      </view>
      <my-title><view class="text-bold">信息填写</view></my-title>
      <nut-form ref="stateForm" :model-value="state" :rules="formRules">
        <nut-form-item label="姓名" prop="name">
          <nut-input
            v-model="state.name"
            class="nut-input-text"
            placeholder="请填写姓名"
            type="text"
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
              <my-sms-btn :phone="state.phone" type="easy" />
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
        <nut-form-item label="办理业务" prop="product">
          <view class="nut-input-text" @click="prodsVisible = true">
            <my-select-cell>
              {{ state.prodName || '请选择办理业务' }}
            </my-select-cell>
          </view>
          <nut-popup position="bottom" v-model:visible="prodsVisible">
            <nut-picker
              :columns="loanProducts"
              title="请选择办理业务"
              @confirm="onProdConfirm"
              @cancel="prodsVisible = false"
            >
            </nut-picker>
          </nut-popup>
        </nut-form-item>
        <nut-form-item label="现居住地" prop="estate">
          <view class="nut-input-text" @click="estatesVisible = true">
            <my-select-cell>
              {{ state.estateText || '请选择小区' }}
            </my-select-cell>
          </view>
          <nut-popup position="bottom" v-model:visible="estatesVisible">
            <nut-picker
              :columns="estates"
              title="请选择居住小区"
              @confirm="onEstateConfirm"
              @cancel="estatesVisible = false"
            >
            </nut-picker>
          </nut-popup>
        </nut-form-item>
        <nut-form-item v-show="state.estate === '7'" label="详细地址" prop="residenceDetail">
          <nut-input
            class="nut-input-text"
            v-model="state.residenceDetail"
            type="text"
            :border="false"
            placeholder="请输入详细地址"
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
import { reactive, ref, computed } from 'vue'
import { phoneValidator } from '@/tools/validator'
import {
  taroFailureToast,
  taroShowLoading,
  taroHideLoading,
  taroRedirectToPage,
  taroToast,
  taroGetParams,
  formatImgUrl
} from '@/tools/tools'
import { MySelectCell } from '@/components/index'
import { queryDictByCodes, addLoanApplyRecord } from '@/apis/common.api'
import { POSTER_PROD_DICT, ESTATE_DICT } from '@/tools/static'
import { chineseNameValidator } from '@/tools/validator'
const params = taroGetParams()
const estatesVisible = ref(false)
const prodsVisible = ref(false)
const loanProducts = ref([])
const estates = ref([])
const stateForm = ref(null)
const customValidator = residence => {
  if (/其它|其他/.test(state.estateText)) {
    if (!residence) {
      return Promise.reject('请填写居住地址')
    } else {
      return Promise.resolve()
    }
  } else {
    return Promise.resolve()
  }
}
const imgUrl = computed(() => {
  if (state.prodName === '普惠金融卡')
    return formatImgUrl('weapp/temp8959732256387195208img-inclusive-card_1711006072604.jpeg')
  if (state.prodName === '普惠信用贷')
    return formatImgUrl('weapp/temp3077245658373927264img-inclusive-credit-loan_1711006838379.jpeg')
  if (state.prodName === '业主全额贷')
    return formatImgUrl('weapp/temp2789260841121167323img-owner-loan_1711006888405.jpeg')
  return ''
})
const formRules = {
  name: [
    { required: true, message: '请填写姓名' },
    { validator: chineseNameValidator, message: '请输入2个或以上汉字的姓名' }
  ],
  phone: [
    { required: true, message: '请填写手机号' },
    { validator: phoneValidator, message: '请填写正确格式手机号' }
  ],
  sms: [{ required: true, message: '请填写验证码' }],
  estate: [{ required: true, message: '请选择居住小区' }],
  product: [{ required: true, message: '请选择办理业务' }],
  residenceDetail: [{ validator: customValidator, message: '请填写现居住地详细地址' }]
}

let state = reactive({
  name: '',
  phone: '',
  address: '',
  product: '',
  prodName: params?.prodName,
  estate: '',
  estateText: '',
  residenceDetail: ''
})
const onEstateConfirm = ({ selectedValue, selectedOptions }) => {
  state.estate = selectedValue[0]
  state.estateText = selectedOptions.map(val => val.text).join('')
  estatesVisible.value = false
}
const onProdConfirm = ({ selectedValue, selectedOptions }) => {
  state.product = selectedValue[0]
  state.prodName = selectedOptions.map(val => val.text).join('')
  prodsVisible.value = false
}
const blurValidator = prop => {
  stateForm.value.validate(prop)
}
const onSubmit = () => {
  console.log('submit', state)

  stateForm.value.validate().then(({ valid, errors }) => {
    console.log(errors)
    if (!valid) return taroFailureToast('信息不完整')
    handleSubmit()
  })
}
const handleSubmit = () => {
  const params = {
    name: state.name,
    phone: state.phone,
    living: state.estate,
    addr: state.residenceDetail,
    prodName: state.prodName,
    status: '1',
    checkCode: state.sms,
    custMnageName: '郑月梅',
    custManagePhone: '17805949177',
    custManageStaffId: '795596'
  }
  taroShowLoading()
  addLoanApplyRecord(params).then(res => {
    if (res.success) {
      taroHideLoading()
      taroRedirectToPage('/pages/success/success')
    } else {
      taroToast(res.message)
    }
  })
}
queryDictByCodes({ codes: `${POSTER_PROD_DICT},${ESTATE_DICT}` }).then(res => {
  loanProducts.value = res.find(i => i.code === POSTER_PROD_DICT).dictModelList
  if (state.prodName) {
    state.product = loanProducts.value.find(i => i.text === params.prodName).value
  }
  estates.value = res.find(i => i.code === ESTATE_DICT).dictModelList
})
</script>
<style lang="scss">
.loan {
  background-image: url('../../assets/img/background.png');
  background-repeat: no-repeat;
  background-size: 100%;
  min-height: 100vh;
  &-poster {
    width: 300px;
    height: 420px;
  }
  &-content {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    background-color: white;
    padding: 16px;
  }
  .nut-cell-group__wrap {
    box-shadow: none;
  }
}
</style>
