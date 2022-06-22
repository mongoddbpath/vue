import request from '@/plugin/axios'

// 获取模板接口
export function mubanlist (data) {
  return request({
    url: '/style/list',
    method: 'get',
    data
  })
}
