import { $delete, patch } from '@/http'
import { Api } from '../common/enum'
import type { IRole } from './modal/roleModel'

export function updateRole(params: IRole) {
  return patch(`${Api.role}/${params.id}`, params)
}

export function deleteRole(id: number) {
  return $delete(`${Api.role}/${id}`)
}
