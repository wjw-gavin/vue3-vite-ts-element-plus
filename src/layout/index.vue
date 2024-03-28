<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <o-header />
    </el-header>

    <!-- 侧边菜单栏 -->
    <o-menu />

    <!-- 主体内容 -->
    <el-main :class="[layoutStore.isCollapse ? 'isCollapse' : '']">
      <el-scrollbar class="main-scrollbar">
        <!-- 主体部分 -->
        <router-view />
      </el-scrollbar>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import { useLayoutStore, useUserStore } from '@/stores'
import OHeader from './Header.vue'
import OMenu from './Menu/Menu.vue'

const layoutStore = useLayoutStore()
const usestore = useUserStore()

usestore.getUser()
</script>

<style scoped lang="scss">
.el-container {
  height: 100%;
}

.el-header {
  position: fixed;
  width: 100%;
  z-index: 1501;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  background-color: #162746;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  p {
    margin: 0;
    line-height: 60px;
  }
}

.aside {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
  box-sizing: border-box;
  background-color: var(--el-color-primary);
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
}

.el-menu:not(.el-menu--collapse) {
  width: 220px;
}

.el-main {
  height: 100%;
  margin-top: 60px;
  margin-left: 220px;
  padding: 0;
  overflow: hidden;
  position: relative;
  perspective: none;
  backface-visibility: hidden;
  transition: 0.3s margin-left ease-in-out;

  &.isCollapse {
    margin-left: 64px;
  }

  :deep(.main-scrollbar) {
    & > .el-scrollbar__wrap {
      & > .el-scrollbar__view {
        padding: 10px;
      }
    }
  }
}
</style>
@/stores/modules/layout@/stores/modules/user
