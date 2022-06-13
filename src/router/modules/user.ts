const userRouter = [
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/user/index.vue'),
    meta: {
      title: '用户管理',
      activePath: '/role'
    }
  },
  {
    path: '/user/add',
    name: 'user/add',
    component: () => import('@/views/user/add.vue'),
    meta: {
      title: '用户管理-添加',
      activePath: '/user'
    }
  },
  {
    path: '/user/edit',
    name: 'user/edit',
    component: () => import('@/views/user/add.vue'),
    meta: {
      title: '用户管理-编辑',
      activePath: '/user'
    }
  }
]

export default userRouter
