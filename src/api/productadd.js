import request from '@/plugin/axios'

// 产品套餐接口
export function productadd (data) {
  return request({
    url: `/product/add`,
    method: 'post',
    data
  })
}
