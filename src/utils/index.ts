import { cloneDeep, assign } from 'lodash-es'
import { LocationQueryRaw } from 'vue-router'
import router from '@/router'

import { ElMessageBox, ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message-box.css'
import 'element-plus/theme-chalk/el-message.css'
import { IMessageBox } from './types'

/**
 * @Description: 根据地址下载文件
 * @param : href  下载链接
 * @param : title  文件名称
 */
export function download(href: string, title: string) {
  const a = document.createElement('a')
  a.style.display = 'none'
  a.setAttribute('href', href)
  a.setAttribute('download', title ? title : '')
  // 随机字符串id
  const randomId: string = Math.random().toString(36).substring(2)
  a.id = randomId
  document.body.appendChild(a)
  a.click()
  a.remove()
}

// 在url上设置参数，如点击分页时记录分页信息
export function updateUrlParams(params: Record<string, unknown>) {
  const route = router.currentRoute.value
  const query = cloneDeep(route.query)
  router.replace({
    query: assign(query, params)
  })
}
/**
 * @Description: 新建、编辑等跳转
 * @param : { path } 路由
 * @param : { query } 参数对象  如{id: 1}
 */
export function goPage(path = '/', query?: LocationQueryRaw) {
  router.push({
    path: path,
    query: query
  })
}
/**
 * @Description: ElMessage，不用每次都手动导入 el 组件和 scss 文件
 * @param: { message } 提示信息
 * @param : { confirm } 点击确定回调
 */
export function message(
  message: string,
  type?: 'success' | 'warning' | 'info' | 'error',
  duration?: number
) {
  ElMessage({
    message: message,
    type: type || 'error',
    duration: duration
  })
}
/**
 * @Description: ElMessageBox.confirm
 * 为什么不直接用？因为官方 ElMessageBox.confirm 弹出后确认按钮会自动 focus 状态误认为不可点击
 * https://github.com/element-plus/element-plus/issues/6773
 */
export function messageBoxConfirm(option: IMessageBox) {
  ElMessageBox({
    title: option.title || '提示',
    message: option.message,
    showCancelButton: option.showCancelButton || true
  }).then(() => {
    option.confirm && option.confirm()
  })
}
