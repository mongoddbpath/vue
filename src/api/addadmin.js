import request from '@/plugin/axios'

// 用户注册接口
export function addadmin (data) {
  return request({
    url: '/admin/create',
    method: 'post',
    data
  })
}
