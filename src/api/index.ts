import { get, post } from '@/http/request'

// 菜单
export function getMenus() {
  return get('/management/center/menu', {})
}

// 权限
export function getPrivileges(params: Record<string, string>) {
  return get('/management/center/privileges/check', params)
}

// 搜索项
export function getSearchData(type: string) {
  return get(`/management/center/search/item/config/${type}`)
}

// 列表
export function getTableData(url: string, params: any) {
  return post(url, params)
}
