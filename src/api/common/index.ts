import { get } from '@/http'
import type { IMenuItem } from '@/layout/types'
import type { IUser } from '../system/modal/userModel'

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

// 获取指定类型 key 的下拉选项
export function getOptions(key: string) {
  return get(`${key}/default/options`)
}

// 获取数据 autocomplete 下拉选项
export function getAutocompleteOptions(key: string, keyword: string) {
  return get(`${key}/autocomplete/options`, { keyword })
}
