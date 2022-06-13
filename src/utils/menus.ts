// base_information; children -> role | mock 对应后台返回菜单的 id
const menus = {
  dashboard: {
    name: '首页',
    icon: 'icon-xshouye',
    path: '/dashboard'
  },
  user_manage: {
    name: '用户管理',
    icon: 'icon-zhanghuguanli',
    children: {
      user: {
        name: '用户列表',
        path: '/user'
      },
      feedback: {
        name: '用户列表',
        path: '/feedback'
      }
    }
  },
  cargo_manage: {
    name: '货源管理',
    icon: 'icon-yunyingzhongxin',
    children: {
      cargo: {
        name: '货源信息',
        path: '/statement/chart'
      },
      to_be_confirmed: {
        name: '待确认货源信息',
        path: '/statement/chart'
      }
    }
  },
  system_config: {
    name: '系统设置',
    icon: 'icon-shezhi',
    children: {
      password: {
        name: '修改密码',
        path: '/set/password'
      }
    }
  }
}

export default menus
