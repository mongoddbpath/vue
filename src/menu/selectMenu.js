import menuHeader from '@/menu/header'
// import menuAside from '@/menu/aside'
import route1 from '@/menu/route1'
import route2 from '@/menu/route2'
import util from '@/libs/util.js'
import store from '@/store/index'
export default function selectMenu () {
// 根据用户权限设置菜单
// group 0||null为管理员组，1为客户组，2为代理，3为客服
  let groupy = util.cookies.get('group')
  if (String(groupy) === 'null' || Number(groupy) === 0) {
    store.commit('d2admin/menu/headerSet', menuHeader)
    store.commit('d2admin/menu/asideSet', menuHeader)
  } else if (Number(groupy) === 1 || Number(groupy) === 3) {
    store.commit('d2admin/menu/headerSet', route1)
    store.commit('d2admin/menu/asideSet', route1)
  } else if (Number(groupy) === 2) {
    store.commit('d2admin/menu/headerSet', route2)
    store.commit('d2admin/menu/asideSet', route2)
  }
}
