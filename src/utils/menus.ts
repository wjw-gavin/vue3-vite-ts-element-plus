// base_information; children -> role | mock 对应后台返回菜单的 id
const menus = {
  home: {
    name: '首页',
    icon: 'icon-xshouye',
    path: '/home'
  },
  base_information: {
    name: '基础信息管理',
    icon: 'icon-zhanghuguanli',
    children: {
      role: {
        name: '角色管理',
        path: '/role'
      },
      mock: {
        name: 'mock数据',
        path: '/base/mock'
      }
    }
  },
  statement: {
    name: '报表管理',
    icon: 'icon-yunyingzhongxin',
    children: {
      chart: {
        name: '图表管理',
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
