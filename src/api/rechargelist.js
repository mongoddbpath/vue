import request from '@/plugin/axios'

// 收支明细接口
export function rechargelist (data) {
  return request({
    url: `/recharge/list`,
    method: 'post',
    data
  })
}
