<template>
  <web-view :src="pageUrl"></web-view>
</template>
<script setup>
import { ref } from 'vue'
import { useStore } from '@/stores'

const app = useStore('app')
const pageUrl = ref(app.pageUrl)
</script>
