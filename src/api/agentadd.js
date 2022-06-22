import request from '@/plugin/axios'

// 代理商列表接口
export function agentadd (data) {
  return request({
    url: `/agent`,
    method: 'post',
    data
  })
}
