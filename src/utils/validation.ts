import { isObject, isArray } from 'lodash-es'

// 匹配身份证(15位或18位)
export function isIdCard(str: string): boolean {
  const result = str.match(/\d{15}|\d{18}/)
  if (result === null) return false
  return true
}

/**
 * 验证电子邮箱格式
 */
export function isEmail(value: string) {
  return /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(
    value
  )
}
/**
 * 验证税号
 */
export function isTaxNo(value: string) {
  return /^[A-Z0-9]{18}$/.test(value)
}

/**
 * @desc   判断是否为手机号
 * @param  {String|Number} str
 * @return {Boolean}
 */
export function isPhone(str: string | number): boolean {
  const reg = /^1[3-9]\d{9}$/
  return reg.test(str.toString())
}

/**
 * @desc   判断是否车牌号（包含新能源8位）
 * @param  {String} str
 * @return {Boolean}
 */
export function isCarNumber(str: string): boolean {
  const reg =
    /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/
  return reg.test(str)
}

/**
 * @desc   判断是否是非0开头的数字
 * @param  {Number/String} str
 * @return {Boolean}
 */
export function isNumber(str: string | number): boolean {
  const reg = /^[1-9][0-9]*$/
  return reg.test(str.toString())
}

/**
 * @desc   判断最多两位小数的数值（正负）
 * @param  {String/Number} str
 * @return {Boolean}
 */
export function isFloatNumber(str: string | number): boolean {
  const reg = /^(-)?([0-9][0-9]*)+(\.[0-9]{1,2})?$/
  return reg.test(str.toString())
}

// 判断包括对象属性，数组长度，字符串是否为空
export const isEmpty = (val: unknown) =>
  (!val && val !== 0) ||
  (isArray(val) && val.length === 0) ||
  (isObject(val) && !Object.keys(val).length)
