import { reactive } from 'vue'
import { setUrlParams } from '@/utils'

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
      page_size: pagination.page_size
    })
  }

  const handleSizeChange = (page_size: number) => {
    pagination.page_size = page_size
    setUrlParams({
      page: pagination.page,
      page_size
    })
  }

  return { pagination, handleCurrentChange, handleSizeChange }
}
