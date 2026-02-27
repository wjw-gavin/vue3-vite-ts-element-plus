import Cookies from 'js-cookie'

export const TOKEN_KEY = 'X-TOKEN'

export function getToken(): string {
  return Cookies.get(TOKEN_KEY) || ''
}

export function setToken(token: string): void {
  Cookies.set(TOKEN_KEY, token)
}

export function removeToken(): void {
  Cookies.remove(TOKEN_KEY)
}

export function clearLocal() {
  localStorage.clear()
  sessionStorage.clear()
  removeToken()
}
