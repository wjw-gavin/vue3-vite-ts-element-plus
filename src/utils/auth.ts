import Cookies from 'js-cookie'

export const TOOKENkEY = 'X-TOKEN'

export function getToken(): string {
  return Cookies.get(TOOKENkEY) || ''
}

export function setToken(token: string): void {
  Cookies.set(TOOKENkEY, token)
}

export function removeToken(): void {
  Cookies.remove(TOOKENkEY)
}

export function clearLocal() {
  localStorage.clear()
  sessionStorage.clear()
  removeToken()
}
