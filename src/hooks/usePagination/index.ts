import { reactive } from 'vue'
import { setUrlParams } from '@/utils'

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

  const handleCurrentChange = (page: number) => {
    pagination.page = page
    setUrlParams({
      page,
      pageSize: pagination.pageSize
    })
  }

  const handleSizeChange = (pageSize: number) => {
    pagination.pageSize = pageSize
    setUrlParams({
      page: pagination.page,
      pageSize
    })
  }

  return { pagination, handleCurrentChange, handleSizeChange }
}
