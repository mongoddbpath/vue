import request from '@/plugin/axios'

// 查询用户列表的接口
export function userlist (data) {
  return request({
    url: `/user/list?page=${data}`,
    method: 'get',
    withCredentials: true
  })
}
