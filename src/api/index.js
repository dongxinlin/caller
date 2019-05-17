import request from '@/utils/request'
export function getSupList(params) { // 列表
  return request.get('/api-caller/caller-reservation-info/page', { params })
}