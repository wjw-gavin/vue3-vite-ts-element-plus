import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'vue3-element-plus',
  description: '精简的后台管理系统模板',
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      {
        text: '了解更多',
        items: [
          { text: 'Vue3 文档', link: 'https://vuejs.org/' },
          { text: 'VitePress 文档', link: 'https://vitepress.dev/' }
        ]
      }
    ],
    sidebar: {
      '/pages/': [
        {
          text: '指南',
          items: [
            { text: '项目介绍', link: '/pages/guide/directory-structure' },
            { text: '快速上手', link: '/pages/guide/start' }
          ]
        },
        {
          text: '组件',
          items: [
            { text: 'table', link: '/pages/components/table' },
            { text: 'layout', link: '/pages/components/layout' },
            { text: 'select', link: '/pages/components/select' },
            { text: 'search', link: '/pages/components/search' },
            { text: 'svg-icon', link: '/pages/components/svg-icon' },
            { text: 'form-wrap', link: '/pages/components/form-wrap' }
          ]
        },
        {
          text: '其他',
          items: [{ text: '开发中', link: '/pages/doing' }]
        }
      ]
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/wjw-gavin/vue3-vite-ts-element-plus'
      }
    ],
    footer: {
      message: 'MIT License.',
      copyright: 'Copyright © 2023 Gavin'
    }
  }
})
