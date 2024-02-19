<template>
  <view class="busi">
    <nut-swiper
      ref="busiSwiper"
      :pagination-visible="true"
      pagination-color="#426543"
      pagination-unselected-color="#808080"
      @change="onSwiperChange"
      :init-page="currentPage"
      class="busi-swiper"
      auto-play="5000"
      :loop="false"
    >
      <nut-swiper-item>
        <view class="busi-light">
          <my-logo class="margin" :transparent="false" />
          <view class="busi-title margin-top text-center">创业担保贷</view>
          <img
            :src="formatImgUrl('weapp/temp8413035031369413261img-business-loan_1706492587989.png')"
            class="busi-img"
          />
        </view>
        <view class="busi-panel">
          <view class="busi-panel-content"> 政府贴息的创业资金 </view>
        </view>
      </nut-swiper-item>
      <nut-swiper-item>
        <my-logo class="margin" :transparent="false" />
        <view class="busi-content">
          <img
            :src="formatImgUrl('weapp/temp7128568714883897739img-achievement-up_1706496559513.png')"
            class="busi-content-img"
          />
          <view class="busi-content-text"
            >目前创业担保贷贴息政策最高减免2%(以人社局最终审核为准)</view
          >
        </view>
      </nut-swiper-item>
      <nut-swiper-item>
        <my-logo class="margin" :transparent="false" />
        <view class="busi-content margin-lr">
          <view class="busi-content-title">创业担保贷</view>
          <view class="text-gray margin-lr margin-top-xs"
            >请留下您的姓名与电话，我们会在三个工作日内与您联系。</view
          >
          <nut-form
            ref="ruleForm"
            :model-value="state"
            :rules="{
              name: [
                { required: true, message: '请填写姓名' },
                { validator: chineseNameValidator, message: '请输入2个或以上汉字的姓名' }
              ],
              phone: [
                { required: true, message: '请填写手机号' },
                { validator: phoneValidator, message: '' }
              ],
              orgName: [{ required: true, message: '请选择办理网点' }],
              sms: [{ required: true, message: '请填写验证码' }],
              hasBusinessLicence: [{ required: true, message: '请选择办理网点' }],
              hasSocialSecurity: [{ required: true, message: '请选择' }],
              hasDebit: [{ required: true, message: '请选择' }]
            }"
          >
            <nut-form-item label="姓名" prop="name">
              <nut-input
                v-model="state.name"
                class="nut-input-text"
                placeholder="请输入姓名"
                type="text"
                :rules="[
                  { required: true, message: '请填写姓名' },
                  { validator: chineseNameValidator, message: '请输入2个或以上汉字的姓名' }
                ]"
                @blur="blurValidator('name')"
              />
            </nut-form-item>
            <nut-form-item label="手机号" prop="phone">
              <nut-input
                class="nut-input-text"
                placeholder="请输入手机号"
                type="number"
                v-model="state.phone"
                @blur="blurValidator('phone')"
              >
                <template #right>
                  <my-sms-btn :phone="state.phone" type="business" />
                </template>
              </nut-input>
            </nut-form-item>
            <nut-form-item label="验证码" prop="sms">
              <nut-input
                class="nut-input-text"
                placeholder="请输入验证码"
                type="text"
                v-model="state.sms"
              />
            </nut-form-item>
            <nut-form-item v-model="state.address" label="办理网点" prop="orgName">
              <picker mode="selector" @change="onOrgChange" :range="orgRange">
                <my-select-cell>
                  <view class="picker text-black">
                    {{ state.orgName ? state.orgName : '请选择办理网点' }}
                  </view>
                </my-select-cell>
              </picker>
            </nut-form-item>
            <nut-form-item label="是否有营业执照" :label-width="180" prop="hasBusinessLicence">
              <nut-radio-group direction="horizontal" v-model="state.hasBusinessLicence">
                <nut-radio v-for="item in radioOptions" :key="item.value" :label="item.value">{{
                  item.text
                }}</nut-radio>
              </nut-radio-group>
            </nut-form-item>
            <nut-form-item
              label="是否在其他单位缴纳医社保"
              :label-width="180"
              prop="hasSocialSecurity"
            >
              <nut-radio-group direction="horizontal" v-model="state.hasSocialSecurity">
                <nut-radio v-for="item in radioOptions" :key="item.value" :label="item.value">{{
                  item.text
                }}</nut-radio>
              </nut-radio-group>
            </nut-form-item>
            <nut-form-item
              label="您和您的配偶有无未结清的经营贷款或5万元以上的消费类贷款？"
              :label-width="180"
              prop="hasDebit"
            >
              <nut-radio-group direction="horizontal" v-model="state.hasDebit">
                <nut-radio v-for="item in radioOptions" :key="item.value" :label="item.value">{{
                  item.text
                }}</nut-radio>
              </nut-radio-group>
            </nut-form-item>
          </nut-form>
          <view class="margin-tb busi-content-btn">
            <nut-button block color="#2A82E4" @click="onSubmit">提交</nut-button>
          </view>
        </view>
      </nut-swiper-item>
    </nut-swiper>

    <view class="nut-swiper-btn-left" @click="handlePrev">
      <Left></Left>
    </view>
    <view class="nut-swiper-btn-right" @click="handleNext">
      <Right></Right>
    </view>
  </view>
