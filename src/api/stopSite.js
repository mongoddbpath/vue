import request from '@/plugin/axios'

// 停用站点接口
export function stopSite (data) {
  return request({
    url: '/site/stopSite/' + data,
    method: 'post'
  })
}
