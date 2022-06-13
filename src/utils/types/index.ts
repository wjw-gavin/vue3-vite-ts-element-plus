export interface IMessageBox {
  title?: string
  message: string
  showCancelButton?: boolean
  confirm?: () => void
}
