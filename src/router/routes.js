import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: [
      // 首页
      {
        path: 'index',
        name: 'index',
        meta: {
          auth: true
        },
        component: _import('system/index')
      },
      // 服务器添加界面
      {
        // 管理员的用户列表编辑页面，和上面的用户列表相同
        path: 'addserve',
        name: 'addserve',
        meta: {
          title: '服务器添加',
          auth: true
        },
        component: _import('add/addserve')
      },
      // 服务器添加界面
      {
        // 管理员的用户列表编辑页面，和上面的用户列表相同
        path: 'servecontrol',
        name: 'servecontrol',
        meta: {
          title: '服务器管理',
          auth: true
        },
        component: _import('control/servecontrol')
      },
      // 站点管理页面(Edit)
      {
        path: 'webcontrol',
        name: 'webcontrol',
        meta: {
          title: '网站列表',
          auth: true
        },
        component: _import('control/webcontrol')
      },
      // 站点编辑权限页面
      {
        // 含编辑权限
        path: 'checkjur',
        name: 'checkjur',
        meta: {
          title: '站点授权',
          auth: true
        },
        component: _import('control/checkjur')
      },
      // 站点列表页面
      {
        path: 'weblist',
        name: 'weblist',
        meta: {
          title: '站点列表',
          auth: true
        },
        component: _import('demo/weblist')
      },
      // 模板列表页面
      {
        path: 'list',
        name: 'list',
        meta: {
          title: '模板列表',
          auth: true
        },
        component: _import('mubanok/list')
      },
      // {
      //   path: 'webs',
      //   name: 'webs',
      //   meta: {
      //     title: '站点创建',
      //     auth: true
      //   },
      //   component: _import('demo/webs')
      // },
      // 站点创建测试(优化即可转正)
      {
        path: 'websok',
        name: 'websok',
        meta: {
          title: '创建网站',
          auth: true
        },
        component: _import('demo/webs/index2.vue')
      },
      // 这里是企业后台的路由
      {
        path: 'backstage',
        name: 'backstage',
        meta: {
          title: '站点后台',
          auth: true
        },
        component: _import('houtai/backstage')
      },
      // 这里是用户订单列表页面
      {
        path: 'userorders',
        name: 'userorders',
        meta: {
          title: '订单列表',
          auth: true
        },
        component: _import('demo/userorders')
      },
      // 这里是用户订单编辑页面(Edit)
      {
        path: 'orders',
        name: 'orders',
        meta: {
          title: '订单管理',
          auth: true
        },
        component: _import('control/orders')
      },
      // 用户列表编辑页面，业务员代理商也可以进行编辑
      {
        path: 'userslist',
        name: 'userslist',
        meta: {
          title: '站点用户列表',
          auth: true
        },
        component: _import('allusers/userslist')
      },
      // {
      //   // 管理员的用户列表编辑页面，和上面的用户列表相同
      //   path: 'ulist',
      //   name: 'ulist',
      //   meta: {
      //     title: '用户列表',
      //     auth: true
      //   },
      //   component: _import('control/listedit/ulist')
      // },
      {
        // 代理商列表界面
        path: 'agent2',
        name: 'agent2',
        meta: {
          title: '代理列表',
          auth: true
        },
        component: _import('allusers/agents/index2.vue')
      },
      {
        // 管理员界面
        path: 'admin',
        name: 'admin',
        meta: {
          title: '管理员列表',
          auth: true
        },
        component: _import('allusers/admin')
      },
      // 添加用户界面(v1)
      // {
      //   path: 'addusers',
      //   name: 'addusers',
      //   meta: {
      //     title: '用户创建',
      //     auth: true
      //   },
      //   component: _import('add/addusers')
      // },
      // 用户添加界面(v2)
      {
        path: 'adduser',
        name: 'adduser',
        meta: {
          title: '用户添加',
          auth: true
        },
        component: _import('add/addusers/index2.vue')
      },
      // {
      //   // 上传模板的页面
      //   path: 'addmuban',
      //   name: 'addmuban',
      //   meta: {
      //     title: '模板上传',
      //     auth: true
      //   },
      //   component: _import('add/addmuban')
      // },
      {
        // 代理添加添加页面
        path: 'agent',
        name: 'agent',
        meta: {
          title: '代理添加',
          auth: true
        },
        component: _import('agent')
      },
      {
        // 管理员列表添加页面(v2)
        path: 'adminadd',
        name: 'adminadd',
        meta: {
          title: '管理员添加',
          auth: true
        },
        component: _import('add/admins/index2.vue')
      },
      // {
      //   // 管理员列表添加页面
      //   path: 'admins',
      //   name: 'admins',
      //   meta: {
      //     title: '管理员创建',
      //     auth: true
      //   },
      //   component: _import('add/admins')
      // },
      // 产品页面
      {
        path: 'product',
        name: 'product',
        meta: {
          title: '产品明细',
          auth: true
        },
        component: _import('control/product')
      },
      // 收支明细页面
      {
        path: 'recharge',
        name: 'recharge',
        meta: {
          title: '收支明细',
          auth: true
        },
        component: _import('control/recharge')
      },
      // 在线充值页面
      {
        path: 'recharge3',
        name: 'recharge3',
        meta: {
          title: '在线充值',
          auth: true
        },
        component: _import('control/recharge/recharge3.vue')
      },
      // 充值明细页面
      {
        path: 'rechargeadd',
        name: 'rechargeadd',
        meta: {
          title: '充值明细',
          auth: true
        },
        component: _import('control/recharge/index2.vue')
      },
      // 审核手动充值明细页面
      {
        path: 'checkrecharge',
        name: 'checkrecharge',
        meta: {
          title: '待审核明细',
          auth: true
        },
        component: _import('control/recharge/checkrecharge.vue')
      },
      // 这里是关键词选词界面
      {
        path: 'selectWords',
        name: 'selectWords',
        meta: {
          title: '关键词挖掘',
          auth: true
        },
        component: _import('expand/expand')
      },
      // 这里是400平台操作界面
      {
        path: 'phone',
        name: 'phone',
        meta: {
          title: '400电话业务',
          auth: true
        },
        component: _import('phone')
      },
      // 这里是百度竞价词查价的页面
      {
        path: 'checkprice',
        name: 'checkprice',
        meta: {
          title: '智能查价',
          auth: true
        },
        component: _import('checkprice')
      },
      // 这里是百度竞价选词的页面
      {
        path: 'checkwords',
        name: 'checkwords',
        meta: {
          title: '智能选词',
          auth: true
        },
        component: _import('checkwords')
      },
      // 这里是排名的系统界面
      {
        path: 'paiming',
        name: 'paiming',
        meta: {
          title: '网站排名情况',
          auth: true
        },
        component: _import('expand/paiming')
      },
      {
        path: 'changefile',
        name: 'changefile',
        meta: {
          title: '站点文件修改',
          auth: true
        },
        component: _import('expand/changefile')
      },
      // 系统用户列表
      {
        // 系统用户页面(v2)
        path: 'users2',
        name: 'users2',
        meta: {
          title: '用户列表(测试)',
          auth: true
        },
        component: _import('allusers/users/index2.vue')
      },
      {
        // 系统用户页面(可编辑)
        path: 'users',
        name: 'users',
        meta: {
          title: '系统用户列表',
          auth: true
        },
        component: _import('allusers/users')
      },
      // 系统 前端日志
      {
        path: 'log',
        name: 'log',
        meta: {
          title: '前端日志',
          auth: true
        },
        component: _import('system/log')
      },
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: _import('system/function/refresh')
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: _import('system/function/redirect')
      }
    ]
  }
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: _import('system/login')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  {
    path: '*',
    name: '404',
    component: _import('system/error/404')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [...frameIn, ...frameOut, ...errorPage]
