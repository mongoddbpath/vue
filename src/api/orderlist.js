import request from '@/plugin/axios'

// 获取站点列表的接口
export function orderlist (data) {
  return request({
    url: '/account/getByUser?page=' + data,
    method: 'post'
  })
}
