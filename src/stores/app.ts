import { defineStore } from 'pinia'

const useApp = defineStore({
  id: 'app',
  state: () => ({
    screenLoading: false,
    pageUrl: ''
  }),
  actions: {
    startScreenLoading() {
      this.screenLoading = true
    },
    cancelScreenLoading() {
      this.screenLoading = false
    },
    setPageUrl(url) {
      this.pageUrl = url
    }
  }
})
export { useApp }
