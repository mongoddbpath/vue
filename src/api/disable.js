import request from '@/plugin/axios'

// 更改用户权限接口
export function disable (data) {
  return request({
    url: `/admin/disable`,
    method: 'get',
    params: data, // 携带参数
    withCredentials: true
  })
}
