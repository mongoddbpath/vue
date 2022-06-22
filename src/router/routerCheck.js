import util from '@/libs/util.js'
export default function routerCheck () {
// 鉴别路由权限
  let name = util.cookies.get('name')
  // eslint-disable-next-line
  var v = this.permission.find( value => value === name)
  console.log(v)
  if (v === undefined) {
    this.$store.dispatch('d2admin/page/closeAll')
  }
}
