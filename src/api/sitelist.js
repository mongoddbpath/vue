import request from '@/plugin/axios'

// 获取模板接口
export function sitelist (data) {
  return request({
    url: '/site/list',
    method: 'post',
    data
  })
}
