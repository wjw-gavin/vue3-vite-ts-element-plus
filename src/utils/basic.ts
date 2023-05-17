import { assign, cloneDeep } from 'lodash-es'
import router from '@/router'

// 在url上设置参数，如点击分页时记录分页信息
export function setUrlParams(params: Record<string, unknown>, type?: string) {
  if (params.page) {
    params.page = type === 'search' ? 1 : params.page
  }

  const route = router.currentRoute.value
  const query = cloneDeep(route.query)
  router.replace({
    query: assign(query, params)
  })
}
