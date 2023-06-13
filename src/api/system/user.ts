import { $delete, get, patch } from '@/http'
import { Api } from '../common/enum'
import type { IUser } from './modal/userModel'

export function getUserInfo() {
  return get<IUser>('/auth/profile')
}

export function updateUser(params: IUser) {
  return patch(`${Api.user}/${params.id}`, params)
}

export function deleteUser(id: number) {
  return $delete(`${Api.user}/${id}`)
}
