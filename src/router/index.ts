import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { setToken, getToken } from '@/utils/auth'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes
})

NProgress.configure({
  // 动画方式
  easing: 'ease',
  // 是否显示加载ico
  showSpinner: false,
  // 自动递增间隔
  trickleSpeed: 200,
  // 初始化时的最小百分比
  minimum: 0.3
})

// 导航守卫
router.beforeEach((to, from, next) => {
  // 页面加载进度条
  if (to.name !== from.name) {
    NProgress.start()
  }
  window.document.title = to.meta.title ? `${to.meta.title} | 淘油宝运营系统` : '淘油宝运营系统'

  const query: any = to.query
  if (query.nToken && query.path) {
    setToken(query.nToken)
    next(query.path)
  } else {
    const isLogin = getToken()
    if (isLogin) {
      if (to.name === 'login') {
        next('/')
      } else {
        next()
      }
    } else {
      if (to.name !== 'login') {
        next('/login')
      } else {
        next()
      }
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
export default router
