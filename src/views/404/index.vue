<template>
  <div class="flex-center h-full">
    <svg-icon name="404" class="h-190px w-200px" />

    <div class="ml-12">
      <p class="font-medium text-4xl mb-4">404</p>
      <p class="mb-4 text-gray-500">抱歉，你访问的页面不存在</p>

      <el-button type="primary" @click="$router.push('/')">
        返回首页
      </el-button>
    </div>
  </div>
</template>
