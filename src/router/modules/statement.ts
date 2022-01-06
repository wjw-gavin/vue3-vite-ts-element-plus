// 账户管理 路由
const statementRouter = [
  {
    path: '/statement/chart',
    name: 'statement/chart',
    component: () => import('@/views/statement/chart/index.vue'),
    meta: {
      title: '图表',
      activePath: '/statement/chart'
    }
  }
]

export default statementRouter
