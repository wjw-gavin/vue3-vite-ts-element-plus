import { isArray, filter, indexOf } from 'lodash-es'
import store from '../index'
import api from '@/utils/pageType/api'
import { getPrivileges, getSearchData, getTableData } from '@/api/index'
import search from '@/utils/pageType/search' // 每个页面搜索type

const state = {
  count: 2 // 列表依赖搜索数据
}
const actions = {
  getPrivileges: async ({ commit, state }, payload: string) => {
    const privileges = store.state[payload].privileges
    if (isArray(privileges) && privileges.length > 0) {
      const params = {
        privileges: privileges.join(',')
      }
      const data = await getPrivileges(params)
      store.commit(`${payload}/updateRoles`, data)
      commit('updateCount', --state.count)
    } else {
      commit('updateCount', --state.count)
    }
  },
  getSearchData: async ({ commit, state }, payload: string) => {
    const searchType = search[window.location.pathname]
    if (!searchType) {
      setTimeout(() => {
        commit('updateCount', --state.count)
      }, 0)
      return
    }
    store.commit(`${payload}/updateLoading`, true)
    const data: any = await getSearchData(searchType)
    // 配置默认值 start
    const options = store.state[payload].params.options
    data.forEach((item) => {
      if (item.defaultValue) {
        options[item.paramName] = item.defaultValue
      }
    })
    store.commit(`${payload}/updateParams`, { options: options })
    // 配置默认值 end
    store.commit(`${payload}/updateSearchData`, data)
    commit('updateCount', --state.count)
  },

  getTableData: async ({ commit }, payload: string) => {
    store.commit(`${payload}/updateLoading`, true)
    const apiName = store.state[payload].apiName
    let apiUrl = ''
    const index = apiName.indexOf('/')
    if (index > -1) {
      apiUrl = `${api[apiName.split('/')[0]]}/${apiName.slice(index + 1)}`
    } else {
      apiUrl = api[apiName]
    }
    const params = store.state[payload].params
    const data: any = await getTableData(apiUrl, params)
    commit('updateCount', --state.count)
    store.commit(`${payload}/updateLoading`, false)
    store.commit(`${payload}/updateTotal`, data.totalCount as number)
    store.commit(`${payload}/updateTableData`, data.list ? data.list : (data as []))
    if (data.hideColumn) {
      const headerList = store.state[payload].tableHeadList
      const headerListFiltered = filter(headerList, function (item) {
        return indexOf(data.hideColumn, item.prop) === -1
      })
      store.commit(`${payload}/updateTableHeaderList`, headerListFiltered)
    }
    if (data.list_header) {
      store.commit(`${payload}/updateTableHeaderList`, data.list_header)
    }
  }
}

const mutations = {
  updateCount(state, payload: number) {
    state.count = payload
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
