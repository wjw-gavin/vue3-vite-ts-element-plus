<template>
  <div>
    <!-- 搜索 -->
    <g-top-search
      :store-model-name="storeModelName"
      :search-click="handleSearchClick"
      :is-loading="isLoading"
      :search-label-width="searchLabelWidth"
    />
    <!-- 表格 -->
    <div v-loading="isLoading" class="g-table" element-loading-text="玩儿命加载中...">
      <!-- 表格操作组 -->
      <div class="g-table-operation">
        <el-row
          type="flex"
          justify="space-between"
          align="middle"
          class="top-operation"
        >
          <el-col :span="14">
            <el-button
              v-if="addBtnLink"
              :icon="Plus"
              type="primary"
              @click="handleTableLeftClick"
            >
              {{ addBtnLinkText }}
            </el-button>

            <slot name="top-btn-left"></slot>
            <div v-if="batchOptions.length > 0" class="batch-box">
              <el-select
                v-model="batchVal"
                value-key="id"
                placeholder="请选择批量操作"
                @change="batchChanged"
              >
                <template v-for="item in batchOptions" :key="item.id">
                  <el-option :label="item.label" :value="item" />
                </template>
              </el-select>
              <el-button
                type="primary"
                :disabled="multipleSelection.length == 0 || !batchVal"
                @click="batchOperation"
              >
                确认
              </el-button>
            </div>
          </el-col>
          <el-col :span="10">
            <el-row
              v-if="false"
              class="useInOrder"
              type="flex"
              justify="end"
              align="middle"
            >
              <slot name="top-btn-right"></slot>
              <el-button
                v-if="roles[pageRoleId + '_import']"
                link
                type="primary"
                @click="downTemplate"
              >
                下载导入模板
              </el-button>
              <!-- 导入 -->
              <g-import
                v-if="roles[pageRoleId + '_import']"
                ref="nfImportdRef"
                :store-model-name="storeModelName"
              />
              <!-- 导出 -->
              <g-export
                v-if="roles[pageRoleId + '_export']"
                ref="nfDownloadRef"
                v-model:isDot="isDot"
                class="useInOrderExport"
                :has-import="roles[pageRoleId + '_import']"
                :store-model-name="storeModelName"
              />
            </el-row>
          </el-col>
        </el-row>
      </div>
      <!-- 表格 -->
      <el-table
        ref="elTableRef"
        v-bind="$attrs"
        :row-key="rowKey"
        :data="tableData"
        :size="defaultOptions.size"
        :row-class-name="tableRowClassName"
        :border="defaultOptions.border"
        @row-click="rowClick"
        @select="handleSelectionChange"
        @select-all="handleSelectionAll"
      >
        <!-- 多选 -->
        <el-table-column
          v-if="defaultOptions.selection"
          type="selection"
          reserve-selection
          width="40"
          :selectable="defaultOptions.selectable"
        />

        <el-table-column
          v-for="item in tableHeadList"
          :key="item.prop"
          :min-width="item.width ? item.width : item.label.length * 14 + 44"
          show-overflow-tooltip
          :sortable="item.sortable ? item.sortable : false"
          :prop="item.prop"
          :label="item.label"
        >
          <template #default="scope">
            <!-- 追加插槽渲染 -->
            <slot v-if="item.slotName" :row="scope.row" :name="item.slotName"></slot>

            <!-- 普通渲染 -->
            <template v-else>
              <!-- 普通数据 -->
              <span
                v-if="
                  !scope.row[item.prop] || scope.row[item.prop] === '' || scope.row[item.prop] === 0
                "
              >
                -
              </span>
              <!-- 数组数据展示 -->
              <template v-else-if="Array.isArray(scope.row[item.prop])">
                <span v-if="scope.row[item.prop].length === 0"> - </span>
                <template v-else>
                  <span v-for="(v, v_index) in scope.row[item.prop]" :key="v">
                    {{ v }}{{ v_index === scope.row[item.prop].length - 1 ? '' : '，' }}
                  </span>
                </template>
              </template>
              <span v-else> {{ scope.row[item.prop] }} </span>
            </template>
          </template>
        </el-table-column>

        <!-- 操作按钮 -->
        <el-table-column
          v-if="showTableOperation"
          :fixed="tableOperation.fixed ? tableOperation.fixed : 'right'"
          :width="tableOperation.width"
        >
          <template #header>
            <span>操作</span>
          </template>
          <template #default="scope">
            <template v-if="showButtonGroups">
              <!-- 以按钮组的方式 -->
              <template v-for="btn in tableOperation.buttonGroups" :key="btn.name">
                <template v-if="isFunction(btn)">
                  <div v-if="btn(scope).isShow" class="operation-btn-box">
                    <el-button
                      link
                      size="small"
                      :type="btn(scope).type ? btn(scope).type : 'primary'"
                      @click.stop="btn(scope).click(scope)"
                    >
                      {{ btn(scope).name }}
                    </el-button>
                  </div>
                </template>
                <div v-else class="operation-btn-box">
                  <el-button
                    v-if="btn.isShow"
                    link
                    size="small"
                    :type="btn.type ? btn.type : 'primary'"
                    @click.stop="btn.click(scope)"
                  >
                    {{ btn.name }}
                  </el-button>
                </div>
              </template>
            </template>
            <template v-if="showDropdownGroups">
              <!-- 以下拉的方式 -->
              <el-dropdown
                v-if="tableOperation.dropdownGroups && tableOperation.dropdownGroups.length > 0"
                :class="
                  setDropdownClass(
                    tableOperation.buttonGroups ? tableOperation.dropdownGroups : [],
                    scope
                  )
                "
                trigger="click"
              >
                <el-button
                  link
                  type="default"
                  size="small"
                  @click.stop=""
                >
                  更多
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <template
                      v-for="dropdown in tableOperation.dropdownGroups"
                      :key="dropdown.name"
                    >
                      <template v-if="isFunction(dropdown)">
                        <el-dropdown-item
                          v-if="dropdown(scope).isShow"
                          divided
                          @click="dropdown(scope).click(scope)"
                        >
                          {{ dropdown(scope).name }}
                        </el-dropdown-item>
                      </template>
                      <template v-else>
                        <el-dropdown-item divided @click="dropdown.click(scope)">
                          {{ dropdown.name }}
                        </el-dropdown-item>
                      </template>
                    </template>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <g-pagination
        :current-page="params.page"
        :page-size="params.per_page"
        :total="total"
        @current-change="handlePageChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
