import request from '@/plugin/axios'

// 充值接口
export function recharge (data) {
  return request({
    url: '/recharge/recharge',
    method: 'post',
    data
  })
}
