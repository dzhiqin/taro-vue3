import { defineStore } from 'pinia'

interface UserInfoProp {
  nickName: string
  avatarUrl: string
  openId: string
  id: string
  managerId: string
  managerName: string
  managerDept: string
  latitude: string
  longitude: string
  name: string
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
