<template>
  <view>create</view>
  <nut-navbar title="Title" @click-title="onClick" left-show></nut-navbar>
  <welcome />
</template>

<script lang="ts" setup>
// import welcome from '@/components/welcome.vue'
const onClick = e => {
  console.log(e)
}
</script>

<style lang="scss"></style>
