import request from '@/plugin/axios'

// 添加服务器的接口
export function lowerAppreciation (data) {
  return request({
    url: '/deduction/lowerAppreciation',
    method: 'post',
    data
  })
}
