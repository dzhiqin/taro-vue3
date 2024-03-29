import { chineseNameRegex, phoneNumberRegex, idCardRegex, emailRegex } from './static'

export const chineseNameValidator = name => {
  if (chineseNameRegex.test(name)) {
    return Promise.resolve()
  } else {
    return Promise.reject('请输入2个或以上汉字的姓名')
  }
}
export const phoneValidator = phone => {
  if (phoneNumberRegex.test(phone)) {
    return Promise.resolve()
  } else {
    return Promise.reject('请输入正确格式的手机号')
  }
}
export const idNumValidator = idNum => {
  if (idCardRegex.test(idNum)) {
    return Promise.resolve()
  } else {
    return Promise.reject('请输入正确格式的证件号')
  }
}
export const emailValidator = email => {
  if (emailRegex.test(email)) {
    return Promise.resolve()
  } else {
    return Promise.reject('请输入正确格式的电子邮箱')
  }
}
