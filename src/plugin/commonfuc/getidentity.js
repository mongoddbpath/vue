// import util from '@/libs/util.js'
// let groupy = util.cookies.get('group')
export function getidentity (groupy) {
  switch (Number(groupy)) {
    case 0: groupy = '管理员'
      break
    case 1: groupy = '客户'
      break
    case 2: groupy = '代理'
      break
    case 3: groupy = '客服'
      break
    // default: groupy = '管理员'
  }
  return groupy
}
