import {
  defineConfig,
  presetAttributify,
  presetUno,
  transformerCompileClass,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'

export default defineConfig({
  presets: [presetUno(), presetAttributify()],
  transformers: [
    transformerCompileClass(),
    transformerVariantGroup(),
    transformerDirectives()
  ],
  theme: {
    colors: {
      primary: 'var(--el-color-primary)',
      success: 'var(--el-color-success)',
      warning: 'var(--el-color-warning)',
      danger: 'var(--el-color-danger)'
    }
  },
  shortcuts: [
    {
      ellipsis: 'truncate',
      hover: 'cursor-pointer op100 hover:op70 transition-all',
      divider: 'border-b border-base',
      'flex-col': 'flex flex-col',
      'border-base': 'border-gray-500:10',
      'flex-center': 'flex justify-center items-center'
    }
  ],
  rules: [
    ['shadow', { 'box-shadow': '0px 2px 12px 0 rgba(0, 0, 0, .1)' }],
    [
      'p-c',
      {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`
      }
    ]
  ]
})
