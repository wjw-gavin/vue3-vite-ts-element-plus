export interface IOptionProp {
  label: string
  value: string
}
export interface IChild {
  id?: string
  name?: string
  type?: string
  hint?: string
  options: IOptionProp[]
  children?: IChild[]
  multi_select?: boolean
}
