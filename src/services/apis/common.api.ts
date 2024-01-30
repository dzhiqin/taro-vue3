import request from '../request'
export const idCardOcr = (params: { type: string; filename: string }) => {
  return request.post('/api/pub/ocr/ocrUpload', params)
}
export const getAllBranches = () => {
  return request.get('/sys/bizCommon/getAllBranch')
}
