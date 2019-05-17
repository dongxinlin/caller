import axios from 'axios'
import tool from '@/utils/tool'
import qs from 'qs'

var isMessage, isTip
const loading = tool.messageLoading('正在加载中')
const request = axios.create({
  baseURL: `${tool.baseURL}`,
  timeout: 20000,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  withCredentials: false,
  qs: true,
  /* 自定义 */
  isLoading: true,
  isMessage: true,
  isTip: false
})

/* request拦截器 */
request.interceptors.request.use(
  config => {
    config.isLoading && loading.show()
    isMessage = config.isMessage
    isTip = config.isTip
    tool.localGet('token') && (config.headers['token'] = tool.localGet('token'));
    (config.data && config.qs) && (config.data = tool.filterRes(config.data))
    config.qs && (config.data = qs.stringify(config.data, { indices: false }))
    return config
  },
  err => {
    loading.hide()
    isMessage && tool.messageErr('网络状态差')
    return Promise.reject(err)
  }
)

request.interceptors.response.use(
  res => {
    loading.hide()
    tool.checkStatus(res.data.status, res.data.message, isMessage, isTip)
    if (res.data.status === 0) return res.data
    else return Promise.reject(res)
  },
  err => {
    loading.hide()
    isMessage && tool.messageErr('网络状态差')
    return Promise.reject(err)
  }
)

export default request
