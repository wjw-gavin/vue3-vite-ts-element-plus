const menus = {
  home: {
    name: '首页',
    icon: 'icon-xshouye',
    path: '/home'
  },
  account_manage: {
    name: '发票管理',
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
  invoice_manage: {
    name: '发票管理',
    icon: 'icon-dingdanguanli',
    children: {
      invoice_order_list: {
        name: '开具发票',
        path: '/invoice'
      },
      invoice_request_list: {
        name: '开票记录',
        path: '/invoice/request'
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
