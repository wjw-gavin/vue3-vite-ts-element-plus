import { ElMessage } from 'element-plus'
import { confirmBox, setUrlParams } from '@/utils'
import { usePagination } from '../usePagination'
import type { Ref } from 'vue'
import type { TableInstance } from '@/types'

// 用于列表删除，解决删除最后一页数据最后一条数据问题
export function useDelete() {
  const onDelete = (
    deleteFun: (id: number) => Promise<any>,
    id: number,
    tableRef: Ref<TableInstance | undefined>
  ) => {
    confirmBox(`请确认是否要删除该条数据？`).then(async () => {
      await deleteFun(id)
      ElMessage.success('删除成功')

      const { pagination } = usePagination()

      const pageCount = Math.ceil((pagination.total - 1) / pagination.page_size)
      const currentPage = Math.min(pageCount, pagination.page) || 1
      if (currentPage !== pagination.page) {
        setUrlParams({ page: currentPage })
        pagination.page = currentPage
      }

      tableRef.value?.dispatchLoad()
    })
  }

  return {
    onDelete
  }
}
