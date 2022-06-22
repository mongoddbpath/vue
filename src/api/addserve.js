import request from '@/plugin/axios'

// 用户注册接口
export function addserve (data) {
  return request({
    url: '/server/add',
    method: 'post',
    data
  })
}
