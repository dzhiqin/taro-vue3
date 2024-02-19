<template>
  <view>
    <my-title class="margin"><view class="text-bold">税收声明</view></my-title>
    <nut-form ref="taxStateForm" :model-value="taxState" :rules="formRules">
      <nut-form-item label="税收居民类型" prop="taxType" :label-width="110">
        <picker
          mode="selector"
          :range="TaxTypeOptions.map(i => i.text)"
          @change="onPickerChange"
          :value="taxState.taxType"
        >
          <my-select-cell>
            <view class="text-black">
              {{ TaxTypeOptions.find(i => i.value === taxState.taxType)?.text || '请选择类型' }}
            </view>
          </my-select-cell>
        </picker>
      </nut-form-item>
      <view v-show="!isChineseTax">
        <nut-form-item label="出生地" prop="birthplace" required="">
          <nut-input
            v-model="taxState.birthplace"
            class="nut-input-text"
            placeholder="请填写出生地"
            type="text"
          >
            <template #right>
              <nut-button size="mini" type="info" @click="updateAddress">同户籍</nut-button>
            </template>
          </nut-input>
        </nut-form-item>
        <nut-form-item
          label="是否能提供税收居民国(地区)及纳税人识别号"
          prop="hasTaxCode"
          label-position="top"
          required
        >
          <nut-radio-group direction="horizontal" v-model="taxState.hasTaxCode">
            <nut-radio v-for="item in YesNoOptions" :key="item.value" :label="item.value">
              {{ item.text }}
            </nut-radio>
          </nut-radio-group>
        </nut-form-item>
        <nut-form-item
          v-show="taxCodeUnable"
          label="无法提供理由"
          prop="noTaxCodeReason"
          :label-width="110"
          required
        >
          <picker
            mode="selector"
            :range="NoTaxCodeReasonOptions.map(i => i.text)"
            @change="onReasonChange"
            :value="taxState.noTaxCodeReason"
          >
            <my-select-cell>
              <view class="text-black">
                {{
                  NoTaxCodeReasonOptions.find(i => i.value === taxState.noTaxCodeReason)?.text ||
                  '请选择类型'
                }}
              </view>
            </my-select-cell>
          </picker>
        </nut-form-item>
        <nut-form-item
          label="具体原因"
          prop="reason"
          :label-width="110"
          v-show="taxCodeUnable && taxState.noTaxCodeReason === '2'"
          required
        >
          <nut-input
            class="nut-input-text"
            v-model="taxState.reason"
            type="text"
            :border="false"
            placeholder="请解释具体原因"
          />
        </nut-form-item>
        <nut-form-item
          v-show="taxCodeEnable"
          v-for="(item, index) in taxState.taxCodes"
          :key="item.key"
          :label="'供税收居民国(地区)及纳税人识别号 ' + (index + 1)"
          :prop="'taxCodes.' + index + '.value'"
          required
          :rules="[{ required: true, message: '请填写识别号 ' + (index + 1) }]"
          label-position="top"
        >
          <nut-input
            class="nut-input-text"
            v-model="item.value"
            :placeholder="'请输入识别号 ' + (index + 1)"
            type="text"
          />
        </nut-form-item>
        <view class="margin-lr-sm">
          <nut-button v-if="showAddBtn" size="small" @click="addTaxCode">添加识别号</nut-button>
          <nut-button v-if="showRemoveBtn" size="small" @click="removeTaxCode"
            >删除识别号</nut-button
          >
        </view>
      </view>
    </nut-form>
    <view class="flex justify-between margin-lg">
      <nut-button plain type="primary" @click="onPrev">上一步</nut-button>
      <nut-button type="primary" @click="onNext">下一步</nut-button>
    </view>
  </view>
</template>
<script setup>
import { reactive, computed, ref } from 'vue'
import Taro from '@tarojs/taro'
import { TaxTypeOptions, YesNoOptions, NoTaxCodeReasonOptions } from '@/tools/static'
import { taroFailureToast } from '@/tools/tools'
const taxStateForm = ref(null)
const taxStateTemp = Taro.getStorageSync('taxStateForm') || null
const taxState = reactive(
  taxStateTemp
    ? taxStateTemp
    : {
        taxType: '2',
        birthplace: '',
        hasTaxCode: '',
        taxCodes: [{ key: Date.now(), value: '' }],
        noTaxCodeReason: '',
        reason: ''
      }
)
const birthplaceValidator = birthplace => {
  if (isChineseTax.value) {
    return Promise.resolve()
  }
  if (!birthplace) {
    return Promise.reject('请填写出生地')
  } else {
    return Promise.resolve()
  }
}
const hasTaxCodeValidator = hasTaxCode => {
  if (isChineseTax.value) {
    return Promise.resolve()
  }
  if (!hasTaxCode) {
    return Promise.reject('请选择是否提供识别号')
  } else {
    return Promise.resolve()
  }
}
const reasonValidator = reason => {
  if (isChineseTax.value || taxState.noTaxCodeReason === '1') {
    return Promise.resolve()
  }
  if (!reason) {
    return Promise.reject('请解释具体原因')
  } else {
    return Promise.resolve()
  }
}
const formRules = {
  taxType: [{ required: true, message: '请选择类型' }],
  birthplace: [{ validator: birthplaceValidator, message: '请填写出生地' }],
  hasTaxCode: [{ validator: hasTaxCodeValidator, message: '请选择是否提供识别号' }],
  reason: [{ validator: reasonValidator, message: '请填写具体原因' }]
}
const loanPersonTemp = Taro.getStorageSync('loanPersonForm') || null
const updateAddress = () => {
  if (!loanPersonTemp) return
  taxState.birthplace = loanPersonTemp.address
}
const taxCodeEnable = computed(() => {
  return taxState.hasTaxCode === '1'
})
const taxCodeUnable = computed(() => {
  return taxState.hasTaxCode === '0'
})
const showAddBtn = computed(() => {
  return taxCodeEnable.value && taxState.taxCodes.length < 3
})
const showRemoveBtn = computed(() => {
  return taxCodeEnable.value && taxState.taxCodes.length > 1
})
const isChineseTax = computed(() => {
  return taxState.taxType === '1'
})
const props = defineProps({
  current: Number
})
const emits = defineEmits(['change'])

const addTaxCode = () => {
  taxState.taxCodes.push({
    key: Date.now(),
    value: ''
  })
}
const removeTaxCode = () => {
  taxState.taxCodes.pop()
}
const onPickerChange = e => {
  const index = e.detail.value
  taxState.taxType = TaxTypeOptions[index].value
}
const onReasonChange = e => {
  const index = e.detail.value
  taxState.noTaxCodeReason = NoTaxCodeReasonOptions[index].value
}
const onPrev = () => {
  emits('change', { page: props.current - 1 })
}
const onNext = () => {
  console.log('next', taxState)
  taxStateForm.value.validate().then(({ valid, errors }) => {
    if (valid) {
      emits('change', { page: props.current + 1 })
      Taro.setStorageSync('taxStateForm', taxState)
    } else {
      console.log(errors)
      taroFailureToast('请按要求填完整信息再提交')
    }
  })
}
</script>
<style lang="scss"></style>
