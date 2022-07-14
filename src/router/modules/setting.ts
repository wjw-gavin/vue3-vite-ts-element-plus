// 账户管理 路由
const settingRouter = [
  {
    path: '/set/password',
    name: '/set/password',
    component: () => import('@/views/setting/password/index.vue'),
    meta: {
      title: '修改密码',
      activePath: '/set/password'
    }
  }
]

export default settingRouter
