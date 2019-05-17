import request from '@/utils/request'

export function login(data) {
  return request.post('/xxx', data)
}

export function getInfo(params) {
  return request.get('/api-wx-qyh/common-org/info-by-userId', { params })
}

export function logout(params) {
  return request.get('/xxx', { params })
}
