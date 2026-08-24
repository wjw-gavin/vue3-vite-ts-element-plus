import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        // target: 'http://localhost:3000',
        target: 'your domain',
        changeOrigin: true
      }
    }
  },
  plugins: [
    vue(),
    UnoCSS(),
    Icons({
      autoInstall: true,
      compiler: 'vue3',
      customCollections: {
        svg: FileSystemIconLoader('./src/icons')
      }
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass'
        }),
        IconsResolver({
          customCollections: ['svg']
        })
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Vite 7 默认使用 SCSS modern API
        additionalData: `@use "@/assets/styles/element-theme.scss" as *;`
      }
    }
  },
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        }
      }
    }
  }
})
