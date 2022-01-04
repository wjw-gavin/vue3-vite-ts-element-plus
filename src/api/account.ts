import { get, post, $put, $delete } from '@/http/request'

// 添加账户｜编辑账户
export function handleAccount(method, params) {
  if (method === 'post') {
    return post('/management/center/user', params)
  } else {
    return $put('/management/center/user', params)
  }
}

// 启用/禁用用户
export function changeUserStatus(params) {
  return $put('/management/center/user/status', params)
}

// 启用/禁用用户
export function getUserInfoById(id) {
  return get(`/management/center/user/${id}`)
}

// 获取角色列表
export function getRoleList(params) {
  return post('/management/center/role/list', params)
}

// 删除角色
export function deleteRole(id: number) {
  return $delete(`/management/center/role/${id}`)
}

// 获取权限数据
export function getRoleDetail(id: number | string) {
  return get(`/management/center/role/${id}`)
}

// 获取权限数据
export function getRoleData() {
  return get('/management/center/role/features')
}

// 添加角色｜编辑角色
export function handleRole(method: string, params) {
  if (method === 'post') {
    return post('/management/center/role', params)
  } else {
    return $put('/management/center/role', params)
  }
}

