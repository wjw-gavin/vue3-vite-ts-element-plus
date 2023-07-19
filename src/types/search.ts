export type ISearchItemType =
  | 'text'
  | 'date'
  | 'select'
  | 'complex'
  | 'date_time'
  | 'date_range'
  | 'time_range'
  | 'multi_select'
  | 'auto_complete'

export interface IOptionProp {
  key: string
  value: string
}

export interface ISearchItem {
  id: string
  name: string
  type: ISearchItemType
  hint: string
  options?: IOptionProp[]
  children?: ISearchItem[]
  multi_select?: boolean
}
