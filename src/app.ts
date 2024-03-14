import { createApp } from 'vue'
import Taro from '@tarojs/taro'

import { store, useStore } from '@/stores'
import '@nutui/nutui-taro/dist/style.css'
import './app.scss'
import { wxLogin } from './services/apis/wx.api'

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
        }
      })
    })
  }
})

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
