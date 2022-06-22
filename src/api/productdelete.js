import request from '@/plugin/axios'

// 产品删除接口
export function productdelete (data) {
  return request({
    url: `/product/delete`,
    method: 'post',
    data: { id: data }
  })
}
