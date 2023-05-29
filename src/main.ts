import { type Component, createApp } from 'vue'
import { createPinia } from 'pinia'

// 注册 svg 图标
import 'virtual:svg-icons-register'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import { directives } from '@/directives'
import App from './App.vue'
import router from './router'

import 'uno.css'
import './assets/styles/index.scss'
import './assets/styles/element-plus.scss'
import './plugins/element-plus'

const app = createApp(App)

// 注册自定义组件
const components: Component = import.meta.glob('@/components/*/index.vue', {
  eager: true
})
Object.keys(components).forEach((key: string) => {
  const component = components[key].default
  // 如果组件内定义name 则需要全局引用的
  if (component.name) {
    app.component(component.name, component)
  }
})

// 注册图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 注册指令
directives(app)

app.use(createPinia())
app.use(router)

app.mount('#app')
