<template>
  <view>
    <my-title class="margin"><view class="text-bold">税收声明</view></my-title>
    <nut-form ref="stateForm" :model-value="state" :rules="formRules">
      <nut-form-item label="税收居民类型" :label-width="180" prop="hasSocialSecurity">
        <nut-radio-group direction="horizontal" v-model="state.hasSocialSecurity">
          <nut-radio label="1">是</nut-radio>
          <nut-radio label="0">否</nut-radio>
        </nut-radio-group>
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
  taxType: '',
  birthplace: ''
})
</script>
<style lang="scss"></style>
