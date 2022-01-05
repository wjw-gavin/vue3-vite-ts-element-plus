import { post } from '@/http/request'

export function login(params) {
  return post('/login', params)
}
