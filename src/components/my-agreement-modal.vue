<template>
  <nut-dialog :title="props.title" v-model:visible="visible" :close-on-click-overlay="false">
    <template #default>
      <slot></slot>
    </template>
    <template #footer>
      <view>
        <nut-button v-show="busy" type="primary" disabled round>
          <view class="flex align-center">
            <nut-countdown
              format="ss"
              ref="countdown"
              :time="60000"
              :auto-start="false"
              @on-end="onEnd"
            />
            <text>阅读并同意</text>
          </view>
        </nut-button>
        <nut-button v-show="!busy" type="primary" round @click="onOk">阅读并同意</nut-button>
      </view>
    </template>
  </nut-dialog>
</template>
<script setup>
import { ref, watch, nextTick } from 'vue'
const emits = defineEmits(['confirm'])
const busy = ref(false)
const countdown = ref(null)
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '提示'
  },
  duration: {
    type: Number,
    default: 60
  }
})
const visible = ref(props.visible)
watch(
  () => props.visible,
  value => {
    visible.value = value
    if (value) {
      busy.value = true
      nextTick(() => countdown.value?.start())
    }
  }
)
const onOk = () => {
  emits('confirm')
}
const onEnd = () => {
  countdown.value.reset()
  busy.value = false
}
</script>
<style lang="scss">
.nut-dialog__content {
  max-height: 70vh;
}
</style>
