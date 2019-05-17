import request from '@/utils/request'

export function getCloudFile(params) { // 云文件列表
  return request.get('/api-wx-qyh/file/list-by-userId', { params })
}

export function getComEnum(params) { // 字典表
  return request.get('/api-wx-qyh/common-pub-enum/info-by-code', { params })
}
