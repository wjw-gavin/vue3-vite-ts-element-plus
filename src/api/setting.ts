import { post } from '@/http/request'

// 菜单
export function resetPwd(params) {
  return post('/management/center/reset/pwd', params)
}
