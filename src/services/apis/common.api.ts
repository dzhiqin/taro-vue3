import request from '../request'
export const idCardOcr = (params: { type: string; filename: string }) => {
  return request.post('/api/pub/ocr/ocrUpload', params)
}
export const getAllBranches = () => {
  return request.get('/sys/bizCommon/getAllBranch')
}
export const updatePersonalIdInfo = data => {
  return request.post('/api/person/personInfo/add', {}, data)
}
export const getUpdatePersonalSms = (params: { phone: string }) => {
  return request.post('/api/person/personInfo/getMsg', params)
}
export const getAllLoanProducts = () => {
  return request.post('/api/pub/dict/getDictItems', {}, { dictCode: 'prod_type' })
}
export const getAllEstates = () => {
  return request.post('/api/pub/dict/getDictItems', {}, { dictCode: 'living' })
}
export const getEasySms = (params: { phone: string }) => {
  return request.post('/api/easy/custRegInfo/getMsg', params)
}
export const addLoanApplyRecord = (data: {
  name: string
  phone: string
  living: string
  addr: string
  prodName: string
  status: string
  checkCode: string
  custMnageName: string
  custManagePhone: string
  custManageStaffId: string
}) => {
  return request.post('/api/easy/custRegInfo/add', {}, data)
}
export const devGetAllBranches = () => {
  return request.get('/dev/ssrcb/getAllBranches')
}
export const ssrcbGetUserInfo = () => {
  return request.get('/mock/ssrcb/getUserInfo')
}