/**
 * @Description: 表格组件（包含搜索、编辑表头、添加导出等操作按钮、分页组件）
 */
import { defineComponent, toRefs, ref, reactive, watch, h } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { isFunction, findIndex, includes } from 'lodash-es'
import { ElMessageBox, ElMessage, ElTable } from 'element-plus'
import { updateUrlParams } from '@/utils'
import { post } from '@/http'
import type { BatchOptions, Button } from './types'
import privilege from '@/utils/page/privilege'
import props from './props'
import getComputeds from './computed'

export default defineComponent({
  name: 'GTablePage',
  props: props,
  emits: { 'left-btn-click': null },
  setup(props, { attrs, emit }) {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    const computeds = reactive(getComputeds(props.storeModelName))

    // 默认第一条批量操作
    const batchVal = ref<BatchOptions>(props.batchOptions[0])
    const elTableRef = ref<InstanceType<typeof ElTable> | null>(null)
    const nfDownloadRef = ref<any>(null)
    const isDot = ref(false)
    const pageRoleId = privilege[route.path]
    const defaultOptions = reactive({
      border: true,
      size: 'small',
      selection: false,
      selectable: () => true,
      searchLabelWidth: ''
    })

    const initTable = () => {
      Object.assign(defaultOptions, attrs)
      store.commit('data/updateCount', 1)

      // 读取url页码等参数
      const urlPrams = route.query
      const updataParams = {
        page: urlPrams.page ? Number(urlPrams.page) : 1,
        per_page: urlPrams.per_page ? Number(urlPrams.per_page) : 10
      }
      store.commit(`${props.storeModelName}/updateTableData`, [])
      store.commit(`${props.storeModelName}/updateParams`, updataParams)
    }
    // 初始化表格
    initTable()

    const getSearchData = () => {
      store.dispatch('data/getSearchData', props.storeModelName)
    }
    const getPrivileges = () => {
      store.dispatch('data/getPrivileges', props.storeModelName)
    }
    const getTableList = () => {
      store.dispatch('data/getTableData', props.storeModelName)
    }
    getSearchData()
    getPrivileges()

    // dropdown设置class，防止没有其他按钮时，左边有margin
    const setDropdownClass = (buttonGroups: any[], scope: any) => {
      const index = findIndex(buttonGroups, (item: Button) => {
        if (isFunction(item)) {
          return item(scope).isShow === true
        } else {
          return item.isShow === true
        }
      })
      return index > -1 ? 'has-margin-left' : ''
    }
    // 设置选中后行的className
    const tableRowClassName = ({ row }) => {
      if (row.rowClass) {
        return row.rowClass
      }
      return ''
    }
    // 非checkbox点击高亮（可多选）
    const rowClick = (row: any) => {
      if (!props.highlightClickRow) return
      if (row.rowClass) {
        row.rowClass = ''
      } else {
        row.rowClass = 'selected-row'
      }
    }
    // 点击左侧按钮跳转
    const handleTableLeftClick = () => {
      if (props.addBtnLink) {
        router.push(props.addBtnLink)
      } else {
        emit('left-btn-click')
      }
    }
    // 多选相关
    const handleSelectionChange = (val: any[]) => {
      const multipleSelection = val.map((item) => item[props.rowKey])
      store.commit(`${props.storeModelName}/updateSelection`, multipleSelection)
    }
    const handleSelectionAll = (val: any[]) => {
      const multipleSelection = val.map((item) => item[props.rowKey])
      store.commit(`${props.storeModelName}/updateSelection`, multipleSelection)
    }
    const toggleRowSelection = (row: object) => {
      elTableRef.value?.toggleRowSelection(row, false)
    }
    // 选择批量操作 重置
    const batchChanged = () => {
      store.commit(`${props.storeModelName}/updateSelection`, [])
      elTableRef.value?.clearSelection()
    }
    // 下载导入模板
    const downTemplate = () => {
      nfDownloadRef.value.exportExcel('download')
    }
    // 点击搜索
    const handleSearchClick = (condition) => {
      updateUrlParams(
        {
          page: 3,
          per_page: computeds.params.per_page
        },
        'search'
      )
      const searchParams = {
        page: 1,
        condition: condition
      }
      store.commit(`${props.storeModelName}/updateTableData`, [])
      store.commit(`${props.storeModelName}/updateParams`, searchParams)
      getTableList()
    }
    const handlePageChange = (page: number) => {
      store.commit(`${props.storeModelName}/updateParams`, {
        page: page
      })
      updateUrlParams({
        page: page,
        per_page: computeds.params.per_page
      })
      getTableList()
    }
    const handleSizeChange = (size: number) => {
      const perPage = { per_page: size }
      store.commit(`${props.storeModelName}/updateParams`, perPage)
      updateUrlParams({
        page: computeds.params.page,
        per_page: size
      })
      getTableList()
    }
    // 批量操作自定义提示
    const batchOperation = () => {
      if (!batchVal.value.id) {
        ElMessageBox.alert('请先选择批量操作选项')
        return
      }
      ElMessageBox({
        title: '提示',
        message: h('p', null, [
          h('span', null, '您确认要 '),
          h(
            'span',
            { style: 'color: #062c6e; font-weight: 600; font-size: 16px' },
            `${batchVal.value.label}${computeds.multipleSelection.length}条`
          ),
          h('span', null, ' 所选数据?')
        ]),
        showCancelButton: true,
        type: 'warning'
      }).then(() => {
        post(props.batchOptions[batchVal.value.id - 1].url, {
          ids: computeds.multipleSelection
        }).then(() => {
          ElMessage.success('操作完成')
          // 处理最后一页批量删除后的问题
          if (includes(batchVal.value.label, '删除')) {
            const total = computeds.total // 总条数
            const params = computeds.params // 请求数据的分页参数
            const length = computeds.multipleSelection.length // 删除的条数
            const pages = Math.ceil((total - length) / (params.per_page as number)) // 删除后，数据总页数
            let currentPage = Number(params.page) > pages ? pages : Number(params.page) // 如果当前页完全删除，跳转到上一页
            currentPage = currentPage < 1 ? 1 : currentPage
            if (Number(currentPage) !== Number(params.page)) {
              updateUrlParams({
                page: currentPage,
                per_page: params.per_page
              })
              store.commit(`${props.storeModelName}/updateParams`, {
                page: currentPage
              })
            }
          }
          elTableRef.value?.clearSelection()
          getTableList()
          store.commit(`${props.storeModelName}/updateSelection`, [])
        })
      })
    }

    watch(
      () => computeds.count,
      (val: number) => {
        if (val === 0) {
          getTableList()
        }
      }
    )
    return {
      ...toRefs(computeds),
      elTableRef,
      nfDownloadRef,
      batchVal,
      isDot,
      pageRoleId,
      defaultOptions,
      isFunction,
      setDropdownClass,
      tableRowClassName,
      rowClick,
      handleTableLeftClick,
      handleSelectionChange,
      handleSelectionAll,
      toggleRowSelection,
      batchChanged,
      downTemplate,
      handleSearchClick,
      handlePageChange,
      handleSizeChange,
      batchOperation,
      Plus
    }
  }
})
</script>

<style lang="scss" scoped>
.g-table {
  padding: 10px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

:deep(.el-table) {
  .selected-row {
    background: rgb(220, 237, 220);
  }

  .cell {
    font-size: 12px;
    span {
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 100%;
    }
  }
}

:deep(.top-operation) {
  .el-button,
  .el-select {
    margin-bottom: 10px;
  }
}

.batch-box {
  display: inline-block;

  .el-button {
    margin-left: 5px;
  }
}

.operation-btn-box {
  display: inline-block;

  & + .operation-btn-box .el-button {
    margin-left: 12px;
  }
}

.operation-no-btn-box {
  margin-left: 0;
  display: inline-block;
}

.el-dropdown {
  display: inline-block;

  &.has-margin-left {
    margin-left: 10px;
  }
}

.el-dropdown-menu {
  padding: 0;
  width: 126px;

  & > li {
    &:first-child {
      margin-top: 0;
    }

    &:last-of-type {
      margin-bottom: 6px;
    }
  }
}

:deep(.g-icon-btn) {
  margin-left: 10px;
  padding: 6px 10px;

  [class^='el-icon-'] {
    font-size: 20px;
  }
}
</style>
