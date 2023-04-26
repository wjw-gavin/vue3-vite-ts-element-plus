import { isIdCard, isMobile } from 'native-lodash'

export const elv = {
  /**
   * @description 手机号校验
   * @param required 是否校验必填，有时候手机号必填字段，但是如果填了就要验证其合法性
   * @param msg 提示信息
   */
  isMobile(required = true, msg = '请输入手机号') {
    const validPhone = (rule: any, value: string | number, callback: any) => {
      if (required) {
        if (!value) {
          callback(new Error(msg))
        } else if (!isMobile(value)) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      } else if (!value) {
        callback()
      } else if (!isMobile(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    return validPhone
  },

  // 身份证号校验
  isIdCard() {
    const validIdCard = (rule: any, value: string, callback: any) => {
      if (!value) {
        callback(new Error('请输入身份证号'))
      } else if (!isIdCard(value)) {
        callback(new Error('请输入正确的身份证号'))
      } else {
        callback()
      }
    }
    return validIdCard
  }
}
