import { post } from '@/http'
import type { ILogin } from './types'

enum URL {
  login = '/login',
  logout = '/logout'
}

export function login(params: ILogin) {
  return post(URL.login, params)
}

export function logout() {
  return post(URL.logout)
}