</template>
<script setup>
import { MyLogo, MySmsBtn } from '@/components/index'
import { formatImgUrl, taroToast, taroRedirectToPage } from '@/tools/tools'
import { ref, reactive, computed } from 'vue'
import { Left, Right } from '@nutui/icons-vue-taro'
import { Picker } from '@tarojs/components'
import { chineseNameValidator, phoneValidator } from '@/tools/validator'
import { getAllBranches } from '@/apis/common.api'
import Taro from '@tarojs/taro'
import {
  getBusinessRadioOptions,
  checkBusinessLoanSms,
  submitBusinessLoanForm
} from '@/apis/business.api'
let state = reactive({
  name: '',
  phone: '',
  sms: '',
  orgName: '',
  hasBusinessLicence: '',
  hasSocialSecurity: '',
  hasDebit: '',
  orgId: ''
})
const orgList = ref(['branch1', 'branch2'])
const busiSwiper = ref(null)
const ruleForm = ref(null)
const currentPage = ref(0)
const radioOptions = ref([])
const handlePrev = () => {
  if (currentPage.value === 0) {
    Taro.navigateBack()
  }
  busiSwiper.value.prev()
}
const handleNext = () => {
  busiSwiper.value.next()
}
const onSwiperChange = e => {
  currentPage.value = e
}
const onOrgChange = e => {
  const orgIndex = e.detail.value
  state.orgName = orgList.value[orgIndex].orgName
  state.orgId = orgList.value[orgIndex].orgId
}
const blurValidator = prop => {
  ruleForm.value.validate(prop).then(res => {
    if (!res.valid) {
      console.error(res.errors)
    }
  })
}

const onSubmit = () => {
  ruleForm.value.validate().then(async ({ valid }) => {
    if (valid) {
      const { result, message } = await checkSms()
      if (!result) return taroToast(message)
      handleSubmit()
    }
  })
}
const handleSubmit = () => {
  const params = {
    businessLicense: state.hasBusinessLicence,
    haveMoreFiveLoan: state.hasDebit,
    otherPaySocialSecurity: state.hasSocialSecurity,
    clientName: state.name,
    clientPhone: state.phone,
    sysOrgCode: state.orgId,
    openId: ''
  }
  submitBusinessLoanForm(params).then(res => {
    if (res.code === 200) {
      taroRedirectToPage('/pages/success/success')
    } else {
      taroToast(res.message)
    }
  })
}
const checkSms = () => {
  return new Promise(resolve => {
    checkBusinessLoanSms({ phone: state.phone, vcode: state.sms }).then(res => {
      if (res.code === 200) {
        resolve({ result: true })
      } else {
        resolve({ result: false, message: res.message })
      }
    })
  })
}
getAllBranches().then(res => {
  if (res.code === 200) {
    orgList.value = res.result.map(i => {
      return {
        orgId: i.id,
        orgName: i.departName
      }
    })
  }
})
getBusinessRadioOptions({ dicCode: 'defaultFlag' }).then(res => {
  if (res.code === 200) {
    radioOptions.value = res.result
  } else {
    taroToast('获取选项失败')
  }
})
const orgRange = computed(() => {
  return orgList.value.map(i => i.orgName)
})
</script>
<style lang="scss">
@font-face {
  font-family: 方正粗倩体;
  src: url('../../assets/font/方正粗倩体.TTF');
}
.busi {
  background: linear-gradient(158.26deg, rgba(255, 255, 255, 1) 0%, rgba(255, 87, 51, 1) 100%);
  widows: 100vw;
  min-height: 100vh;
  &-swiper {
    height: 100vh;
  }
  &-title {
    font-family: 方正粗倩体;
    color: #ff8d1a;
    font-size: 60px;
  }
  &-img {
    width: 375px;
    height: 333px;
  }
  &-light {
    background-image: url(../../assets/img/img-light-left.png),
      url(../../assets/img/img-light-right.png);
    background-repeat: no-repeat, no-repeat;
    background-size:
      100% 350px,
      100% 350px;
    background-position:
      0 0,
      0 0;
  }
  &-content {
    box-shadow: 0px 0.6px 12.98px rgba(166, 166, 166, 0.49);
    width: 346px;
    min-height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    background-color: white;
    border-radius: 20px;

    &-title {
      font-size: 24px;
      font-family: 方正粗倩体;
      text-align: center;
      color: #2a82e4;
      margin-top: 16px;
    }
    &-btn {
      width: 200px;
    }
    &-img {
      width: 218px;
      height: 185px;
      margin-top: 78px;
    }
    &-text {
      margin-top: 65px;
      font-size: 18px;
      font-weight: 700;
      color: #2a82e4;
      width: 258px;
      text-align: center;
    }
  }
  &-panel {
    width: 325px;
    margin: auto;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.45);
    box-shadow: 0px 0.6px 12.98px rgba(166, 166, 166, 0.49);
    padding: 20px;
    &-content {
      background-color: white;
      line-height: 80px;
      height: 80px;
      color: #ff8d1a;
      font-size: 24px;
      font-weight: 700;
      text-align: center;
      border-radius: 20px;
    }
  }
  .nut-swiper-btn-left,
  .nut-swiper-btn-right {
    width: 30px;
    height: 40px;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 90%;
  }
  .nut-swiper-btn-left {
    left: 0;
  }
  .nut-swiper-btn-right {
    right: 0;
  }

  .nut-swiper-pagination {
    bottom: 20px;
  }
  .nut-cell-group__wrap {
    box-shadow: none;
  }
}
</style>
