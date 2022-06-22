// 代理商菜单
export default [
  { path: 'index', title: '首页', icon: 'home' },
  {
    title: '网站管理',
    icon: 'television',
    children: [
      { path: 'webcontrol', title: '网站列表', icon: 'desktop' },
      { path: 'websok', title: '创建网站', icon: 'plus-square' },
      { path: 'servecontrol', title: '服务器管理', icon: 'server' }
    ]
  },
  {
    title: '财务管理',
    icon: 'rmb',
    children: [
      { path: 'recharge3', title: '在线充值', icon: 'rmb' },
      { path: 'rechargeadd', title: '充值明细', icon: 'rmb' },
      { path: 'recharge', title: '收支明细', icon: 'rmb' },
      { path: 'orders', title: '订单明细', icon: 'rmb' }
    ]
  },
  {
    title: '用户管理',
    icon: 'user',
    children: [
      { path: 'agent', title: '代理添加', icon: 'user-plus' },
      { path: 'adduser', title: '用户添加', icon: 'user-plus' },
      { path: 'agent2', title: '代理列表', icon: 'users' },
      { path: 'users', title: '用户列表', icon: 'user-o' }
    ]
  },
  {
    title: '拓展',
    icon: 'flask',
    children: [
      // { path: 'paiming', title: '网站排名情况', icon: 'bar-chart-o' },
      { path: 'checkprice', title: '智能查价', icon: 'plug' },
      { path: 'checkwords', title: '智能选词', icon: 'plug' },
      { path: 'selectWords', title: '关键词挖掘', icon: 'plug' },
      { path: 'phone', title: '400电话', icon: 'phone' }
    ]
  }
]
