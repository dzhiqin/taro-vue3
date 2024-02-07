<template>
  <view class="fb">
    <view class="flex align-center justify-center padding-tb-lg">
      <img
        :src="formatImgUrl('weapp/temp3059342963248234473img-feedback_1707011671597.png')"
        class="fb-img"
      />
    </view>
    <my-title class="margin"><view class="text-bold">客户反馈</view></my-title>
    <view class="box-shadow margin">
      <nut-textarea
        v-model="val"
        limit-show
        :max-length="200"
        :disabled="isFly"
        placeholder="请输入您的意见反馈，我们将不断优化改进"
      />
    </view>
    <my-title class="margin"><view class="text-bold">图片上传</view></my-title>
    <nut-uploader
      :disabled="isFly"
      class="margin"
      :url="Config.uploadUrl"
      @success="onUploadSuccess"
      maximum="6"
      v-model:file-list="imgList"
      @file-item-click="onImgClick"
    ></nut-uploader>
    <view class="margin-lg">
      <nut-button type="primary" block @click="onSubmit">{{ isFly ? '返回' : '提交' }}</nut-button>
    </view>
  </view>
  <nut-image-preview
    :show="showPreview"
    :images="previewList"
    :closeable="true"
    @close="handleClose"
  />
  <nut-dialog
    title="是否确定提交？"
    v-model:visible="dialogVisible"
    @cancel="dialogVisible = false"
    @ok="onConfirm"
    :ok-auto-close="false"
    class="relative"
  >
    <template #default>
      <view>
        <img
          :src="requireImage('img-paper-plane.png')"
          :class="['fb-dialog-img', isFly ? 'fly-animation' : '']"
        />
      </view>
    </template>
  </nut-dialog>
</template>
<script setup>
import {
  taroToast,
  // taroFailureToast,
  // taroShowLoading,
  // taroHideLoading,
  formatImgUrl,
  requireImage,
  taroNavigateBack
} from '@/tools/tools'
import Config from '@/config/index'
import { ref } from 'vue'
const showPreview = ref(false)
const imgList = ref([])
const previewList = ref([])
const val = ref('')

const dialogVisible = ref(false)
const isFly = ref(false)
const onSubmit = () => {
  if (isFly.value) {
    taroNavigateBack()
  } else {
    dialogVisible.value = true
  }

  // taroShowLoading()
  // setTimeout(() => {
  //   taroHideLoading()
  // }, 2000)
}
const onConfirm = () => {
  console.log('confirm')
  isFly.value = true
  setTimeout(() => {
    dialogVisible.value = false
    taroToast('提交成功')
    // isFly.value = false
  }, 2000)
}
const onImgClick = ({ fileItem }) => {
  showPreview.value = true
  previewList.value = [{ src: fileItem.path }]
}
const handleClose = () => {
  showPreview.value = false
}
const onUploadSuccess = () => {}
</script>
<style lang="scss">
.relative {
  position: relative;
}
.fb-img {
  width: 261px;
  height: 150px;
}
.fb-dialog-img {
  width: 40px;
  height: 30px;
  position: absolute;
  left: calc(50% - 20px);
  bottom: calc(50% - 15px);
}
.fly-animation {
  animation: fly 3s normal;
}
@keyframes fly {
  from {
    left: 50%;
    bottom: 50%;
  }
  to {
    left: -50px;
    bottom: 200px;
  }
}
</style>
