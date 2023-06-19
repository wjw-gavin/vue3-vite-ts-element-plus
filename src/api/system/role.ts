import { $delete, get, patch, post } from '@/http'
import { Api } from '../common/enum'
import type { IRole } from './modal/roleModel'

export function createRole(params: IRole) {
  return post(`${Api.role}`, params)
}

export function getRoleInfo(id: number) {
  return get(`${Api.role}/${id}`)
}

export function updateRole(params: IRole) {
  return patch(`${Api.role}/${params.id}`, params)
}

export function deleteRole(id: number) {
  return $delete(`${Api.role}/${id}`)
}
