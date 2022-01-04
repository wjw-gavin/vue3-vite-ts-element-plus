export interface BatchOptions {
  id: number
  label: string
  url: string
  role: string
}

export interface TableOperation {
  width: number
  fixed: string
  buttonGroups?: any[]
  dropdownGroups?: any[]
}

export interface TableColumn {
  label: string
  prop: string
  slotName?: string
  tooltip?: boolean
  width: string | number
  sortable?: boolean
  checked: boolean
}

export interface Button {
  name: string
  type?: string
  isShow: boolean
  click(): void
}
