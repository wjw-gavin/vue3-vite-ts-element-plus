import type { TObject } from '.'
import type { IOptionProp } from '@/components/Select/types'
import type { DatePickType, LinkProps, RenderRowData } from 'element-plus'

export type ISearchItemType =
  | 'text'
  | 'date'
  | 'select'
  | 'datetime'
  | 'dateRange'
  | 'autocomplete'

export interface ITableHead {
  /** 表头名称 */
  label: string

  /** 对应列的字段名 */
  prop: string

  /** 列宽 */
  width?: number

  /** 是否排序 */
  sortable?: boolean

  /** 是否使用插槽 */
  slot?: boolean
}

export interface ISearchItem {
  /** 搜索项名称 */
  label: string[] | string

  /** 表单类型 */
  type: ISearchItemType

  /** 表单项参数 */
  prop: string[] | string

  /** 表单占位提示 */
  placeholder?: string[] | string

  /** 是否多选 */
  multiple?: boolean

  /** 远程搜索地址 */
  api?: string

  /** 远程搜索类型 key */
  key?: string

  /** 下拉选项 */
  options?: any[]

  /** 下拉选项 label 和 value */
  optionProp?: IOptionProp

  /** 时间选择类型 */
  subType?: DatePickType

  /** 时间格式，默认 yyyy-MM-dd HH:mm:ss */
  format?: string

  /** 默认值 */
  defaultValue?: any
}

export interface IButtons {
  /** 按钮文字 */
  text: string

  /** 按钮类型 */
  type?: LinkProps['type']

  /** 是否显示， 默认 false */
  show: boolean

  /** 点击回调 */
  click?(scope: RenderRowData<any>): void
}

export interface ITableOperation {
  /** 操作栏列宽 */
  width?: number

  /** 是否悬浮，默认 right */
  fixed?: string

  /** 操作栏按钮 */
  // Array<IButtons | ((params: any) => IButtons)>
  buttons?: Array<IButtons | ((scope: RenderRowData<any>) => IButtons)>
}

export interface ITableConfig {
  /** 列表请求地址 */
  api: string

  /** 是否显示索引 */
  index?: boolean

  /** 列表请求参数 */
  params?: TObject

  /** 列表表头 */
  headers: ITableHead[]

  /** 是否显示复选框 */
  selection?: boolean

  /** 列表搜索项 */
  searchItems?: ISearchItem[]

  /** 列表操作栏按钮 */
  operations?: ITableOperation
}
