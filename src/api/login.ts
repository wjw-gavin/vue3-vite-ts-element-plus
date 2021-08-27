import { post } from '@/http/request'

export function getCode(params: any) {
  return post('/company/login/getSMSCode', params)
}

export function loginByPwd(params: any) {
  return post('/company/login/password', params)
}

export function loginByCode(params: any) {
  return post('/company/login/SMSCode', params)
}

export function logout() {
  return post('/company/login/logout')
}
