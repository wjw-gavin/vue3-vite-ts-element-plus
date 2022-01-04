import { get } from '@/http/request'

export function getUser() {
  return get('/management/center/user/info')
}
