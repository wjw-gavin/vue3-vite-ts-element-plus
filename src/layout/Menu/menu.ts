const menuData = [
  {
    id: 'dashboard',
    name: '首页'
  },
  {
    id: 'cargo_manage',
    name: '货源信息管理',
    children: [
      {
        id: 'cargo',
        name: '货源信息'
      },
      {
        id: 'to_be_confirmed',
        name: '待确认货源信息'
      }
    ]
  },
  {
    id: 'user_manage',
    name: '用户管理',
    children: [
      {
        id: 'user',
        name: '用户信息'
      },
      {
        id: 'feedback',
        name: '用户反馈'
      }
    ]
  }
]

export default menuData
