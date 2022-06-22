import request from '@/plugin/axios'

// 用户注册接口
export function userDelSite (data) {
  return request({
    url: '/admin/userDelSite',
    method: 'post',
    data
  })
}
