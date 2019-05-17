import axios from "axios";
import tool from "./common";
import qs from "qs"

var ismessage, tip;
const loading = tool.messageLoading('正在加载中');
const server = axios.create({
  baseURL: `${tool.baseURL}`,
  timeout: 6000,// 请求超时时间,
  headers: {"Content-Type": "application/x-www-form-urlencoded"},
  isloading: true,
  qs: true,
  ismessage: true,
  tip: false,
  withCredentials: false,
  isWindow: false,
  isqy: false
})
// request拦截器
server.interceptors.request.use(config => {
  ismessage = config.ismessage;
  tip = config.tip;
  tool.localGet('token') && ( config.headers['token'] = tool.localGet('token'));
  // (config.data && config.qs) && (config.data = tool.filterRes(config.data));
  config.qs && (config.data = qs.stringify(config.data, {indices: false}));
  config.isloading && loading.show();
  return config
}, error => {
  loading.hide();
  ismessage && tool.messageErr('网络状态差!!!');
  return Promise.reject(error)
})

server.interceptors.response.use(
  res => {
    loading.hide();
    tool.checkStatus(res.data.status, res.data.message, ismessage, tip);//状态码
    if (res.data.status == 0) return res.data; //错误判断
    else return Promise.reject(res)
  },
  error => {
    loading.hide();
    ismessage && tool.messageErr('网络状态差!!!');
    return Promise.reject(error)
  }
)

export default server
