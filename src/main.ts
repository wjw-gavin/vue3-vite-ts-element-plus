import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import './assets/styles/index.scss'
import './plugins/element-plus'

const app = createApp(App)

// 注册自定义全局组件
const components: any = import.meta.globEager('./components/**/index.vue')
Object.keys(components).forEach((key: string) => {
  const component = components[key].default
  // 如果组件内定义name 则需要全局引用的
  if (component.name) {
    app.component(component.name, component)
  }
})

// 全局注册Icon图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// // 全局属性
// const $imgcdn = 'https://'
// app.provide('imgcdn', $imgcdn)

app.use(router).use(store).mount('#app')
