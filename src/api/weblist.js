import request from '@/plugin/axios'

// 获取站点列表的接口
export function weblist (data) {
  return request({
    url: '/site/list?page=' + data,
    method: 'post'
  })
}
