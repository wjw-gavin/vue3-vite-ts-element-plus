<template>
  <template v-for="item in menuList" :key="item.id">
    <el-menu-item
      v-if="!item.children || item.children.length === 0"
      :index="item.path"
      @click="handleSelect(item)"
    >
      <el-icon v-if="item.icon">
        <component :is="item.icon" />
      </el-icon>
      <template #title>{{ item.name }}</template>
    </el-menu-item>
    <el-sub-menu v-else :index="item.name!">
      <template #title>
        <el-icon v-if="item.icon">
          <component :is="item.icon" />
        </el-icon>
        <span>{{ item.name }}</span>
      </template>
      <!--  如果有子级数据使用递归组件 -->
      <menu-item :menu-list="item.children" />
    </el-sub-menu>
  </template>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import type { PropType } from 'vue'
import type { IMenuItem } from '../types'

defineOptions({
  name: 'OMenuItem'
})

defineProps({
  menuList: {
    type: Array as PropType<IMenuItem[]>,
    default: () => []
  }
})

const route = useRoute()
const router = useRouter()

const handleSelect = (item: IMenuItem) => {
  if (item.path === route.path) return
  router.push(item.path!)
}
</script>
