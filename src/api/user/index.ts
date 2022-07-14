import { get } from '@/http'

export function getUserInfo() {
  return get('/user/info')
}
