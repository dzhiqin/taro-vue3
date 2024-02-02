import request from '../request'
export const addCitizenLoanLimitApply = (data: {
  name: string
  idcard: string
  phone: string
  sex: string
  addr: string
  checkCode: string
  isWork: '0' | '1'
  isMerchant: '0' | '1'
  isHouse: '0' | '1'
  custManageStaffId: string
  recommendId: string
  living: string
  source: string
  wxid: string
  wxname: string
  wximg: string
}) => {
  return request.post('/api/newCitizen/newCitizenRegInfo/add', {}, data)
}
