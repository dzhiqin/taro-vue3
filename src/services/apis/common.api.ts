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
