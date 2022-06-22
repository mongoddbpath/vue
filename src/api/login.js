import request from '@/plugin/axios'

// 登录接口
export function UserLogin (data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}
