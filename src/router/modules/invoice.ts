// 订单管理 路由
const invoiceRouter = [
  {
    path: '/invoice',
    name: 'invoice',
    component: () => import('@/views/invoice/invoice/index.vue'),
    meta: {
      title: '订单列表',
      activePath: '/invoice'
    }
  },
  {
    path: '/invoice/add',
    name: 'invoice/add',
    component: () => import('@/views/invoice/invoice/add.vue'),
    meta: {
      title: '开具发票',
      activePath: '/invoice'
    }
  },
  {
    path: '/invoice/request',
    name: 'invoice/request',
    component: () => import('@/views/invoice/request/index.vue'),
    meta: {
      title: '开票记录',
      activePath: '/invoice/request'
    }
  },
  {
    path: '/invoice/request/retry',
    name: 'invoice/request/retry',
    component: () => import('@/views/invoice/request/retry.vue'),
    meta: {
      title: '开票重试',
      activePath: '/invoice/request'
    }
  }
]

export default invoiceRouter
