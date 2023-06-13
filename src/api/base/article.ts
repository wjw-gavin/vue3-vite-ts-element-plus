import { $delete, patch } from '@/http'
import { Api } from '../common/enum'
import type { IArticle } from './modal/article.modal'

export function updateUser(params: IArticle) {
  return patch(`${Api.article}/${params.id}`, params)
}

export function deleteUser(id: number) {
  return $delete(`${Api.article}/${id}`)
}
