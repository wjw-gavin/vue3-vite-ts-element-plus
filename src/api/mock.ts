import { get } from '@/http/request'

export interface ITableList {
  page: number
  pageSize: number
}

export function getTableData(params: ITableList) {
  return get('/api/getTableList', params)
}
