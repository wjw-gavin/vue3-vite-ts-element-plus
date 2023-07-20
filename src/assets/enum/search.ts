/**
 * @description: 每个列表页面的搜索项 id
 * key => 对应的每个页面route的 path 属性
 * value => 对应的每个列表页面获取搜索项的 id 值，由后台提供
 */

export default {
  '/system/role': 'role',
  '/system/user': 'user',
  '/base/article': 'article'
} as Record<string, string>
