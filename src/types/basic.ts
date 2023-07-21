export type Numeric = number | string

export type TObject = Record<PropertyKey, any>

export type TLoading = (arg: boolean) => void

export type Status = 'normal' | 'deleted' | 'enable' | 'disabled'
