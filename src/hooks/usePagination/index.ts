import { reactive } from 'vue'

interface IPaginationData {
  total: number
  layout: string
  sizes: number[]
  page: number
  page_size: number
}

const defaultPaginationData: IPaginationData = {
  total: 0,
  page_size: 20,
  page: 1,
  sizes: [10, 20, 30, 50, 100, 200],
  layout: 'total, sizes, prev, pager, next, jumper'
}

export function usePagination(_paginationData: Partial<IPaginationData> = {}) {
  const pagination = reactive(
    Object.assign({ ...defaultPaginationData }, _paginationData)
  )

  return { pagination }
}
