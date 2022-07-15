/** @type {import('cz-git').UserConfig} */
module.exports = {
  ignores: [(commit) => commit.includes('init')],
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\w*|[\u4e00-\u9fa5]*)(?:[\(\（](.*)[\)\）])?[\:\：] (.*)/,
      headerCorrespondence: ['type', 'scope', 'subject'],
      referenceActions: [
        'close',
        'closes',
        'closed',
        'fix',
        'fixes',
        'fixed',
        'resolve',
        'resolves',
        'resolved'
      ],
      issuePrefixes: ['#'],
      noteKeywords: ['BREAKING CHANGE', '不兼容变更'],
      fieldPattern: /^-(.*?)-$/,
      revertPattern: /^Revert\s"([\s\S]*)"\s*This reverts commit (\w*)\./,
      revertCorrespondence: ['header', 'hash'],
      mergePattern: null,
      mergeCorrespondence: null
    }
  },
  rules: {
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 108],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新增功能
        'fix', // bug 修复
        'perf', // 性能, 体验优化
        'refactor', // 重构代码(既没有新增功能，也没有修复 bug)
        'style', // 样式修改，即不影响程序逻辑的代码修改
        'docs', // 文档/注释更新
        'test', // 新增测试用例或是更新现有测试
        'release', // 发布版本
        'ci', // 主要目的是修改项目继续集成流程(例如 Travis，Jenkins，GitLab CI，Circle等)的提交
        'revert', // 回滚某个更早之前的提交
        'chore', // 不属于以上类型的其他类型
        'workflow', // 工作流改进
        'wip', // 开发中
        'types', // 类型定义文件更改
        'delete', // 删除文件、依赖包
        'add', // 增加依赖包
        'update' // 更新依赖
      ]
    ]
  },
  prompt: {
    allowEmptyIssuePrefixs: false,
    allowCustomIssuePrefixs: false,

    // English
    typesAppend: [
      { value: 'wip', name: 'wip:      work in process' },
      { value: 'workflow', name: 'workflow: workflow improvements' },
      { value: 'types', name: 'types:    type definition file changes' },
      { value: 'delete', name: 'delete:   delete files or packages changes' },
      { value: 'add', name: 'add:      add files or packages changes' },
      { value: 'update', name: 'update:   update files or packages changes' }
    ]
  }
}
