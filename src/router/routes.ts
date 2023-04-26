import 'vue-router'

/**
 * path:'router-name'             跳转地址
 * name:'router-name'             如果用到<keep-alive>，必须设置该属性
 * meta : {
    title: 'title'                用于设置网页标签显示的标题
    activePath: '',               用于记录菜单活动状态
    keepAilve: true               是否缓存，默认 false
  }
 */

const routes: any[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/',
    name: 'Layout',
    redirect: '/home',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          activePath: '/home'
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/views/404/index.vue'),
    meta: {
      activePath: '/404'
    }
  }
]

// 导入模块路由
const routeModuleFiles = import.meta.glob('./modules/*.ts', { eager: true })
Object.keys(routeModuleFiles).forEach((key: string) => {
  const module: any = routeModuleFiles[key]
  module.default.forEach((route: any) => {
    routes[1].children.push(route)
  })
})

export default routes

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    icon?: string
    activePath?: string
  }
}
