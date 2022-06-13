import { get } from '@/http'

export function getUserInfo(id: number) {
  return get(`/user/${id}`)
}
