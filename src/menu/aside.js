// 菜单 顶部栏
export default [
  { path: '/index', title: '首页', icon: 'home' },
  // {
  //   title: '管理',
  //   icon: 'television',
  //   children: [
  //     { path: '/orders', title: '订单管理', icon: 'file-text' },
  //     { path: '/webcontrol', title: '站点管理', icon: 'plus-square' },
  //     { path: '/ulist', title: '客户管理', icon: 'user-plus' }
  // { path: '/muban', title: '模板管理', icon: 'file-text' }
  // ]
  // },
  {
    title: '站点',
    icon: 'list',
    children: [
      // { path: '/webs', title: '站点创建', icon: 'file-text' },
      { path: '/weblist', title: '站点列表', icon: 'file-text' }]
  },
  // {
  //   title: '模板',
  //   icon: 'bars',
  //   children: [
  //     { path: '/addmuban', title: '模板上传', icon: 'cloud-upload' },
  //     { path: '/list', title: '模板列表', icon: 'cube' }]
  // },
  // {
  //   title: '订单',
  //   icon: 'table',
  //   children: [{ path: '/userorders', title: '订单列表', icon: 'file-text' }]
  // },
  {
    title: '用户',
    icon: 'user',
    children: [
      { path: '/addusers', title: '用户添加', icon: 'user-plus' },
      // { path: '/admins', title: '管理员添加', icon: 'user-plus' },
      // { path: '/agents', title: '代理商列表', icon: 'user-o' },
      // { path: '/admin', title: '管理员列表', icon: 'user-circle-o' },
      { path: '/users', title: '用户列表', icon: 'user-o' }
      // { path: '/userslist', title: '站点用户列表', icon: 'users' }
    ]
  },
  {
    title: '拓展',
    icon: 'flask',
    children: [
      // { path: '/paiming', title: '网站排名情况', icon: 'bar-chart-o' },
      { path: '/selectWords', title: '关键词挖掘', icon: 'plug' },
      { path: '/phone', title: '400电话', icon: 'phone' }
    ]
  }
]
