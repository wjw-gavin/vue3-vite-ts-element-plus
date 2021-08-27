<template>
  <el-container>
    <!-- 头部 -->
    <el-header style="height: 50px">
      <Header :is-collapse="isCollapse" />
    </el-header>

    <!-- 侧边菜单栏 -->
    <div class="aside">
      <Menu :active-menu="activeMenu" />
    </div>

    <!-- 主体内容 -->
    <el-main id="nucarf-main" :class="[isCollapse ? 'isCollapse' : '']">
      <el-scrollbar>
        <!-- 主体部分 -->
        <router-view />
      </el-scrollbar>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, computed, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { ElContainer, ElMain, ElScrollbar, ElHeader } from 'element-plus'
import Header from './Header.vue'
import Menu from './Menu/Menu.vue'
export default defineComponent({
  components: {
    ElContainer,
    ElMain,
    ElScrollbar,
    ElHeader,
    Header,
    Menu
  },
  setup() {
    const route = useRoute()
    const store = useStore()
    const activeMenu = ref('')
    watch(
      () => route,
      (val) => {
        const { meta } = val
        if (meta.activePath as string) {
          // 对应菜单激活 menu
          activeMenu.value = meta.activePath as string
        }
      },
      { immediate: true }
    )

    return {
      activeMenu,
      isCollapse: computed(() => store.state.layout.isCollapse)
    }
  }
})
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
  background-color: #2e3759;
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
  background-color: #2e3759;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
}

.el-menu:not(.el-menu--collapse) {
  width: 220px;
}

.el-main {
  height: 100%;
  margin-top: 50px;
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

  :deep(.el-scrollbar__view:not(.el-time-spinner__list)) {
    padding: 10px;
  }
}
</style>
