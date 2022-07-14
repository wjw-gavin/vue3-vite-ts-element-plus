<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useEventListener, useDebounceFn } from '@vueuse/core'
import { useStore } from 'vuex'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

export default defineComponent({
  setup() {
    const { commit } = useStore()
    const locale = zhCn

    const baseWidth = 992
    const clientWidth = document.documentElement.clientWidth
    commit('layout/updateCollapse', clientWidth < baseWidth ? true : false)

    const resizeFun = () => {
      const clientWidth = document.documentElement.clientWidth
      commit('layout/updateCollapse', clientWidth < baseWidth ? true : false)
    }

    const debounceResize = useDebounceFn(resizeFun, 300)

    onMounted(() => {
      // 视图发生变化更新菜单折叠状态
      useEventListener(window, 'resize', debounceResize)
    })
    return {
      locale
    }
  }
})
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
