import { cloneDeep, assign, pull } from 'lodash-es'
import store from '@/store'
import router from '@/router'

/**
 * @Description: 格式化金额
 */
export function moneyFormat(num: number | string) {
  num = num || '0'
  return (num + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * @Description: 根据地址下载文件
 * @param: href  下载链接
 * @param: title  文件名称
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
export function updateUrlParams(params: Record<string, unknown>, flag?: string) {
  params.page = flag === 'search' ? 1 : params.page
  const route = router.currentRoute.value
  const query = cloneDeep(route.query)
  router.replace({
    query: assign(query, params)
  })
}

/**
 * @Description: 列表页的共用删除方法
 * 处理了可选择列表分页多选及删除的问题
 * 处理了列表删除最后一页数据后，分页显示不正常的问题
 */
export function updateTableByDel(storeModelName: string, row?: any) {
  /**
   * @Description: 列表页的共用删除方法
   * 处理了可选择列表多选及删除的问题
   * 处理了列表删除最后一页数据后，分页显示不正常的问题，
   * @param storeModelName 当前storeModelName
   * @param row 删除的列，当存在多选删除时必填
   */

  const total = store.state[storeModelName].total // 总条数
  const params = store.state[storeModelName].params // 请求数据的分页参数
  const pages = Math.ceil((total - 1) / params.per_page) // 删除后，数据总页数
  let currentPage = Number(params.page) > pages ? pages : Number(params.page) // 如果当前页完全删除，跳转到上一页
  currentPage = currentPage < 1 ? 1 : currentPage

  if (Number(currentPage) !== Number(params.page)) {
    updateUrlParams({ page: currentPage })
    store.commit(`${storeModelName}/updateParams`, { page: currentPage })
  }

  if (row) {
    const multipleSelection = store.state[storeModelName].multipleSelection
    store.commit(`${storeModelName}/updateSelection`, pull(multipleSelection, row.id))
  }

  store.dispatch('data/getTableData', storeModelName)
}
