import request from '../request'

export const code2Session = (data: { code: string }) => {
  return request.post('/wxapi/wx/login', {}, data)
}
export const wxLogin = (data: { code: string }) => {
  return request.get('/ssrcb/v1/api/wx/authorizations/callBack', data)
}
