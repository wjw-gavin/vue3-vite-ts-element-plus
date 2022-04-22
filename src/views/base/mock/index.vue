<template>
  <div class="p-5 bg-white rounded-md">
    <el-button typ="primary" @click="InitTableList">重置列表</el-button>
    <el-table
      v-loading="loading"
      element-loading-text="玩儿命加载中..."
      empty-text="暂无数据"
      class="mt-5 mb-5"
      :data="tableList"
      border
    >
      <el-table-column type="index" label="序号" width="80" />
      <el-table-column prop="date" label="日期" min-width="80" />
      <el-table-column prop="name" label="姓名" min-width="80" />
      <el-table-column prop="amt" label="金额" width="100" />
      <el-table-column prop="address" label="地址" min-width="180" />
      <el-table-column prop="tag" label="标签" width="100" />
    </el-table>
    <el-pagination
      :current-page="page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { ElTable, ElTableColumn, ElPagination, ElMessage } from 'element-plus'
import { getTableData } from '../../../api/mock'
interface ITable {
  page: number
  pageSize: number
  loading: boolean
  tableList: any
}
export default defineComponent({
  components: {
    ElTable,
    ElTableColumn,
    ElPagination
  },
  setup() {
    const table = reactive<ITable>({
      page: 1,
      pageSize: 10,
      loading: false,
      tableList: []
    })
    const getTableList = async () => {
      table.loading = true
      try {
        const tableList = await getTableData({
          page: table.page,
          pageSize: table.pageSize
        })
        setTimeout(() => {
          table.loading = false
          table.tableList = tableList
          ElMessage.success('获取成功')
        }, 1000)
      } catch (err) {
        table.loading = false
      }
    }
    getTableList()
    const InitTableList = () => {
      getTableList()
    }
    const handleSizeChange = (val: number) => {
      table.pageSize = val
      getTableList()
    }
    const handleCurrentChange = (val: number) => {
      table.page = val
      getTableList()
    }
    return {
      ...toRefs(table),
      InitTableList,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>
