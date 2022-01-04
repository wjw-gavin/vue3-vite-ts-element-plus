const state = {
  // 接口调用参数
  params: {
    pageNo: 1,
    pageSize: 10,
    options: {}
  },
  roles: {}, // 权限
  privileges: ['invoice_order_invoice', 'invoice_order_send_invoice_sms'],
  // 列表data数据
  total: 0,
  isLoading: false,
  tableData: [],
  searchData: [],
  tableHeadList: [
    {
      label: '订单ID',
      prop: 'orderId',
      checked: 1
    },
    {
      label: '消费时间',
      prop: 'orderCreateTime',
      width: 150,
      checked: 1
    },
    {
      label: '支付订单号',
      prop: 'paySn',
      width: 200,
      checked: 1
    },
    {
      label: '账号',
      prop: 'userPhone',
      width: 120,
      checked: 1
    },
    {
      label: '油品',
      prop: 'fuel',
      checked: 1
    },
    {
      label: '数量（升）',
      prop: 'fuelAmount',
      checked: 1
    },
    {
      label: '万金油单价（元）',
      prop: 'fuelPrice',
      checked: 1
    },
    {
      label: '开票金额（元）',
      prop: 'invoiceAmount',
      checked: 1
    },
    {
      label: '订单状态',
      prop: 'orderStatus',
      checked: 1
    },
    {
      label: '开票状态',
      prop: 'invoiceStatus',
      checked: 1
    },
    {
      label: '所属公司',
      prop: 'orderChannel',
      checked: 1
    },
    {
      label: '订单SN',
      prop: 'orderSn',
      width: 150,
      checked: 1
    },
    {
      label: '支付渠道',
      prop: 'payChannel',
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
