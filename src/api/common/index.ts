import { get } from '@/http'

// 菜单
export function getMenus() {
  return get('/menu')
}

export function getTableData(api: string, params: any) {
  return get(api, params)
}
