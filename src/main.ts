import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import './assets/styles/index.scss'
import './assets/styles/element-plus.scss'
import './assets/styles/element-theme.scss'
import dragDialog from './directives/dragDialog'

const app = createApp(App)

import { ElButton, ElInfiniteScroll, ElLoading, ElMessage, ElMessageBox } from 'element-plus'

// 全局组件
app.component(ElButton.name, ElButton)
const plugins = [ElInfiniteScroll, ElLoading, ElMessage, ElMessageBox]
plugins.forEach((plugin) => {
  app.use(plugin)
})

// 注册全局组件
const components: any = import.meta.globEager('./components/**/*.vue')
Object.keys(components).forEach((key: string) => {
  const component = components[key].default
  // 如果组件内定义name 则需要全局引用的
  if (component.name) {
    app.component(component.name, component)
  }
})

// 全局属性 
const $imgcdn = 'https://cdn.nucarf.cn/wxapp_taoyoubao/v1.0/images'
app.provide('imgcdn', $imgcdn)

app.use(dragDialog).use(router).use(store).mount('#app')
