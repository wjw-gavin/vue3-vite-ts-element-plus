import type { Status } from '@/types'

export interface IRole {
  id?: number
  name?: string
  desc?: string
  count?: number
  users?: number[]
  status?: Status
}
