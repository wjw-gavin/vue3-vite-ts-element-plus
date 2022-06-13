import { post } from '@/http'

enum URL {
  login = '/login',
  logout = '/logout'
}

interface ILogin {
  mobile: number | string
  password: string
  code?: string
}
export function login(params: ILogin) {
  return post(URL.login, params)
}

export function logout() {
  return post(URL.logout)
}
