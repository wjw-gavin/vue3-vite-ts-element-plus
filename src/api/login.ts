import { post } from '@/http/request'

export function login(params: any) {
  return post('/api/login', params)
}
