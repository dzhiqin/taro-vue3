<template>
  <view :class="['my-tag', props.color === 'red' ? 'my-tag-red' : 'my-tag-gold']">
    <slot></slot>
  </view>
</template>
<script setup>
// import { computed } from 'vue'
// import bgTagRed from '@/assets/img/bg-tag-red.png'
// import bgTagGold from '@/assets/img/bg-tag-gold.png'
let props = defineProps({
  color: {
    type: String,
    default: 'gold'
  }
})
// const myTagClass = computed(() => {
//   if (props.color === 'red') {
//     return {
//       backgroundImage: bgTagRed,
//       backgroundRepeat: 'no-repeat',
//       backgroundSize: '100% 100%'
//     }
//   } else {
//     return {
//       backgroundImage: bgTagGold,
//       backgroundRepeat: 'no-repeat',
//       backgroundSize: '100% 100%'
//     }
//   }
// })
</script>
<style>
.my-tag {
  /* background-image: url('../assets/img/bg-tag-gold.png'); */
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 0 10px;
  display: inline-block;
}
.my-tag-red {
  background-image: url('../assets/img/bg-tag-red.png');
}
.my-tag-gold {
  background-image: url('../assets/img/bg-tag-gold.png');
}
</style>
