import { computed } from 'vue'
import { useStore } from 'vuex'
import { TableColumn } from '../typing'

const getComputeds = (storeModelName: string) => {
  const { state } = useStore()

  return {
    // 用于计算保证 表格依赖的接口请求完成
    count: computed((): number => state['data'].count),
    // 表头
    tableHeadList: computed((): any[] => state[storeModelName].tableHeadList),
    // 过滤后的表头
    tableActiveHeaders: computed((): any[] => {
      const result = state[storeModelName].tableHeadList
      return result.filter((item: TableColumn): boolean => item.checked)
    }),
    // 列表请求数据loading
    isLoading: computed((): boolean => state[storeModelName].isLoading),
    // 从store里读取列表数据
    tableData: computed((): any[] => state[storeModelName].tableData),
    // 列表接口穿参数据
    params: computed((): Record<string, unknown> => state[storeModelName].params),
    // 数据总条数
    total: computed((): number => state[storeModelName].total),
    // 多选的数据
    multipleSelection: computed((): any[] => state[storeModelName].multipleSelection),
    // 权限
    roles: computed((): Record<string, unknown> => state[storeModelName].roles)
  }
}
export default getComputeds
