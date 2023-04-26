<template>
  <el-scrollbar class="menu-container">
    <el-menu :collapse="isCollapse" :default-active="activeMenu" unique-opened>
      <o-menu-item :menu-list="menuList" />
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useLayoutStore } from '@/stores/layout'
import OMenuItem from './MenuItem.vue'
import type { IMenuItem } from '../types'

defineOptions({
  name: 'OMenu'
})

const route = useRoute()
const activeMenu = ref('')
const store = useLayoutStore()
const menuList = ref<IMenuItem[]>([
  {
    id: 'home',
    name: '首页',
    icon: 'HomeFilled',
    url: '/home'
  },
  {
    id: 'system',
    name: '系统管理',
    icon: 'Management',
    children: [
      {
        id: 'role',
        name: '角色管理',
        url: '/system/role'
      }
    ]
  }
])

const isCollapse = computed(() => store.isCollapse)

watch(
  () => route,
  (val) => {
    const { meta } = val
    activeMenu.value = meta.activePath!
  },
  { immediate: true, deep: true }
)
</script>

<style lang="scss" scoped>
.menu-container {
  position: fixed;
  left: 0;
  top: 60px;
  bottom: 0;
  z-index: 1500;
  height: calc(100% - 60px);
  overflow-y: auto;
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
}

.el-menu {
  border-right: 0;

  &:not(.el-menu--collapse) {
    width: 220px;
  }
}
</style>
