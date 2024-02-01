<template>
  <nut-button v-show="!busy" type="primary" size="small" @click="handleStart"
    >获取验证码</nut-button
  >
  <nut-button v-show="busy" type="primary" disabled size="small">
    <view class="flex align-center">
      <nut-countdown format="ss" ref="countdown" time="60000" :auto-start="false" @on-end="onEnd" />
      <text>重新获取</text>
    </view>
  </nut-button>
</template>
<script setup>
import { ref } from 'vue'
import { Countdown as NutCountdown } from '@nutui/nutui-taro'
import { phoneNumberRegex } from '@/tools/static'
import { taroToast } from '@/tools/tools'
import { getBusinessLoanSms } from '@/apis/business.api'
import { getUpdatePersonalSms } from '@/services/apis/common.api'
const busy = ref(false)
const props = defineProps({
  phone: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    default: 'business'
  }
})
// const temp = watch(
//   () => props.phone,
//   value => {
//     console.log('watcher phone', value)
//   }
// )
const countdown = ref(null)
const handleStart = () => {
  if (phoneNumberRegex.test(props.phone)) {
    countdown.value.start()
    busy.value = true
    getSms()
  } else {
    taroToast('手机号码格式错误')
  }
}
const getSms = () => {
  if (props.type === 'business') {
    getBusinessLoanSms({ phone: props.phone }).then(res => {
      if (res.code === 200) {
        taroToast('验证码已发送')
      } else {
        taroToast('验证码发送失败')
      }
    })
  } else if (props.type === 'personal') {
    getUpdatePersonalSms({ phone: props.phone }).then(res => {
      if (res.code === 200) {
        taroToast('验证码已发送')
      } else {
        taroToast('验证码发送失败')
      }
    })
  }
}
const onEnd = () => {
  countdown.value.reset()
  busy.value = false
}
</script>
