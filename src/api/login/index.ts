import { post } from '@/http'

export interface ILogin {
  mobile: number | string
  password: string
  code?: string | number
}

enum URL {
  login = '/auth/login',
  logout = '/auth/logout'
}

export function login(params: ILogin) {
  return post(URL.login, params)
}

export function logout() {
  return post(URL.logout)
}
