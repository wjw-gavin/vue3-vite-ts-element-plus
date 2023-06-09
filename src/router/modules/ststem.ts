export default [
  {
    path: '/system',
    children: [
      {
        path: 'role',
        component: () => import('@/views/system/role/index.vue'),
        meta: {
          title: '角色管理',
          activePath: '/system/role'
        }
      },
      {
        path: 'role/add',
        component: () => import('@/views/system/role/index.vue'),
        meta: {
          title: '角色管理-添加',
          activePath: '/system/role'
        }
      },
      {
        path: 'role/edit/:id',
        component: () => import('@/views/system/role/add.vue'),
        meta: {
          title: '角色管理-编辑',
          activePath: '/system/role'
        }
      }
    ]
  }
]
