import request from '@/plugin/axios'

// 开启站点接口
export function startSite (data) {
  return request({
    url: '/site/startSite/' + data,
    method: 'post'
  })
}
