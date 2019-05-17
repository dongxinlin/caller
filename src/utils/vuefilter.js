import Vue from 'vue'
import tool from '@/utils/tool'

Vue.filter('formatDate', (val, isTime = false) => {
  if (!val) return '暂无'
  return tool.getAnyDate(val, 0, isTime)
})

Vue.filter('titleFilter', (val, length) => {
  if (!val) return '暂无'
  if (val.length >= length) return `${val.substring(0, length)}...`
  else return val
})

Vue.filter('fileType', (val) => {
  if (!val) return '暂无'
  else return val.split('.').reverse()[0]
})

Vue.filter('noAny', (val) => {
  if (!val) return '暂无'
  else return val
})
