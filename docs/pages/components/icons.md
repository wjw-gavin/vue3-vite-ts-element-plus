## 图标使用

项目使用 [unplugin-icons](https://github.com/unplugin/unplugin-icons) 管理图标。

### 自定义 SVG 图标

将 SVG 文件放入 `src/icons/` 目录，即可通过 `<i-svg-{filename} />` 组件使用。

例如，`src/icons/404.svg` 对应使用：

```vue
<template>
  <i-svg-404 class="h-190px w-200px" />
</template>
```

### Element Plus 图标

Element Plus 图标通过 `@iconify-json/ep` 集成，可直接使用：

```vue
<template>
  <i-ep-user />
  <i-ep-lock />
</template>
```
