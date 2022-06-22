import request from '@/plugin/axios'

// 用户添加SSL服务的接口
export function addssl (data) {
  return request({
    url: '/site/addSsl/' + data,
    method: 'post'
  })
}
