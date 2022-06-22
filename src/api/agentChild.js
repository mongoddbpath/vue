import request from '@/plugin/axios'

// 代理商列表接口
export function agentChild (data) {
  return request({
    url: `/agent/child?user_id=${data}`,
    method: 'get'
  })
}
