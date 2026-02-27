<template>
  <o-search :loading="loading" @search="submitSearch" />

  <el-card v-loading="loading" element-loading-text="玩命加载中...">
    <div class="mb-4 flex justify-between">
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
            <span v-if="scope.row[item.prop] === ''"> - </span>
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
            v-for="(btn, btnIndex) in tableConfig.operations.buttons"
            :key="btnIndex"
          >
            <template v-if="isFunction(btn)">
              <div v-if="btn(scope).show" class="inline-block px-2">
                <el-link
                  :underline="false"
                  :type="btn(scope).type ? btn(scope).type : 'primary'"
                  @click.stop="btn(scope).click!(scope)"
                >
                  {{ btn(scope).text }}
                </el-link>
              </div>
            </template>
            <template v-else>
              <el-link
                v-if="btn.show"
                class="inline-block px-2"
                :underline="false"
                :type="btn.type ? btn.type : 'primary'"
                @click.stop="btn.click!(scope)"
              >
                {{ btn.text }}
              </el-link>
            </template>
          </template>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      v-model:current-page="pagination.page"
      v-model:page-size="pagination.page_size"
      class="mt-5"
      :page-sizes="pagination.sizes"
      :layout="pagination.layout"
      :total="pagination.total"
      @size-change="onSizeChange"
      @current-change="onPageChange"
    />
  </el-card>
</template>

<script lang="ts" setup>
import { computed, onMounted, watch } from 'vue'
import type { PropType } from 'vue'
import { isFunction } from '@fekt/tskit'
import { useRoute } from 'vue-router'
import { getTableData } from '@/api/common'
import { useSearchStore } from '@/stores'
import type { ITableConfig, TObject } from '@/types'
import { useTable } from '@/hooks'
import { makeRequiredProp, setUrlParams } from '@/utils'

defineOptions({
  name: 'OTable',
  inheritAttrs: true
})

const props = defineProps({
  tableConfig: makeRequiredProp<PropType<ITableConfig>>(Object)
})

const route = useRoute()
const searchStore = useSearchStore()

let searchData: TObject = { ...props.tableConfig.params }

const {
  loading,
  tableData,
  pagination,
  loadData
} = useTable(getTableData, {
  api: props.tableConfig.api,
  params: searchData,
  immediate: false
})

const searchReady = computed(() => searchStore.searchReady)

const submitSearch = (search: TObject) => {
  searchData = {
    page: 1,
    page_size: pagination.page_size,
    ...search
  }

  setUrlParams({ page: 1, page_size: pagination.page_size })
  loadData(searchData)
}

const dispatchLoad = () => {
  loadData({
    ...searchData,
    page: pagination.page,
    page_size: pagination.page_size
  })
}

// 分页事件：直接触发加载，不依赖 watcher
const onPageChange = (page: number) => {
  setUrlParams({ page, page_size: pagination.page_size })
  dispatchLoad()
}

const onSizeChange = (pageSize: number) => {
  setUrlParams({ page: pagination.page, page_size: pageSize })
  dispatchLoad()
}

onMounted(() => {
  const query = route.query
  if (query.page)
    pagination.page = Number(query.page)
  if (query.page_size)
    pagination.page_size = Number(query.page_size)

  Object.assign(searchData, {
    page: pagination.page,
    page_size: pagination.page_size
  })
  searchStore.getSearchList()
})

// searchReady 作为唯一的初始化加载触发点
watch(
  () => searchReady.value,
  (val) => {
    if (val) {
      dispatchLoad()
    }
  }
)

defineExpose({
  dispatchLoad
})
</script>
