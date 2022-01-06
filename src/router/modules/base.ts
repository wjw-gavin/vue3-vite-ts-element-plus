// 账户管理 路由
const statementRouter = [
  {
    path: '/base/mock',
    name: 'base/mock',
    component: () => import('@/views/base/mock/index.vue'),
    meta: {
      title: 'mock数据',
      activePath: '/base/mock'
    }
  }
]

export default statementRouter
