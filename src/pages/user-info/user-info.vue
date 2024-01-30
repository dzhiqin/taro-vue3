<template>
  <view class="user">
    <my-navigator title="编辑资料" />
    <view class="user-content">
      <view class="user-content-header">
        <img :src="avatarUrl" class="user-content-avatar margin-top" />
        <button
          class="user-content-header-btn"
          open-type="chooseAvatar"
          :onChooseavatar="onChooseAvatar"
        >
          修改头像
        </button>
      </view>
      <view class="margin-lr">
        <view>昵称</view>
        <view class="user-cell">
          <input
            :value="nickName"
            type="nickname"
            class="user-cell-input"
            placeholder="请输入昵称"
            :onBlur="changeNickName"
          />
        </view>
      </view>
      <view class="user-btns">
        <nut-button type="info" block @click="handleSave">保存</nut-button>
      </view>
    </view>
  </view>
</template>
<script setup>
import { MyNavigator } from '@/components/index'
import { ref } from 'vue'
import Taro from '@tarojs/taro'
import { setNickNameStorage, setAvatarUrlStorage, successTaroToast } from '@/tools/tools'

const userInfo = Taro.getStorageSync('USER_INFO')
const avatarUrl = ref(userInfo.avatarUrl ? userInfo.avatarUrl : '')
const nickName = ref(userInfo.nickName ? userInfo.nickName : '微信用户')
const onChooseAvatar = e => {
  const url = e.detail.avatarUrl
  avatarUrl.value = url
  setAvatarUrlStorage(url)
}
const changeNickName = e => {
  const name = e.detail.value
  nickName.value = name
  setNickNameStorage(name)
}
const handleSave = () => {
  successTaroToast('保存成功')
}
</script>
<style lang="scss">
.user {
  background-image: url('../../assets/img/background.png');
  background-repeat: no-repeat;
  background-size: 100%;
  min-height: 100vh;
  &-btns {
    padding: 100px 40px 20px;
  }
  &-cell {
    background-color: #faf9f8;
    border-radius: 10px;
    height: 50px;
    line-height: 50px;
    display: flex;
    align-items: center;
    &-input {
      height: 40px;
      line-height: 40px;
      margin-left: 8px;
    }
  }
  &-content {
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    background-color: white;
    margin-top: 50px;
    &-header {
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &-btn {
        width: 100px;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        margin-top: 16px;
      }
    }
    &-avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background-image: url('../../assets/img/img-weapp-avatar.png');
      background-repeat: no-repeat;
      background-size: contain;
    }
  }
}
</style>
