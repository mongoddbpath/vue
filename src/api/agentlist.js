import request from '@/plugin/axios'

// 代理商列表接口
export function agentlist (data) {
  if (data.companyName === undefined) {
    return request({
      url: `/agent?page=${data.page}`,
      method: 'get',
      data
    })
  } else {
    return request({
      url: `/agent?page=${data.page}&companyName=${data.companyName}`,
      method: 'get',
      data
    })
  }
}
