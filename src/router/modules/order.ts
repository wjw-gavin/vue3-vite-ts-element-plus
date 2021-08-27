// 订单管理 路由
const orderRouter = [
  {
    path: '/order',
    name: 'order',
    component: () => import('@/views/order/order/index.vue'),
    meta: {
      title: '订单列表',
      activePath: '/order'
    }
  }
]

export default orderRouter
