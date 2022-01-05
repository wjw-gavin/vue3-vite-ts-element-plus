import { get } from '@/http/request'

export function getUserInfo() {
  return get('/user/info')
}
