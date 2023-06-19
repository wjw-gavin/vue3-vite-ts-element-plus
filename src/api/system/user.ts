import { $delete, get, patch, post } from '@/http'
import { Api } from '../common/enum'
import type { IUser } from './modal/userModel'

export function createUser(params: IUser) {
  return post(`${Api.user}`, params)
}

export function getUserInfo(id: number) {
  return get(`${Api.user}/${id}`)
}

export function updateUser(params: IUser) {
  return patch(`${Api.user}/${params.id}`, params)
}

export function deleteUser(id: number) {
  return $delete(`${Api.user}/${id}`)
}
