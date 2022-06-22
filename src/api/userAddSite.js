import request from '@/plugin/axios'

// 用户注册接口
export function userAddSite (data) {
  return request({
    url: '/admin/userAddSite',
    method: 'post',
    data
  })
}
