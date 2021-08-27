import { get } from '@/http/request'
import { USER } from '../typings'
const user = localStorage.user ? JSON.parse(localStorage.user) : {}
const state = {
  // 用户信息
  userInfo: user
}

const mutations = {
  // 更新用户信息
  updateUserInfo(state, payload) {
    state.userInfo = Object.assign({}, state.userInfo, payload)
    localStorage.user = JSON.stringify(state.userInfo)
  }
}

const actions = {
  getUserInfo: async ({ commit, state }) => {
    const system = 1
    const url = `company/user/getUser/${system}/${state.userInfo.userId}/${state.userInfo.companyId}`
    const data: any = await get(url)
    const result = <USER>{
      userId: data.userId,
      userName: data.userName,
      companyId: data.companyId
    }
    commit('updateUserInfo', result)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
