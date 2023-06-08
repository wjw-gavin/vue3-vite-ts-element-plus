import { get } from '@/http'
import type { IMenuItem } from '@/layout/types'

// 菜单
export function getMenus() {
  return get<IMenuItem[]>('/menu')
}

export function getTableData(api: string, params: any) {
  return get(api, params)
}
