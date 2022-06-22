import cookies from './util.cookies'
import db from './util.db'
import log from './util.log'
import router from '../router'

const util = {
  cookies,
  db,
  log
}

/**
 * @description 更新标题
 * @param {String} title 标题
 */
util.title = function (titleText) {
  const processTitle = process.env.VUE_APP_TITLE || 'D2Admin'
  window.document.title = `${processTitle}${titleText ? ` | ${titleText}` : ''}`
}

/**
 * @description 打开新页面
 * @param {String} url 地址
 */
util.open = function (url) {
  var a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('target', '_blank')
  a.setAttribute('id', 'd2admin-link-temp')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(document.getElementById('d2admin-link-temp'))
}
// 鉴权
util.authen = function (arr) {
  let group1 = util.cookies.get('group')
  // console.log('group1:' + group1)
  var c = ''
  for (var y = 0; y < arr.length; y++) {
    if (String(group1) === arr[y] || Number(group1) === arr[y]) {
      c = true
    }
  }
  if (c) {} else {
    router.push({
      name: 'index',
      params: {
        cauthen: 'closeall'
      }
    })
  }
}
// 按钮级别的鉴权
util.checkjur2 = function (arr) {
  let group2 = util.cookies.get('group')
  var c2 = ''
  for (var y = 0; y < arr.length; y++) {
    if (String(group2) === arr[y] || Number(group2) === arr[y]) {
      c2 = true
    }
  }
  if (c2) {
    return true
  } else {
    return false
  }
}
export default util
