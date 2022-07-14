import Cookies from 'js-cookie'

const TokenKey = 'nToken'

export function getToken(): string {
  return Cookies.get(TokenKey) || ''
}

export function setToken(token: string): void {
  Cookies.set(TokenKey, token)
}

export function removeToken(): void {
  Cookies.remove(TokenKey)
}

export function clearLocal() {
  localStorage.clear()
  sessionStorage.clear()
  removeToken()
}
