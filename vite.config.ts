import { UserConfigExport, ConfigEnv } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default ({ command }: ConfigEnv): UserConfigExport => {
  return {
    plugins: [
      vue(),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: command === 'serve'
      })
    ],
    server: {
      port: 4000,
      proxy: {
        '/management': {
          target: 'https://tyb.nucarf.tech',
          changeOrigin: true //是否跨域
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
          additionalData: `@use "src/assets/styles/var.scss" as *;`
        }
      },
      postcss: {
        plugins: [require('autoprefixer'), require('tailwindcss'), require('postcss-import')]
      }
    },
    // 分割打包
    build: {
      sourcemap: false, // 开启 CSS source maps
      rollupOptions: {
        external: ['el-button', 'ElButton'],
        output: {
          // 分割打包
          manualChunks(id) {
            if (id.includes('node_modules')) {
              const path = id.toString().split('node_modules/')[1]
              const name = path.split('/')[0].toString()
              return name
            }
          }
        }
      },
      commonjsOptions: {
        requireReturnsDefault: 'namespace' // 要求ES模块返回其名称空间，但插件不添加标记，从而创建更高效的代码
      }
    }
  }
}
