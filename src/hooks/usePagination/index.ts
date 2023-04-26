import { reactive } from 'vue'

interface IPaginationData {
  total: number
  layout: string
  sizes: number[]
  page: number
  pageSize: number
}

const defaultPaginationData: IPaginationData = {
  total: 0,
  pageSize: 20,
  page: 1,
  sizes: [20, 30, 50, 100, 200],
  layout: 'total, sizes, prev, pager, next, jumper'
}

export function usePagination(_paginationData: Partial<IPaginationData> = {}) {
  const pagination = reactive(
    Object.assign({ ...defaultPaginationData }, _paginationData)
  )

  const handleCurrentChange = (value: number) => {
    pagination.page = value
  }

  const handleSizeChange = (value: number) => {
    pagination.pageSize = value
  }

  return { pagination, handleCurrentChange, handleSizeChange }
}
