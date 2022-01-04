// 账户管理 路由
const accountRouter = [
  {
    path: '/account',
    name: 'account',
    component: () => import('@/views/account/account/index.vue'),
    meta: {
      title: '账户列表',
      activePath: '/account'
    }
  },
  {
    path: '/account/add',
    name: 'account/add',
    component: () => import('@/views/account/account/add.vue'),
    meta: {
      title: '账户-添加',
      activePath: '/account'
    }
  },
  {
    path: '/account/edit',
    name: 'account/edit',
    component: () => import('@/views/account/account/add.vue'),
    meta: {
      title: '账户-编辑',
      activePath: '/account'
    }
  },
  {
    path: '/role',
    name: 'role',
    component: () => import('@/views/account/role/index.vue'),
    meta: {
      title: '角色管理',
      activePath: '/role'
    }
  },
  {
    path: '/role/add',
    name: 'role/add',
    component: () => import('@/views/account/role/add.vue'),
    meta: {
      title: '角色-添加',
      activePath: '/role'
    }
  },
  {
    path: '/role/edit',
    name: 'role/edit',
    component: () => import('@/views/account/role/add.vue'),
    meta: {
      title: '角色-编辑',
      activePath: '/role'
    }
  }
]

export default accountRouter
