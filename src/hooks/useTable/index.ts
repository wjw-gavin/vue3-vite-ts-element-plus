import { ref } from 'vue'
import { usePagination } from '../usePagination'

export interface ResponseDataType<T = any> {
  data: T[]
  total: number
  [x: string]: any
}

export interface IOptions {
  /** 接口地址 */
  api: string

  /** 接口参数 */
  params?: Record<string, unknown>

  /** 是否立即执行请求，默认 true */
  immediate?: boolean
}

export function useTable<
  T extends (...args: any) => Promise<ResponseDataType<any>>
>(getTableDataFun: T, options: IOptions) {
  const loading = ref(false)
  const tableData = ref<any[]>([])
  const { immediate = true, params = {}, api } = options
  const { pagination, handleCurrentChange, handleSizeChange } = usePagination()

  const loadData = async (_params?: any) => {
    if (process.env.NODE_ENV !== 'production' && !api) {
      console.error('请求 url 为空')
      return
    }

    try {
      loading.value = true
      const { data, total } = await getTableDataFun(api, _params)
      loading.value = false
      tableData.value = data
      pagination.total = total
    } catch {
      loading.value = false
    }
  }

  if (immediate) {
    loadData(params)
  }

  return {
    tableData,
    loading,
    pagination,
    loadData,
    handleSizeChange,
    handleCurrentChange
  }
}
