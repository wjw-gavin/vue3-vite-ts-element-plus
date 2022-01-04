const state = {
  // 接口调用参数
  params: {
    pageNo: 1,
    pageSize: 10,
    options: {}
  },
  roles: {}, // 权限
  privileges: ['invoice_request_retry'],
  // 列表data数据
  total: 0,
  isLoading: false,
  tableData: [],
  searchData: [],
  multipleSelection: [],
  tableHeadList: [
    {
      label: '开票申请时间',
      prop: 'requestTime',
      width: 120,
      checked: 1
    },
    {
      label: '开票完成时间',
      prop: 'invoiceTime',
      width: 120,
      checked: 1
    },
    {
      label: '消费时间',
      prop: 'orderCreateTime',
      width: 120,
      slotName: 'orderCreateTime',
      checked: 1
    },
    {
      label: '账号',
      prop: 'userPhone',
      slotName: 'userPhone',
      checked: 1
    },
    {
      label: '订单号',
      prop: 'orderSn',
      width: 180,
      slotName: 'orderSn',
      checked: 1
    },
    {
      label: '渠道',
      prop: 'orderChannel',
      slotName: 'orderChannel',
      width: 150,
      checked: 1
    },
    {
      label: '发票类型',
      prop: 'invoiceType',
      checked: 1
    },
    {
      label: '开票状态',
      prop: 'statusDisplay',
      checked: 1
    },
    {
      label: '失败原因',
      prop: 'failureReason',
      width: 180,
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
  // 更新列表多选数据
  updateSelection(state, payload) {
    state.multipleSelection = payload
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
