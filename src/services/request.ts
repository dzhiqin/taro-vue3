import HttpRequest from './http'
import config from '@/config/index'
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.prod

const request = new HttpRequest(baseUrl)

export default request
