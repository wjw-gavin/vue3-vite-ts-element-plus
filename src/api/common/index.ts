import { get } from '@/http'
import { transfromForBackend, filterOutType } from '@/utils/searchTransform'
import { cloneDeep, omit, assign } from 'lodash-es'
import type { Autocomplete } from './types'

// 菜单
export function getMenus() {
  return get('/menu')
}

// 权限
export function getPrivileges(params: any) {
  return get('/privileges/check', params)
}

// 搜索项
export function getSearchData(type: string) {
  return get(`/search_item_config/${type}`)
}

// 获取指定搜索项的下拉选项列表
export function getSearchItemOption(type: string) {
  return get(`/search_item/${type}/option`)
}

// 获取指定搜索项的autocomplete选项列表
export function getSearchItemAutocomplete(type: string, params: Autocomplete) {
  return get(`/search_item/${type}/autocomplete`, params)
}

// 获取标准数据autocomplete选项列表
export function getItemAutocomplete(type: string, params: Autocomplete) {
  return get(`/${type}/autocomplete`, params)
}

// 列表
export function getTableData(url: string, params: any) {
  let paramsData = {}
  if (params && params.page && params.per_page) {
    const data = cloneDeep(params)
    const pager = {
      page: data.page,
      per_page: data.per_page
    }
    const pagerParams = { pager: JSON.stringify(pager) }
    const condition = transfromForBackend(data.condition) // 把搜索组件绑定的值转换为后台需要的格式
    const conditionParams = filterOutType(condition) // 传给后台时过滤掉type属性
    const remainderParams = omit(data, ['page', 'per_page', 'condition'])
    paramsData = assign(pagerParams, conditionParams, remainderParams)
  } else {
    paramsData = params
  }
  return get(url, paramsData)
}
