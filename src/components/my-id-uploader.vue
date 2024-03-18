<template>
  <view class="my-id-uploader">
    <nut-uploader
      :url="Config.uploadUrl"
      @success="uploadSuccess"
      maximum="1"
      v-model:file-list="imgList"
    >
      <view v-if="imgTemp">
        <img
          :src="formatUploaderFileUrl(imgTemp)"
          class="my-id-uploader-img"
          @click="handleShowPreview"
        />
        <circle-close class="my-close" @click="handleClear" />
      </view>

      <img
        v-else
        :src="
          formatImgUrl(
            isBack
              ? 'weapp/temp2866375793510845989img-idcard-back2x_1706174645697.png'
              : 'weapp/temp3961744209026605584img-idcard-front2x_1706234260027.png'
          )
        "
        class="my-id-uploader-img"
      />
    </nut-uploader>
    <view v-if="isError" class="text-sm text-red text-center">{{ errMsg }}</view>
    <view v-else class="text-sm text-center">{{ isBack ? '反面' : '正面' }}</view>
    <nut-image-preview
      :show="showPreview"
      :images="previewList"
      :closeable="true"
      @close="handleClose"
    />
  </view>
</template>
<script setup>
import Config from '@/config/index'
import {
  formatUploaderFileUrl,
  formatImgUrl,
  taroShowLoading,
  taroHideLoading
} from '@/tools/tools'
import { Uploader as NutUploader, ImagePreview as NutImagePreview } from '@nutui/nutui-taro'
import { ref } from 'vue'
import { CircleClose } from '@nutui/icons-vue-taro'
import { idCardOcr } from '@/services/apis/common.api'
const props = defineProps({
  size: String
})
const emits = defineEmits(['ocrResult'])
const isBack = ref(props.size === 'back')
const previewList = ref([])
const imgList = ref([])
const imgTemp = ref('')
const showPreview = ref(false)
const isError = ref(false)
const errMsg = ref('')
const uploadSuccess = e => {
  const { data } = e.data
  const result = JSON.parse(data)
  imgTemp.value = result.message
  previewList.value = [{ src: formatUploaderFileUrl(imgTemp.value) }]
  handleOcr()
}
const handleOcr = () => {
  taroShowLoading()
  idCardOcr({
    type: isBack.value ? '2' : '1',
    filename: imgTemp.value
  }).then(res => {
    taroHideLoading()
    // console.log('ocr = ', res)
    if (res.code === 400) {
      isError.value = true
      errMsg.value = isBack.value ? '背面扫描失败，请重新上传' : '正面扫描失败，请重新上传'
      emits('ocrResult', { result: false, message: errMsg.value })
    }
    if (res.code === 200) {
      // props.ocrResult(res.data)
      errMsg.value = ''
      emits('ocrResult', {
        result: true,
        message: 'success',
        data: { ...res.data, temp: imgTemp.value }
      })
    }
  })
}

const handleShowPreview = () => {
  showPreview.value = true
}
const handleClose = () => {
  showPreview.value = false
}
const handleClear = () => {
  imgTemp.value = ''
  imgList.value = []
}
</script>
<style>
.my-id-uploader-img {
  width: 150px;
  height: 98px;
}
.my-close {
  top: -5px;
  right: -5px;
  position: absolute;
}
</style>
