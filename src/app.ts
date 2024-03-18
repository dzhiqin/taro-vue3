import { createApp } from 'vue'
import Taro from '@tarojs/taro'

import { store, useStore } from '@/stores'
import '@nutui/nutui-taro/dist/style.css'
import './app.scss'
import { wxLogin } from './services/apis/wx.api'
import { ssrcbGetUserInfo } from '@/services/apis/common.api'
const App = createApp({
  onShow() {},
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
  onLaunch() {
    console.log('onLaunch')
    Taro.login().then(res => {
      const { code } = res
      wxLogin({ code }).then(loginRes => {
        if (loginRes.code === 200) {
          const openId = loginRes.message
          auth.setUserInfo({ openId })
          auth.login()
          getUserInfo(openId)
        }
      })
    })
  }
})
const getUserInfo = openId => {
  auth.setUserInfo({
    name: '范娟',
    id: 'EfFdD70A-5b8f-FD8b-19c3-16EA9dc8dD81',
    managerId: '900',
    managerName: '武超',
    avatarUrl:
      'https://img12.360buyimg.com/imagetools/jfs/t1/196430/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png',
    managerDept: '服装城支行',
    branchLongitude: '118.616623',
    branchLatitude: '24.73376',
    nickName: '微信用户',
    branchAddress: '福建省泉州市石狮市服装城百灵街13-19号'
  })
  // ssrcbGetUserInfo({ openId }).then(res => {
  //   console.log('user info', res)
  //   if (res.code === 200) {
  //     auth.setUserInfo(res.data)
  //   }
  // })
}
App.use(store)

const auth = useStore('auth')
// const app = useStore('app')

// const token = Taro.getStorageSync('token')
// if (!token) {
//   auth.logout()
// } else {
//   app.startScreenLoading()
//   setTimeout(() => {
//     auth.setUserInfo({
//       nickName: '林qwe',
//       avatarUrl:
//         'https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png'
//     })
//     auth.login()
//     app.cancelScreenLoading()
//   }, 500)
// }

export default App
