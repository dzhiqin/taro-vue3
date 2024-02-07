<template>
  <view>
    <my-title class="margin"><view class="text-bold">贷款谈话记录</view></my-title>
    <nut-form ref="stateForm" :model-value="state" :rules="formRules">
      <nut-form-item
        label="1、申请人是否已经确保提交给贷款人有关证明资料、委托手续是真实、合法、有效的，并已经确知任何欺诈、违约行为均要承担相应的法律责任？"
        label-position="top"
        prop="state1"
      >
        <nut-radio-group direction="horizontal" v-model="state.state1">
          <nut-radio label="1">是</nut-radio>
          <nut-radio label="0">否</nut-radio>
        </nut-radio-group>
      </nut-form-item>
      <nut-form-item
        label="2、申请人有无从事赌博、吸毒、购买“六合彩”、洗钱等违法行为？"
        label-position="top"
        prop="state2"
      >
        <nut-radio-group direction="horizontal" v-model="state.state2">
          <nut-radio label="1">是</nut-radio>
          <nut-radio label="0">否</nut-radio>
        </nut-radio-group>
      </nut-form-item>
      <nut-form-item label="3、申请人是否有重大不良信用记录？" label-position="top" prop="state3">
        <nut-radio-group direction="horizontal" v-model="state.state3">
          <nut-radio label="1">是</nut-radio>
          <nut-radio label="0">否</nut-radio>
        </nut-radio-group>
      </nut-form-item>
      <nut-form-item
        label="4、经查如发现重大不良信用记录者，一律不予受理贷款，现是否清楚？"
        label-position="top"
        prop="state4"
      >
        <nut-radio-group direction="horizontal" v-model="state.state4">
          <nut-radio label="1">是</nut-radio>
          <nut-radio label="0">否</nut-radio>
        </nut-radio-group>
      </nut-form-item>
      <nut-form-item
        label="5、申请人贷款后，贷款人有权对借款人所借资金的使用情况进行了解取证，如果发现借款资金被挪用或其他违反合同约定的情况，贷款人有权单方面提前解除借款合同，收回贷款或选择其他处理方式，以上情况是否知道？"
        label-position="top"
        prop="state5"
      >
        <nut-radio-group direction="horizontal" v-model="state.state5">
          <nut-radio label="1">是</nut-radio>
          <nut-radio label="0">否</nut-radio>
        </nut-radio-group>
      </nut-form-item>
    </nut-form>
    <view class="flex-column margin-lg">
      <nut-button type="primary" @click="onNext">开始签署</nut-button>
      <nut-button plain type="primary" @click="onPrev">上一步</nut-button>
    </view>
  </view>
</template>
<script setup>
import { reactive } from 'vue'
const props = defineProps({
  current: Number
})
const emits = defineEmits(['change'])
const onPrev = () => {
  emits('change', { page: props.current - 1 })
}
const onNext = () => {
  emits('onNext')
}
const state = reactive({
  state1: '',
  state2: '',
  state3: '',
  state4: '',
  state5: ''
})
</script>
<style lang="scss"></style>
