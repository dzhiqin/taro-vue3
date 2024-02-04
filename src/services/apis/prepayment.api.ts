import request from '../request'

export const getPrepaymentApplyRecord = (data: { applyOpenId: string }) => {
  return request.post('/prepayment/prePayment/getApplyRecord', {}, data)
}
export const addPrepaymentApplyRecord = (data: {
  code: string
  applyOpenId: string
  accountType: string
  appointmentTime: string
  enterpriseName: string
  applyName: string
  applyMobile: string
  reason: string
  prePaymentSum: number
}) => {
  return request.post('/prepayment/prePayment/add', {}, data)
}
