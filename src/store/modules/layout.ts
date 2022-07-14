const state = {
  // 导航栏菜单是否隐藏
  isCollapse: false
}

const mutations = {
  // 更新二级导航显示隐藏
  updateCollapse(state, payload) {
    state.isCollapse = payload
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
