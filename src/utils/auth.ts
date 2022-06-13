import Cookies from 'js-cookie'

const TokenKey = 'X-TOKEN'

export function getToken(): string {
  return Cookies.get(TokenKey) || ''
}

export function setToken(token: string) {
  Cookies.set(TokenKey, token)
}

export function removeToken() {
  Cookies.remove(TokenKey)
}

export function clearLocal() {
  localStorage.clear()
  sessionStorage.clear()
  removeToken()
}
