<template>
  <el-card
    v-if="tableConfig.searchItems && tableConfig.searchItems.length > 0"
    class="mb-3"
  >
    <o-search
      :search-items="tableConfig.searchItems"
      @submit-search="submitSearch"
    />
  </el-card>
  <el-card v-loading="loading" element-loading-text="玩命加载中...">
    <div class="flex justify-between mb-4">
      <slot name="table-top" />
    </div>
    <el-table :data="tableData" border v-bind="$attrs">
      <!-- 表格复选框 -->
      <el-table-column
        v-if="tableConfig.selection"
        type="selection"
        width="55"
        reserve-selection
      />

      <!-- 表格索引 -->
      <el-table-column
        v-if="tableConfig.index"
        type="index"
        width="55"
        label="序号"
      />

      <el-table-column
        v-for="item in tableConfig.headers"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        show-overflow-tooltip
        :sortable="item.sortable"
        :min-width="item.width ? item.width : ''"
      >
        <template #default="scope">
          <!-- 追加插槽渲染 -->
          <slot v-if="item.slot" :row="scope.row" :name="item.slot" />

          <!-- 常规渲染 -->
          <template v-else>
            <!-- 空数据 -->
            <span v-if="!scope.row[item.prop]"> - </span>
            <!-- 普通数据 -->
            <span v-else> {{ scope.row[item.prop] }} </span>
          </template>
        </template>
      </el-table-column>

      <!-- 操作按钮 -->
      <el-table-column
        v-if="tableConfig.operations?.buttons"
        :fixed="tableConfig.operations.fixed || 'right'"
        :width="tableConfig.operations.width"
      >
        <template #header>
          <span>操作</span>
        </template>
        <template #default="scope">
          <template
            v-for="btn in tableConfig.operations.buttons"
            :key="btn.text"
          >
            <template v-if="isFunction(btn)">
              <div v-if="btn(scope).show" class="px-2 inline-block">
                <el-link
                  :underline="false"
                  :type="btn(scope).type ? btn(scope).type : 'primary'"
                  @click.stop="btn(scope).click!(scope)"
                >
                  {{ btn(scope).text }}
                </el-link>
              </div>
            </template>
            <div v-else class="px-2 inline-block">
              <el-link
                v-if="btn.show"
                :underline="false"
                :type="btn.type ? btn.type : 'primary'"
                @click.stop="btn.click!(scope)"
              >
                {{ btn.text }}
              </el-link>
            </div>
          </template>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      v-model:current-page="pagination.page"
      v-model:page-size="pagination.pageSize"
      class="mt-5"
      :page-sizes="pagination.sizes"
      :layout="pagination.layout"
      :total="pagination.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
</template>
<script lang="ts" setup>
import { type PropType, watch } from 'vue'
import { isFunction } from 'native-lodash'
import { useRoute } from 'vue-router'
import { usePagination, useTable } from '@/hooks'
import { getTableData } from '@/api/common'
import type { ITableConfig, TObject } from '@/types'

defineOptions({
  name: 'OTable',
  inheritAttrs: true
})

const props = defineProps({
  tableConfig: {
    type: Object as PropType<ITableConfig>,
    required: true,
    default: () => ({})
  }
})

const { pagination: pager } = usePagination()

const route = useRoute()
const query = route.query
let searchData: TObject = Object.assign(
  {
    page: Number(query.page) || pager.page,
    pageSize: Number(query.pageSize) || pager.pageSize
  },
  props.tableConfig.params
)

const {
  loading,
  tableData,
  pagination,
  loadData,
  handleSizeChange,
  handleCurrentChange
} = useTable(getTableData, {
  api: props.tableConfig.api,
  params: searchData
})

const submitSearch = (search: TObject) => {
  searchData = {
    page: 1,
    pageSize: pagination.pageSize,
    ...props.tableConfig.params,
    ...search
  }

  loadData(searchData)
}

watch([() => pagination.page, () => pagination.pageSize], () =>
  loadData(
    Object.assign(searchData, {
      page: pagination.page,
      pageSize: pagination.pageSize
    })
  )
)
</script>
