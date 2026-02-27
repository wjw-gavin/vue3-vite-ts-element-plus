<template>
  <div class="h-full flex-center">
    <i-svg-404 class="h-190px w-200px" />

    <div class="ml-12">
      <p class="mb-4 text-4xl font-medium">404</p>
      <p class="mb-4 text-gray-500">抱歉，你访问的页面不存在</p>

      <el-button type="primary" @click="$router.push('/')">
        返回首页
      </el-button>
    </div>
  </div>
</template>
