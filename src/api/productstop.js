import request from '@/plugin/axios'

// 产品删除接口
export function productstop (data) {
  return request({
    url: `/product/disable`,
    method: 'post',
    data
  })
}
