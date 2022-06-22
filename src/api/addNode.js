import request from '@/plugin/axios'

// 添加服务器的接口
export function addNode (data) {
  return request({
    url: '/node/addNode',
    method: 'post',
    data
  })
}
