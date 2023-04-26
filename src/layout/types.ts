export interface IMenuItem {
  id: string
  url?: string
  name?: string
  icon?: string
  children?: IMenuItem[]
}
