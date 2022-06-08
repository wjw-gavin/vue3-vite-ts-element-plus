<template>
  <!-- 这里不能用div，否则折叠时文字不会折叠起来 -->
  <template v-for="item in menuList" :key="item.id">
    <el-menu-item
      v-if="!item.children || item.children.length === 0"
      :index="defaultMenus[item.id].path"
      @click="handleSelect(defaultMenus[item.id])"
    >
      <i class="iconfont" :class="defaultMenus[item.id].icon"></i>
      <template #title>{{ item.name }}</template>
    </el-menu-item>
    <el-sub-menu v-else class="g-submenu" :index="item.name">
      <template #title>
        <i class="iconfont" :class="defaultMenus[item.id].icon"></i>
        <span>{{ item.name }}</span>
      </template>
      <!--  如果有子级数据使用递归组件 -->
      <menu-item :menu-list="item.children" :default-menus="defaultMenus[item.id].children" />
    </el-sub-menu>
  </template>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useRouter, useRoute } from 'vue-router'

interface Route {
  id: string
  name: string
  children?: any[]
  path: string
}
export default defineComponent({
  name: 'MenuItem',
  props: {
    menuList: {
      type: Array as PropType<Route[]>,
      default: () => []
    },
    defaultMenus: {
      type: Object,
      default: () => ({})
    }
  },
  setup() {
    const route = useRoute()
    const router = useRouter()

    // 点击菜单
    const handleSelect = (item: Route) => {
      if (item.path === route.path) return
      router.push(item.path)
    }

    return {
      handleSelect
    }
  }
})
</script>

<style lang="scss" scoped>
.menu-container {
  position: fixed;
  left: 0;
  top: 50px;
  bottom: 0;
  z-index: 1500;
  box-sizing: border-box;
  background-color: #2e3759;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
}

.el-menu {
  border-right: 0;
  padding-bottom: 60px;

  &:not(.el-menu--collapse) {
    width: 220px;
  }

  .iconfont {
    margin-right: 18px;
    text-align: center;
    font-size: 16px;
    vertical-align: middle;
  }
}

.rightMenuBox {
  padding: 0 10px;
  text-align: center;

  .rightMenu {
    cursor: pointer;
  }
}
</style>
