export interface IMenuItem {
  id: string
  name: string
  path?: string
  icon?: string
  children?: IMenuItem[]
}
