import { $delete, get, patch, post } from '@/http'
import { Api } from '../common/enum'
import type { IArticle } from './modal/article.modal'

export function createArticle(params: IArticle) {
  return post(`${Api.article}`, params)
}

export function getArticleInfo(id: number) {
  return get(`${Api.article}/${id}`)
}

export function updateArticle(params: IArticle) {
  return patch(`${Api.article}/${params.id}`, params)
}

export function deleteArticle(id: number) {
  return $delete(`${Api.article}/${id}`)
}
