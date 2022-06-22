import request from '@/plugin/axios'

// 添加服务器的接口
export function lowerDeduction (data) {
  return request({
    url: '/deduction/lowerDeduction',
    method: 'post',
    data
  })
}
