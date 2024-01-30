<template>
  <img :src="props.transparent ? logo : logo2" class="my-logo" />
</template>
<script setup>
import logo from '@/assets/img/logo-ssrcb.png'
import logo2 from '@/assets/img/logo-ssrcb2.png'
const props = defineProps({
  transparent: {
    type: Boolean,
    default: true
  }
})
</script>
<style>
.my-logo {
  width: 164px;
  height: 33px;
}
</style>
