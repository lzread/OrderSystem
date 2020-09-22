import request from '@/utils/request'
/**
 * 登录
 * @param {Object} data 登录信息
 */
export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

