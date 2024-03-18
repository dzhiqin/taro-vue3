<template>
  <div class="branch">
    <nut-cell
      v-for="(item, index) in list"
      :key="index"
      size="large"
      :title="item.name"
      :sub-title="item.address"
      is-link
      @click="handleClick(item)"
    ></nut-cell>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { branchList } from './mockdata.js'
import Taro from '@tarojs/taro'

const list = ref(branchList)
const handleClick = item => {
  console.log('click', item)
  Taro.openLocation({
    latitude: Number(item.latitude),
    longitude: Number(item.longitude),
    name: item.name,
    address: item.address,
    scale: 18
  })
}
</script>
<style lang="scss">
.branch {
  padding: 16px;
}
</style>
