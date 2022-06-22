import request from '@/plugin/axios'

// 登录接口
export function weblogin (data) {
  return request({
    url: `/site/login/${data}`,
    method: 'post'
  })
}
