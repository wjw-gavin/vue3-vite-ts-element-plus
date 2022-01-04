/* eslint-disable */
import { isEmail, isIdCard, isPhone, isCarNumber, isTaxNo } from './validation'

const ElValidator = {
  isEmail(required = true, msg = '请输入邮箱') {
    const validEmail = (rule, value, callback) => {
      if (required) {
        if (!value) {
          callback(new Error(msg))
        } else if (!isEmail(value)) {
          callback(new Error('请输入正确的邮箱地址'))
        } else {
          callback()
        }
      } else {
        if (!value) {
          callback()
        } else if (!isEmail(value)) {
          callback(new Error('请输入正确的邮箱地址'))
        } else {
          callback()
        }
      }
    }
    return validEmail
  },
  // 手机校验
  isPhone(required = true, msg = '请输入手机号') {
    const validPhone = (rule, value, callback) => {
      if (required) {
        if (!value) {
          callback(new Error(msg))
        } else if (!isPhone(value)) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      } else {
        if (!value) {
          callback()
        } else if (!isPhone(value)) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      }
    }
    return validPhone
  },
  // 身份证号校验
  isIdCard() {
    let validIdCard = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入身份证号'))
      } else if (!isIdCard(value)) {
        callback(new Error('请输入正确的身份证号'))
      } else {
        callback()
      }
    }
    return validIdCard
  },
  // 身份证号校验
  isTaxNo() {
    let validTaxNo = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入税号'))
      } else if (!isTaxNo(value)) {
        callback(new Error('请输入正确的税号'))
      } else {
        callback()
      }
    }
    return validTaxNo
  },
  // 车牌号校验
  isCarNumber(msg = '请输入车牌号') {
    let validCarNumber = (rule, value, callback) => {
      if (!value) {
        callback(new Error(msg))
      } else if (!isCarNumber(value)) {
        callback(new Error('请输入正确的车牌号'))
      } else {
        callback()
      }
    }
    return validCarNumber
  }
}

export default ElValidator
