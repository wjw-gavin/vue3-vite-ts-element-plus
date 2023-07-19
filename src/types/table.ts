import type { TObject } from '.'
import type { LinkProps, RenderRowData } from 'element-plus'
import type { ComponentPublicInstance } from 'vue'

export interface ITableHead {
  /** 表头名称 */
  label: string

  /** 对应列的字段名 */
  prop: string

  /** 列宽 */
  width?: number

  /** 是否排序 */
  sortable?: boolean

  /** 插槽 name */
  slot?: string
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

  /** 列表操作栏按钮 */
  operations?: ITableOperation
}

export type TableExpose = {
  dispatchLoad: () => void
}

export type TableInstance = ComponentPublicInstance<TableExpose>
