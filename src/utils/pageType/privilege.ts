/**
 * @Description: 用于每个页面的权限 type
 * @param : key => 对应的每个页面route的 path属性
 * @param : value => 对应的每个页面获取权限的type值，由后台提供
 */
export default {
  '/invoice': 'invoice_order', // 发票列表
  '/invoice/request': 'invoice_request', // 发票申请记录列表
  '/account': 'account', // 账户列表
  '/role': 'role' // 角色列表
}
