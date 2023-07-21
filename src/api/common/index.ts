import { get } from '@/http'
import type { IMenuItem } from '@/layout/types'
import type { IUser } from '../system/modal/userModel'
import type { IOptionProp, ISearchItem } from '@/types'

// 菜单
export function getMenus() {
  return get<IMenuItem[]>('/menu')
}

// 获取当前用户信息
export function getUserInfo() {
  return get<IUser>('/auth/profile')
}

export function getTableData(api: string, params: any) {
  return get(api, params)
}

// 获取指定页面的搜索项
export function getSearchConfig(key: string) {
  return get<ISearchItem[]>(`/search/config/${key}`)
}

// 获取指定类型 key 的下拉选项
export function getOptions(key: string) {
  return get<IOptionProp[]>(`/search/option/${key}`)
}

// 获取数据 autocomplete 下拉选项
export function getAutoComplete(key: string, keyword: string) {
  return get(`search/autocomplete/${key}`, { keyword })
}
