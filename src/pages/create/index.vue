<template>
  <view>create</view>
  <nut-navbar title="Title" @click-title="onClick" left-show></nut-navbar>
</template>

<script lang="ts" setup>
const onClick = e => {
  console.log(e)
}
</script>

<style lang="scss"></style>
