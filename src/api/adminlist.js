import request from '@/plugin/axios'

// 登录接口
export function adminlist (data) {
  return request({
    url: `/admin/list`,
    method: 'get',
    withCredentials: true
  })
}
