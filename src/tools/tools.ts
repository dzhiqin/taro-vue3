import Taro from '@tarojs/taro'
import { getCurrentInstance } from 'vue'
import config from '@/config'
export const requireImage = imgName => {
  const png = require(`../assets/img/${imgName}`)
  return png
}
export const formatImgUrl = imgName => {
  return config.publicImgPreviewUrl + imgName
}
export const formatUploaderFileUrl = name => {
  return config.uploaderPreviewUrl + name
}
export const taroToast = (msg: string) => {
  Taro.showToast({
    title: msg,
    icon: 'none'
  })
}
export const taroSuccessToast = (msg: string) => {
  Taro.showToast({
    title: msg,
    icon: 'success'
  })
}
export const taroShowLoading = (msg: string) => {
  Taro.showLoading({
    title: msg || '加载中'
  })
}
export const taroFailureToast = (msg: string) => {
  Taro.showToast({
    title: msg,
    icon: 'error'
  })
}
export const taroHideLoading = () => {
  Taro.hideLoading()
}
export const taroNavigateToPage = (path: string) => {
  Taro.navigateTo({ url: path })
}
export const taroNavigateBack = () => {
  Taro.navigateBack()
}
export const taroRedirectToPage = (path: string, params?: any) => {
  Taro.redirectTo({ url: path })
}
export const getUserInfoStorageSync = () => {
  return Taro.getStorageSync('USER_INFO')
}
export const setAvatarUrlStorage = url => {
  const userInfo = Taro.getStorageSync('USER_INFO')
  Taro.setStorage({ key: 'USER_INFO', data: { ...userInfo, avatarUrl: url } })
}
export const setNickNameStorage = name => {
  const userInfo = Taro.getStorageSync('USER_INFO')
  Taro.setStorage({ key: 'USER_INFO', data: { ...userInfo, nickName: name } })
}
export const taroGetParams = () => {
  return Taro.getCurrentInstance()?.router.params
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
export const humanDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}
export const humanDateAndTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  const dateStr = [year, month, day].map(formatNumber).join('-')
  const timeStr = [hours, minutes, seconds].map(formatNumber).join(':')
  return dateStr + ' ' + timeStr
}
export const isStartWith = (key, str) => {
  const reg = new RegExp('^' + key)
  return reg.test(str)
}
