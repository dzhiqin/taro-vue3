import { defineStore } from 'pinia'

interface UserInfoProp {
  nickName: string
  avatarUrl: string
  openId: string
}

const useAuth = defineStore({
  id: 'authInfo',
  state: () => ({
    userInfo: {
      nickName: '',
      avatarUrl: ''
    },
    isLogin: false
  }),
  actions: {
    login() {
      this.isLogin = true
    },
    logout() {
      this.isLogin = false
    },
    setUserInfo(userInfo: UserInfoProp) {
      this.userInfo = Object.assign(this.userInfo, userInfo)
    }
  }
})
export { useAuth }
