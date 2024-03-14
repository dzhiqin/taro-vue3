<template>
  <web-view :src="state.webviewPath" @message="handleMessage"></web-view>
</template>
<script setup>
import { reactive } from 'vue'
import Taro from '@tarojs/taro'
import { taroGetParams } from '@/tools/tools'
const { facePageUrl } = taroGetParams()
const state = reactive({
  webviewPath: '',
  faceWebviewPath: '/pages/face-webview/face-webview'
})
const handleMessage = msgData => {
  console.log('handleMessage')
  const receiveH5PageData = msgData.detail.data[0]
  bestSignFaceUtils._jumpFaceMiniProgram(receiveH5PageData)
}
// 上上签刷脸工具类
const bestSignFaceUtils = {
  // 初始化 web-view 的路径
  _initWebviewPath(facePageUrl) {
    if (facePageUrl) {
      // webview 页面初始化时，获取从业务页面传递过来的数据
      // 比如：xxx?name=test&facePageUrl=https://ent.bestsign.cn 获取的是 facePageUrl 的值 https://ent.bestsign.cn
      this.setState({
        webviewPath: decodeURIComponent(facePageUrl)
      })
    }
  },
  // 处理一些跳转上上签刷脸小程序的参数 不可变动
  _handleParams(receiveH5PageData) {
    const sceneVersion = bestSignFaceUtils._getBestSignSceneVersion(receiveH5PageData)
    if (sceneVersion === 'BestSignProVersion') {
      // 如果是旗舰版
      // 上上签刷脸小程序需要的参数
      const ssqParams = receiveH5PageData.ssqFaceQuery
      console.log('刷脸小程序需要的参数:', decodeURIComponent(ssqParams))
      // 上上签 H5 页面对应的webview路径，需要主动跳回
      let webviewContentUrl = receiveH5PageData.ssqPageUrl
      console.log('上上签页面对应的webview路径:', decodeURIComponent(webviewContentUrl))
      // url编码的webview路径
      webviewContentUrl = encodeURIComponent(webviewContentUrl)
      return {
        ssqParams,
        webviewContentUrl
      }
    }
    // 上上签刷脸小程序需要的参数
    const ssqParams = receiveH5PageData.ssqParams
    console.log('刷脸小程序需要的参数:', decodeURIComponent(ssqParams))
    // 上上签 H5 页面对应的webview路径，需要主动跳回
    const webviewContentUrl = receiveH5PageData.ssqPageUrl
    console.log('上上签页面对应的webview路径:', decodeURIComponent(webviewContentUrl))
    return {
      ssqParams,
      webviewContentUrl
    }
  },
  // 获取当前刷脸的场景
  _getBestSignSceneVersion(receiveH5PageData) {
    const messageType = receiveH5PageData.messageType
    if (messageType === 'face') {
      // 旗舰版
      return 'BestSignProVersion'
    } else if (messageType === 'ssqFace') {
      // 工具版
      return 'BestSignOpenApiVersion'
    }
  },
  // 是否为上上签刷脸类型的H5消息
  _isBestSignFaceType(receiveH5PageData) {
    const messageType = receiveH5PageData.messageType
    console.log('消息类型:', messageType)
    // 判断messageType为ssqFace或者face时，需要跳转上上签刷脸小程序
    return messageType === 'ssqFace' || messageType === 'face'
  },
  // 跳转至上上签刷脸小程序
  _jumpFaceMiniProgram(receiveH5PageData) {
    const isBestSignFaceType = bestSignFaceUtils._isBestSignFaceType.call(this, receiveH5PageData)
    if (!isBestSignFaceType) return
    const { ssqParams, webviewContentUrl } = bestSignFaceUtils._handleParams.call(
      this,
      receiveH5PageData
    )
    const sceneVersion = bestSignFaceUtils._getBestSignSceneVersion(receiveH5PageData)
    let path = `index/index?${ssqParams}` //默认为工具版路径
    if (sceneVersion === 'BestSignProVersion') {
      path = `index/index?ssqFaceQuery=${ssqParams}` // 旗舰版路径
    }
    Taro.showModal({
      title: '提示',
      content: '请点击“确定”跳到新的小程序完成刷脸',
      success: res => {
        if (res.confirm) {
          Taro.navigateToMiniProgram({
            appId: 'wx6dd34865858963a5', // 上上签刷脸小程序appId, 不可更改
            path, // 约定参数，不可更改
            envVersion: 'release', // 使用正式版，不可更改
            success: () => {
              Taro.showModal({
                title: '提示',
                content: '是否已经完成刷脸',
                success: res => {
                  if (res.confirm) {
                    Taro.navigateTo({
                      url: `${this.state.faceWebviewPath}?facePageUrl=${webviewContentUrl}`
                    })
                  }
                }
              })
            },
            fail: err => {
              console.log(err)
            }
          })
        } else if (res.cancel) {
          Taro.navigateTo({
            url: `${this.state.faceWebviewPath}?facePageUrl=${webviewContentUrl}`
          })
        }
      }
    })
  }
}
bestSignFaceUtils._initWebviewPath(facePageUrl)
</script>
