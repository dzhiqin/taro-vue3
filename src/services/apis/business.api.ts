import request from '../request'
export const getBusinessRadioOptions = (params: { dicCode: string }) => {
  return request.get('/sys/bizCommon/queryEnableDictItemsByCode', params)
}
export const getBusinessLoanSms = (params: { phone: string }) => {
  return request.post('/loan/loanBusinessGuarantee/getMsg', params)
}
export const checkBusinessLoanSms = (params: { phone: string; vcode: string }) => {
  return request.post('/loan/loanBusinessGuarantee/checkMsg', params)
}
export const submitBusinessLoanForm = (data: {
  businessLicense: boolean
  haveMoreFiveLoan: boolean
  otherPaySocialSecurity: boolean
  clientName: string
  clientPhone: string
  sysOrgCode: string
  openId: string
}) => {
  return request.post('/loan/loanBusinessGuarantee/add', {}, data)
}
