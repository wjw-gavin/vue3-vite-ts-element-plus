export default [
  {
    path: '/base/article',
    children: [
      {
        path: '',
        component: () => import('@/views/base/article/index.vue'),
        meta: {
          title: '文章管理',
          activePath: '/base/article'
        }
      },
      {
        path: 'add',
        component: () => import('@/views/base/article/add.vue'),
        meta: {
          title: '文章管理-添加',
          activePath: '/base/article'
        }
      },
      {
        path: 'edit/:id',
        component: () => import('@/views/base/article/add.vue'),
        meta: {
          title: '文章管理-编辑',
          activePath: '/base/article'
        }
      }
    ]
  }
]
