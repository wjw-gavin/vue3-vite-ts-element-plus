import { createStore } from 'vuex'

// 自动导入Modules/ 模块
const customModules: any = {}
const customModuleFiles = import.meta.globEager('./modules/*.ts')

Object.keys(customModuleFiles).forEach((key: string) => {
  const module = customModuleFiles[key].default
  const moduleName: string = key.replace(/^\.\/(.*)\/(.*)\.\w+$/, '$2')
  customModules[moduleName] = module
})

// // 自动导入views/Module模块
const viewModules: any = {}
const viewModuleFiles = import.meta.globEager('../views/**/*.ts')
Object.keys(viewModuleFiles).forEach((key: string) => {
  const module = viewModuleFiles[key].default
  const moduleName: string = key.replace(/^\..\/(.*)\/(.*)\.\w+$/, '$2')
  viewModules[moduleName] = module
})

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    ...customModules,
    ...viewModules
  }
})
