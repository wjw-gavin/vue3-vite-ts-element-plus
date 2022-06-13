import { get } from '@/http'
import { cloneDeep, omit, assign } from 'lodash-es'

// 菜单
export function getMenus() {
  return get('/menu')
}

// 权限
export function getPrivileges(params: Record<string, string>) {
  return get('/privileges/check', params)
}

// 搜索项
export function getSearchData(type: string) {
  return get(`/management/center/search/item/config/${type}`)
}

// 列表
export function getTableData(url: string, params: any) {
  let paramsData = {}
  if (params && params.page && params.pageSize) {
    const data = cloneDeep(params)
    const pager = {
      page: data.page,
      pageSize: data.pageSize
    }
    const pagerParams = { pager: JSON.stringify(pager) }

    const remainderParams = omit(data, ['page', 'pageSize', 'options'])
    paramsData = assign(pagerParams, data.options, remainderParams)
  } else {
    paramsData = params
  }
  return get(url, paramsData)
}
