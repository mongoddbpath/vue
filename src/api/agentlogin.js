import request from '@/plugin/axios'

// 代理商登录接口
export function agentlogin (data) {
  return request({
    url: `/agent/loginTo?user_id=${data}`,
    method: 'get'
  })
}
