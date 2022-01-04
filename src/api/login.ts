import { get, post } from '@/http/request'

export function getCode(params) {
  return get('/management/center/code/send', params)
}

export function loginByPwd(params) {
  return post('/management/center/login/pwd', params)
}

export function loginByCode(params) {
  return post('/management/center/login/code', params)
}

export function logout() {
  return get('/management/center/logout')
}
