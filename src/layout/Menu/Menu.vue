<template>
  <el-scrollbar class="menu-container">
    <el-menu :collapse="isCollapse" :default-active="activeMenu" unique-opened>
      <o-menu-item :menu-list="menuList" />
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useLayoutStore } from '@/stores/layout'
import { getMenus } from '../../api/common'
import OMenuItem from './MenuItem.vue'
import type { IMenuItem } from '../types'

defineOptions({
  name: 'OMenu'
})

const route = useRoute()
const activeMenu = ref('')
const store = useLayoutStore()
const menuList = ref<IMenuItem[]>([])

const isCollapse = computed(() => store.isCollapse)

const getMenu = async () => {
  const data = await getMenus()
  menuList.value = data || []
}

onBeforeMount(() => {
  getMenu()
})

watch(
  () => route,
  (val) => {
    const { meta } = val
    activeMenu.value = meta.activePath as string
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
  z-index: 2100;
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
