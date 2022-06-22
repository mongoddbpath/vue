import request from '@/plugin/axios'

// 审核手动充值接口
export function checkrecharge (data) {
  return request({
    url: '/recharge/auditRecharge',
    method: 'post',
    data
  })
}
