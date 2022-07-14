const state = {
  // 接口调用参数
  params: {
    page: 1,
    pageSize: 10,
    options: {}
  },
  roles: {}, // 权限
  apiName: 'roles',
  privileges: ['role_add', 'role_export', 'role_import'],
  // 列表data数据
  total: 0,
  isLoading: false,
  tableData: [],
  searchData: [],
  tableHeadList: [
    {
      label: '角色名称',
      prop: 'name'
    },
    {
      label: '角色描述',
      prop: 'description'
    },
    {
      label: '员工数量',
      prop: 'count',
      slotName: 'count'
    },
    {
      label: '创建时间',
      prop: 'create_time'
    }
  ]
}

// getters
const getters = {}

// actions
const actions = {}

// mutations
const mutations = {
  // 更新页面搜索内容
  updateSearchData(state, payload: any[]) {
    state.searchData = payload
  },
  // 更新表格 loading 状态
  updateLoading(state, payload: boolean) {
    state.isLoading = payload
  },
  // 更新数据总条数
  updateTotal(state, payload: number) {
    state.total = payload
  },
  // 更新data数据
  updateTableData(state, payload: any[]) {
    state.tableData = payload
  },
  // 更新列表表头数据
  updateEditTableList(state, payload: any[]) {
    state.tableHeadList = payload
  },
  // 更新列表参数数据
  updateParams(state, payload: Record<string, any>) {
    state.params = Object.assign({}, state.params, payload)
  },
  // 更新权限
  updateRoles(state, payload: Record<string, boolean>) {
    state.roles = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
