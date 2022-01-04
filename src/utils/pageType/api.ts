/**
 * @Description: 用于每个页面的列表 apiURL
 * @Author: wjw
 * @Date: 2021-08-23 11:22:53
 * @param : key => 对应的每个页面route的 path属性
 * @param : value => 对应的每个页面列表的URL
 */
export default {
  '/invoice': '/management/center/invoiceRequest/orders', // 开具发票列表
  '/invoice/request': '/management/center/invoiceRequest/list', // 申请发票记录列表
  '/account': '/management/center/user/list', // 账户列表
  '/role': '/management/center/role/list' // 角色列表
}
