import request from '@/plugin/axios'

// 产品套餐接口
export function productlist (data) {
  return request({
    url: `/product/getAll`,
    method: 'post',
    data
  })
}
