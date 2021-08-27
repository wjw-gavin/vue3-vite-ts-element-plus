<template>
  <el-scrollbar class="menu-container">
    <el-menu :collapse="isCollapse" :default-active="activeMenu" unique-opened>
      <MenuItem :menu-list="menuList" :default-menus="defaultMenus" />
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { ElScrollbar, ElMenu } from 'element-plus'
import MenuItem from './MenuItem.vue'
import menus from '@/utils/menus'
import { getMenus } from '@/api/index'
export default defineComponent({
  components: {
    ElScrollbar,
    ElMenu,
    MenuItem
  },
  props: {
    activeMenu: {
      type: String,
      default: '/'
    }
  },
  setup() {
    const store = useStore()
    const menuList = ref<any>([])

    // 获取菜单
    const getMenuList = () => {
      getMenus().then((res: any) => {
        const customMenus = [
          {
            id: 'home',
            name: '首页'
          },
          {
            id: 'mock',
            name: 'mock测试'
          }
        ]
        // res.unshift()
        // const result = customMenus.concat(res as any[])
        menuList.value = [...customMenus, ...res]
      })
    }
    getMenuList()

    return {
      menuList,
      defaultMenus: menus,
      isCollapse: computed(() => store.state.layout.isCollapse)
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
