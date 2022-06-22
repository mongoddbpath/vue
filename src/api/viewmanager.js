import request from '@/plugin/axios'

// 用户注册接口
export function viewmanager (data) {
  return request({
    url: '/admin/viewManager',
    method: 'post',
    data
  })
}
