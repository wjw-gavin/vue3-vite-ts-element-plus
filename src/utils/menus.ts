const menus = {
  home: {
    name: '首页',
    icon: 'icon-xshouye',
    path: '/home'
  },
  mock: {
    name: 'mock测试',
    icon: 'icon-xshouye',
    path: '/mock'
  },
  order_manage: {
    name: '订单管理',
    icon: 'icon-dingdanguanli',
    children: {
      order_list: {
        name: '订单列表',
        path: '/order'
      }
    }
  },
  account_manage: {
    name: '账户管理',
    icon: 'icon-zhanghuguanli',
    children: {
      account_list: {
        name: '账户列表',
        path: '/account'
      },
      role: {
        name: '角色管理',
        path: '/role'
      }
    }
  },
  station_manage: {
    name: '油站管理',
    icon: 'icon-youzhanguanli',
    children: {
      station_qrcode: {
        name: '油站下单码',
        path: '/oilstation/qrcode'
      }
    }
  },
  tx_manage: {
    name: '提现管理',
    icon: 'icon-tixianguanli',
    children: {
      tx_rule: {
        name: '提现规则',
        path: '/withdraw/rule'
      },
      tx_order: {
        name: '提现单',
        path: '/withdraw/merchant'
      }
    }
  },
  setting: {
    name: '设置',
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
