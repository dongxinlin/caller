import request from '@/utils/request'

const appFlag = '10'

export function getWxCodeUrl() { // 获取codeUrl
  const params = {
    appFlag
  }
  return request.get(`/api-wx-qyh/wx-user/code-url`, {
    params
  })
}

export function getWxAuth(params) { // 获取授权
  params.appFlag = appFlag
  return request.get(`/api-wx-qyh/wx-user/auth`, {
    params
  })
}

export function getWxConfig() { // 开放能力
  const url = location.href.split('#')[0]
  const params = {
    appFlag,
    url
  }
  return request.get(`/api-wx-qyh/wx-user/info-config`, {
    params
  })
}
