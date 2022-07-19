import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// import visualizer from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // visualizer({
    //   // 打包后自动打开分析报告
    //   open: true
    // }),
    AutoImport({
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass'
        })
      ]
    }),
    Components({
      dts: true,
      types: [
        {
          from: 'vue-router',
          names: ['RouterLink', 'RouterView']
        }
      ],
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass'
        })
      ],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/]
    })
  ],
  server: {
    port: 4000,
    proxy: {
      '/mock': {
        target: 'http://yapi.smart-xwork.cn',
        changeOrigin: true
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/styles/element-theme.scss" as *;`
      }
    },
    postcss: {
      plugins: [require('autoprefixer'), require('tailwindcss'), require('postcss-import')]
    }
  },
  // 分割打包
  build: {
    sourcemap: false, // 开启 CSS source maps
    // Turning off brotliSize display can slightly reduce packaging time
    brotliSize: false,
    chunkSizeWarningLimit: 2000,
    // rollupOptions: {
    //   output: {
    //     // 分割打包
    //     manualChunks(id) {
    //       if (id.includes('node_modules')) {
    //         const path = id.toString().split('node_modules/')[2]
    //         const name = path.split('/')[0].toString()
    //         return name
    //       }
    //     }
    //   }
    // },
    commonjsOptions: {
      requireReturnsDefault: 'namespace' // 要求ES模块返回其名称空间，但插件不添加标记，从而创建更高效的代码
    }
  }
})
