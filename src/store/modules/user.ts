import { getUser } from '@/api/user'
import { USER } from '../typings'
const state = {
  // 用户信息
  userInfo: {}
}

const mutations = {
  // 更新用户信息
  updateUserInfo(state, payload) {
    state.userInfo = Object.assign({}, state.userInfo, payload)
  }
}

const actions = {
  getUserInfo: async ({ commit }) => {
    const data: any = await getUser()
    const result = <USER>{
      userId: data.userId,
      userName: data.name
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
