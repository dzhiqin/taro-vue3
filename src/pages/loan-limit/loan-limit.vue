<template>
  <view class="citizen-loan-limit">
    <my-navigator title="测算额度" />
    <my-logo class="margin"></my-logo>
    <view class="citizen-content">
      <my-title><view class="text-bolder">请上传身份证正反面，确保照片清晰完整</view></my-title>
      <view class="flex justify-around margin-top">
        <my-id-uploader size="back" @ocrResult="onOcrResult" />
        <my-id-uploader @ocrResult="onOcrResult" />
      </view>
      <view class="margin-top text-center">
        <img
          :src="formatImgUrl('weapp/temp7753166143815885868img-id-example_1706240660023.png')"
          class="id-example"
        />
      </view>
      <my-title><view class="text-bolder margin-top">详细信息</view></my-title>
      <nut-form>
        <nut-form-item label="姓名">
          <nut-input
            v-model="state.name"
            class="nut-input-text"
            placeholder="请输入姓名"
            type="text"
          />
        </nut-form-item>
        <nut-form-item label="年龄">
          <nut-input
            v-model="state.age"
            class="nut-input-text"
            placeholder="请输入年龄"
            type="text"
          />
        </nut-form-item>
        <nut-form-item label="联系电话">
          <nut-input
            v-model="state.tel"
            class="nut-input-text"
            placeholder="请输入联系电话"
            type="text"
          />
        </nut-form-item>
        <nut-form-item v-model="state.address" label="地址">
          <nut-input class="nut-input-text" placeholder="请输入地址" type="text" />
        </nut-form-item>
        <nut-form-item label="是否缴纳社保或公积金" :label-width="180">
          <nut-radio-group direction="horizontal" v-model="state.isSocialSecurity">
            <nut-radio label="1">是</nut-radio>
            <nut-radio label="2">否</nut-radio>
          </nut-radio-group>
        </nut-form-item>
        <nut-form-item label="是否在当地经商或创业" :label-width="180">
          <nut-radio-group direction="horizontal" v-model="state.isSocialSecurity">
            <nut-radio label="1">是</nut-radio>
            <nut-radio label="2">否</nut-radio>
          </nut-radio-group>
        </nut-form-item>
        <nut-form-item label="是否在泉州有固定资产" :label-width="180">
          <nut-radio-group direction="horizontal" v-model="state.isSocialSecurity">
            <nut-radio label="1">是</nut-radio>
            <nut-radio label="2">否</nut-radio>
          </nut-radio-group>
        </nut-form-item>
        <nut-form-item v-model="state.address" label="客户经理工号">
          <nut-input class="nut-input-text" placeholder="请输入地址" type="text" />
        </nut-form-item>
        <nut-form-item v-model="state.address" label="推荐人工号">
          <nut-input class="nut-input-text" placeholder="请输入地址" type="text" />
        </nut-form-item>
        <nut-form-item v-model="state.address" label="现居住地">
          <picker mode="region" @change="onChange" :value="selectedRegion">
            <view class="picker text-black"> {{ selectedRegion.join('') }} </view>
          </picker>
        </nut-form-item>
        <nut-form-item v-model="state.address" label="详细地址">
          <nut-input class="nut-input-text" placeholder="请输入地址" type="text" />
        </nut-form-item>
        <nut-form-item v-model="state.address" label="手机号">
          <nut-input class="nut-input-text" placeholder="请输入手机号" type="number">
            <template #right>
              <nut-button type="primary" size="small">获取验证码</nut-button>
            </template>
          </nut-input>
        </nut-form-item>
        <nut-form-item v-model="state.address" label="验证码">
          <nut-input class="nut-input-text" placeholder="请输入验证码" type="text" />
        </nut-form-item>
      </nut-form>
    </view>
    <my-sms-btn phone="15900099908" />
  </view>
</template>
<script setup>
import { MyIdUploader, MyTitle, MyLogo, MyNavigator, MySmsBtn } from '@/components/index'
import { formatImgUrl } from '@/tools/tools'
import { reactive, ref } from 'vue'
import { Picker } from '@tarojs/components'
const state = reactive({
  id: '',
  name: '',
  age: '',
  tel: '',
  address: '',
  isSocialSecurity: false
})
const selectedRegion = ref(['福建省', '泉州市', '石狮市'])
const onOcrResult = e => {
  console.log('ocr res', e)
}
</script>
<style lang="scss">
.citizen-loan-limit {
  background-image: url('../../assets/img/background.png');
  background-repeat: no-repeat;
  background-size: 100%;
  min-height: 100vh;
  .citizen {
    &-content {
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      background-color: white;
      // margin-top: 20px;
      padding: 16px;
    }
  }
  .id-example {
    width: 298px;
    height: 58px;
    margin: auto;
  }
  .nut-cell-group__wrap {
    box-shadow: none;
  }
}
</style>
