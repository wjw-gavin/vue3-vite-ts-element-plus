import { createApp } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'
import { directives } from '@/directives'
import router from './router'
import App from './App.vue'

import 'uno.css'
import './assets/styles/index.scss'
import './assets/styles/element-plus.scss'
import './plugins/element-plus'

const app = createApp(App)

// 注册自定义组件
const components: Record<string, any> = import.meta.glob('@/components/*/index.vue', {
  eager: true
})
Object.keys(components).forEach((key: string) => {
  const component = components[key].default
  if (component.name) {
    app.component(component.name, component)
  }
})

// 注册 Element Plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 注册指令
directives(app)

app.use(createPinia())
app.use(router)

app.mount('#app')
