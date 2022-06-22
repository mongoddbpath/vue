import request from '@/plugin/axios'

// 获取服务器的接口
export function nodelist (data) {
  return request({
    url: `/node/list`,
    method: 'get',
    params: data,
    withCredentials: true
  })
}
