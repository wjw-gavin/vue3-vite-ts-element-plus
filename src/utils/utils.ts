import { cloneDeep, assign } from 'lodash-es'
import { LocationQueryRaw } from 'vue-router'
import router from '@/router'

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
