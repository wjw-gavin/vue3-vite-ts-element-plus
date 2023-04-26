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
      }
    ]
  }
]
