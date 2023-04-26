import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== from.name) {
    NProgress.start()
  }

  window.document.title = to.meta.title
    ? `${to.meta.title} | offbeat-ui`
    : 'offbeat-ui'

  const isLogin = getToken()
  if (isLogin) {
    if (to.name === 'login') {
      next('/')
    } else {
      next()
    }
  } else if (to.name !== 'login') {
    next('/login')
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
