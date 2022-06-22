import request from '@/plugin/axios'

// 上传模板接口
export function Postmuban (data) {
  return request({
    url: '/style/create',
    method: 'post',
    data
  })
}
