import request from '@/plugin/axios'

// 产品套餐接口
export function productupdate (data) {
  return request({
    url: `/product/update`,
    method: 'post',
    data
  })
}
