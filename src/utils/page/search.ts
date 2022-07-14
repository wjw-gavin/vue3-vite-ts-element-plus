//
/**
 * @Description: 用于每个页面的搜索项 type
 * @param : key => 对应的每个页面route的 path 属性
 * @param : value => 对应的每个页面获取搜索项的type值，由后台提供
 */
export default {
  '/invoice': 'invoiceOrderRequest', // 开具发票列表
  '/invoice/request': 'invoiceRequest' // 发票申请记录列表
}
