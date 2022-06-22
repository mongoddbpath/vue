import request from '@/plugin/axios'

// 用户注册接口
export function register (data) {
  return request({
    url: '/register',
    method: 'post',
    data
  })
}
