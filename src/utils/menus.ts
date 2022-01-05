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
      region: {
        name: '地区管理',
        path: '/region'
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
