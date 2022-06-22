import request from '@/plugin/axios'

// 用户删除SSL服务的接口
export function delssl (data) {
  return request({
    url: '/site/delSsl/' + data,
    method: 'post'
  })
}
