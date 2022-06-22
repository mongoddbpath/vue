import request from '@/plugin/axios'

// 代理商更新接口
export function agentupdate (data) {
  return request({
    url: `/agent/`,
    method: 'post',
    data
  })
}
