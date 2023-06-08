import { get } from '@/http'
import type { IUser } from './model/userModel'

export function getUserInfo() {
  return get<IUser>('/auth/profile')
}
