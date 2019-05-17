import Vue from 'vue'

/* 依赖 */
import '@/utils/cubeTMS'
// import '@/utils/permission'
import '@/utils/rem'
import '@/utils/tool'
import '@/utils/vueFilter'
// import '@/utils/wxTMS'

/* 组件 */
import addIcon from '@/components/addIcon'
import dialogSe from '@/components/dialogSe'
import echartsTem from '@/components/echartsTem'
import goIcon from '@/components/goIcon'
import iconClass from '@/components/iconClass'
import noData from '@/components/noData'
import swStatus from '@/components/swStatus'
import uploadImg from '@/components/uploadImg'

/* 组件 */
Vue.component('addIcon', addIcon) // 图标
Vue.component('dialogSe', dialogSe) // 弹层
Vue.component('echartsTem', echartsTem) // echartsTem
Vue.component('goIcon', goIcon) // 图标
Vue.component('iconClass', iconClass) // 图标
Vue.component('noData', noData) // 暂无数据
Vue.component('swStatus', swStatus) // 状态
Vue.component('uploadImg', uploadImg) // 上传
