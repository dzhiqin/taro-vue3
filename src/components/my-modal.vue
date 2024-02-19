<template>
  <nut-dialog :title="props.title" v-model:visible="visible" @cancel="onCancel" @ok="onOk">
    <template #default>
      <slot></slot>
    </template>
  </nut-dialog>
</template>
<script setup>
import { ref, watch } from 'vue'
const emits = defineEmits(['change'])
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '提示'
  }
})
watch(
  () => props.visible,
  value => {
    visible.value = value
  }
)
const visible = ref(props.visible)
const onCancel = () => {
  emits('change', { visible: false })
}
const onOk = () => {
  emits('change', { visible: false })
}
</script>
<style></style>
