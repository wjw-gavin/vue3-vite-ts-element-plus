import { getUserInfo } from '@/api/user'
import { USER } from '../types'
const localUser = localStorage.getItem('user')
const state = {
  // 用户信息
  userInfo: localUser ? JSON.parse(localUser) : {}
}

const mutations = {
  // 更新用户信息
  updateUserInfo(state, payload) {
    state.userInfo = Object.assign({}, state.userInfo, payload)
    localStorage.setItem('user', JSON.stringify(state.userInfo))
  }
}

const actions = {
  getUserInfo: async ({ state, commit }) => {
    const data: USER = await getUserInfo(state.userInfo.id)
    commit('updateUserInfo', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
