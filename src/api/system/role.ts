import { $delete, patch } from '@/http'
import { Api } from '../common/enum'

export function updateRole(id: number) {
  return patch(`${Api.role}/${id}`)
}

export function deleteRole(id: number) {
  return $delete(`${Api.role}/${id}`)
}
