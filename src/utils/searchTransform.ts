/*
 * @Description: 对搜索项数据的处理
 */

import { cloneDeep, forIn, isString, isArray, omit } from 'lodash-es'

// 把搜索组件绑定的值转换为后台需要的格式
export function transfromForBackend(data: any) {
  let condition = cloneDeep(data)
  forIn(condition, (value, key) => {
    if (value) {
      if (isArray(value)) {
        condition[key] = {
          type: 'date_range',
          key: '',
          value: {
            start: value[0] || '',
            end: value[1] || ''
          }
        }
      } else if (isString(value)) {
        condition[key] = {
          type: 'text',
          key: '',
          value: value
        }
      } else {
        condition[key]['type'] = 'select'
      }
    } else {
      condition = omit(condition, key)
    }
  })
  return condition
}

// 还原搜索数据为搜索组件绑定的格式
export function transfromForFrontend(condition: any) {
  if (condition) {
    forIn(condition, (value, key) => {
      if (value && value.type) {
        if (value.type === 'select') {
          condition[key] = omit(value, 'type')
        } else if (value.type === 'date_range') {
          condition[key] = [value.value.start, value.value.end]
        } else if (value.type === 'text') {
          condition[key] = value.value
        }
      }
    })
    return condition
  }
  return {}
}

// 过滤掉type属性
export function filterOutType(condition: any) {
  let result = {}
  if (condition) {
    forIn(condition, (value, key) => {
      condition[key] = omit(value, 'type')
    })
    result = condition
  }
  return {
    condition: result
  }
}
