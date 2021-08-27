const state = {
  // 接口调用参数
  params: {
    pageNo: 1,
    pageSize: 10,
    options: {}
  },
  roles: {}, // 权限
  privileges: ['order_export'],
  apiName: 'order',
  // 列表data数据
  total: 0,
  isLoading: false,
  tableData: [],
  searchData: [],
  tableHeadList: [
    {
      label: '订单号',
      prop: 'orderSN',
      width: 200,
      checked: 1
    },
    {
      label: '司机手机号',
      prop: 'memberMobile',
      checked: 1
    },
    {
      label: '油品',
      prop: 'fuelName',
      checked: 1
    },
    {
      label: '枪号',
      prop: 'gunNo',
      checked: 1
    },
    {
      label: '枪价（元/升）',
      prop: 'gunPrice',
      checked: 1
    },
    {
      label: '数量（升）',
      prop: 'fuelAmount',
      checked: 1
    },
    {
      label: '应付金额（元）',
      prop: 'payableTotalPrice',
      checked: 1
    },
    {
      label: '结算金额（元）',
      prop: 'settlementAmount',
      checked: 1
    },
    {
      label: '平台补贴金额（元）',
      prop: 'subsidyAmount',
      checked: 1
    },
    {
      label: '订单状态',
      prop: 'status',
      checked: 1
    },
    {
      label: '油站名称',
      prop: 'stationName',
      width: 200,
      checked: 1
    },
    {
      label: '订单时间',
      prop: 'createTimeStr',
      width: 150,
      checked: 1
    },
    {
      label: '交接班次',
      prop: 'turnOfWorkSchedule',
      checked: 1
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
  updateTableHeaderList(state, payload: any[]) {
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
