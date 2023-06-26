:::warning
文档目前还不完善，努力更新中...
:::

# 说明

该项目是从自己的项目中整理出来的，因个人能力有限，一些设计和处理或许欠佳，还请大佬们指正。旨在能给大家一些参考之处。

# 目录介绍

```txt
├── src
│   ├── api                           // 请求后台 api
│   ├── assets                        // 放置一些静态资源
│   │     │── images                  // 图片资源
│   │     │── styles                  // 样式资源
│   │     │    └── element-plus.scss  // 覆盖 element-plus 原有样式
│   │     │    └── element-theme.scss // 主题颜色
│   │     │    └── index.scss         // 全局样式
│   │     │── svg                     // svg 文件
│   ├── components                    // 全局的公共组件，main.ts 自动注入
│   ├── directives                    // 指令
│   ├── hooks                         // 封装的一些 hook
│   ├── http                          // axios 封装请求，统一处理接口请求
│   ├── layout                        // 主题布局
│   ├── router                        // 路由
│   │     │── modules                 // 路由模块 （store 接口相同）
│   │     │── index.ts                // 路由守卫
│   │     │── routes.ts               // 自动导入所有路由
│   ├── stores                        // 状态管理 Pinia 相关
│   ├── types                         // 一些数据类型
│   ├── utils                         // 常用的工具方法
│   │     └── auth.ts                 // Cookie 方法
│   │     └── basic.ts                // 工具方法
│   │     └── elementPlus.ts          // 二次封装 element 方法
│   │     └── elValidation.ts         // element from 表单校验方法封装
│   ├── views                         // 系统页面
```
