import Taro from '@tarojs/taro'

export const requireImage = imgName => {
  const png = require(`../assets/img/${imgName}`)
  return png
}
export const formatImgUrl = imgName => {
  return 'https://ssrcb.fjnx.com.cn/jcgprodes/proxy/sys/common/staticPreview/' + imgName
}
export const baseTaroToast = (msg: string) => {
  Taro.showToast({
    title: msg,
    icon: 'none'
  })
}
export const successTaroToast = (msg: string) => {
  Taro.showToast({
    title: msg,
    icon: 'success'
  })
}
export const taroNavigateToPage = (path: string) => {
  Taro.navigateTo({ url: path })
}
export const taroRedirectToPage = (path: string) => {
  Taro.redirectTo({ url: path })
}
export const getUserInfoStorage = () => {
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
