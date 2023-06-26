## 列表上方搜索项

目前是前端进行编码配置，当然也可以放到后端来配置，通过数据类型 `type` 来指定渲染对应的搜索项。

## 搜索项数据类型

```ts
import type { DatePickType } from 'element-plus'

type ISearchItemType =
  | 'text'
  | 'date'
  | 'select'
  | 'datetime'
  | 'dateRange'
  | 'autocomplete'

interface IOptionProp {
  label: string
  value: string
}

interface ISearchItem {
  /** 搜索项名称 */
  label: string[] | string

  /** 表单类型 */
  type: ISearchItemType

  /** 表单项传递给后端的参数 */
  prop: string[] | string

  /** 表单占位提示 */
  placeholder?: string[] | string

  /** 是否多选 */
  multiple?: boolean

  /** 远程搜索 key */
  searchKey?: string

  /** 获取默认下拉 key */
  optionsKey?: string

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
```

## 部分效果图

![search.png](../../images/search.png)
