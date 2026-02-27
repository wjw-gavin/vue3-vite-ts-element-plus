import antfu from '@antfu/eslint-config'

export default antfu(
  {
    vue: true,
    unocss: true,
    formatters: {
      css: true,
      html: true,
      markdown: true,
    },
    ignores: [
      'dist',
      'public',
      '**/*.json',
      '**/*.d.ts',
      'node_modules',
      'pnpm-lock.yaml',
      '.gitlab-ci.yml',
      'package-lock.json',
    ],
  },
  {
    rules: {
      'no-console': 'off',
      'style/comma-dangle': ['error', 'never'],
      'style/no-tabs': 'off',
      'style/brace-style': ['error', '1tbs'],

      'antfu/top-level-function': 'off',

      'vue/comma-dangle': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/block-order': [
        'error',
        {
          order: ['template', 'script', 'style'],
        },
      ],
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: 3,
          multiline: 1,
        },
      ],
      'vue/component-name-in-template-casing': [
        'error',
        'kebab-case',
      ],

      'perfectionist/sort-imports': [
        'error',
        {
          type: 'natural',
          order: 'asc',
          ignoreCase: true,
          newlinesBetween: 0,

          groups: [
            'vue',
            ['builtin', 'external'],
            'internal',
            'type',
            'hooks',
            'utils',
            'relative',
            'components',
            'vue-components',
          ],

          customGroups: [
            {
              groupName: 'vue',
              elementNamePattern: ['^vue$', '^@vue/'],
            },
            {
              groupName: 'external',
              elementNamePattern: ['^@?\\w'],
            },
            {
              groupName: 'internal',
              elementNamePattern: ['^@/api', '^@/stores', '^@/constants'],
            },
            {
              groupName: 'hooks',
              elementNamePattern: ['^@/hooks'],
            },
            {
              groupName: 'utils',
              elementNamePattern: ['^@/utils'],
            },
            {
              groupName: 'components',
              elementNamePattern: ['^@/components/.+(?<!\\.vue|\\.png|\\.svg|\\.jpg)$'],
            },
            {
              groupName: 'vue-components',
              elementNamePattern: ['\\.vue$', '\\.png$', '\\.svg$', '\\.jpg$'],
            },
            {
              groupName: 'relative',
              elementNamePattern: ['^\\./', '^\\.\\./'],
            },
            {
              groupName: 'type',
              selector: 'type',
            },
          ],
        },
      ],
    },
  },
)
