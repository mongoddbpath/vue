import request from '@/plugin/axios'

// 代理商删除接口
export function agentdelete (data) {
  return request({
    url: `/agent/${data}`,
    method: 'delete'
  })
}
