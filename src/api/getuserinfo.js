import request from '@/plugin/axios'

// 查询用户接口
export function getuserinfo (data) {
  return request({
    url: `/user/getUser?key=${data}`,
    method: 'get',
    withCredentials: true
  })
}
