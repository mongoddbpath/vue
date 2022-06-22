import request from '@/plugin/axios'

// 创建网站接口
export function createSite (data) {
  return request({
    url: '/site/create',
    method: 'post',
    data
  })
}
