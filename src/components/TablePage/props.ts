import type { PropType } from 'vue'
import type { BatchOptions, TableOperation } from './types'

const props = {
  // store模块 名称
  storeModelName: {
    type: String,
    default: ''
  },
  // 表格数据唯一性字段
  rowKey: {
    type: String,
    default: 'id'
  },
  // 搜索label宽度
  searchLabelWidth: {
    type: String,
    default: ''
  },
  // 添加按钮路由路径
  addBtnLink: {
    type: String,
    default: ''
  },
  // 添加按钮路由路径
  addBtnLinkText: {
    type: String,
    default: '添加'
  },
  // 批量操作
  batchOptions: {
    type: Array as PropType<BatchOptions[]>,
    default: () => []
  },
  // table 操作栏按钮
  showTableOperation: {
    type: Boolean,
    default: true
  },
  // 没有操作栏的自定义表头
  showEditTableHeader: {
    type: Boolean,
    default: true
  },
  // table 操作栏按钮
  tableOperation: {
    type: Object as PropType<TableOperation>,
    default: () => ({})
  },
  // 是否显示按钮组
  showButtonGroups: {
    type: Boolean,
    default: true
  },
  // 是否显示下拉框组
  showDropdownGroups: {
    type: Boolean,
    default: false
  },
  // 非checkbox点击高亮（可多选）
  highlightClickRow: {
    type: Boolean,
    default: true
  }
}

export default props
