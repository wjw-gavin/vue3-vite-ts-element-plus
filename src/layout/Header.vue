<template>
  <div class="flex items-center">
    <el-icon
      class="cursor-pointer"
      :size="25"
      color="#fff"
      @click="handleCollapse"
    >
      <expand v-if="isCollapse" />
      <fold v-else />
    </el-icon>
    <span class="ml-3"> Offbeat 管理系统 </span>
  </div>
  <div class="flex justify-end">
    <el-link
      class="c-white mr-5"
      href="https://github.com/wjw-gavin/vue3-vite-ts-element-plus"
      target="_blank"
      :underline="false"
    >
      Github
    </el-link>
    <el-dropdown>
      <div class="el-dropdown-link flex-center">
        <el-avatar :src="user.avatar || avatar" />
        <span class="name ml-2">{{ user.name }}</span>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleLogout"> 退出登录 </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useLayoutStore } from '@/stores/layout'
import { useUserStore } from '@/stores/user'
import { clearLocal, confirmBox } from '@/utils'
import router from '@/router'
import avatar from '@/icons/avatar.svg'

defineOptions({
  name: 'OHeader'
})

const userStore = useUserStore()
const layoutstore = useLayoutStore()

const user = computed(() => userStore.user)
const isCollapse = computed(() => layoutstore.isCollapse)

const handleCollapse = () => {
  layoutstore.updateCollapse(!layoutstore.isCollapse)
}

const handleLogout = () => {
  confirmBox('确认退出当前账户吗？', '提示', {
    autofocus: false,
    type: 'warning'
  }).then(() => {
    // await logout()
    clearLocal()
    router.push('/login')
  })
}
</script>

<style lang="scss" scoped>
:deep(.el-dropdown) {
  color: #fff;
  cursor: pointer;

  :deep(.el-dropdown-menu__item) {
    font-weight: 400;
  }
}
</style>
