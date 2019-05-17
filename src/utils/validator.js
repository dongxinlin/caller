import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import cn from 'vee-validate/dist/locale/zh_CN'
// import en from 'vee-validate/dist/locale/en'

Vue.use(VeeValidate)

/* 字典 */
const dict = {
  cn: {
    messages: {
      required: (field) => `*请输入您的${field}`
    },
    attributes: {
      name: '姓名',
      title: '标题'
    }
  }
  // name接受alias的值
}

/* 本地化 */
Validator.localize('cn', cn)
Validator.localize(dict)

/* 手机号 */
Validator.extend('cellphone', {
  getMessage: (field, [args]) => `请输入正确的手机号`,
  validate: (value, [args]) => {
    const reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/
    // const reg = /^[0-9]*$/
    return reg.test(value)
  }
})
/* 身份证号 */
Validator.extend('idCard', {
  getMessage: (field, [args]) => `请输入正确的身份证号`,
  validate: (value, [args]) => {
    var city = {
      11: '北京',
      12: '天津',
      13: '河北',
      14: '山西',
      15: '内蒙古',
      21: '辽宁',
      22: '吉林',
      23: '黑龙江',
      31: '上海',
      32: '江苏',
      33: '浙江',
      34: '安徽',
      35: '福建',
      36: '江西',
      37: '山东',
      41: '河南',
      42: '湖北',
      43: '湖南',
      44: '广东',
      45: '广西',
      46: '海南',
      50: '重庆',
      51: '四川',
      52: '贵州',
      53: '云南',
      54: '西藏',
      61: '陕西',
      62: '甘肃',
      63: '青海',
      64: '宁夏',
      65: '新疆',
      71: '台湾',
      81: '香港',
      82: '澳门',
      91: '国外'
    }
    var required = true
    // 判断规则
    if (!value || !/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(value)) {
      required = false
    } else if (!city[value.substr(0, 2)]) {
      required = false
    } else {
      // 18位身份证需要验证最后一位校验位
      if (value.length === 18) {
        value = value.split('')
        // ∑(ai×Wi)(mod 11)
        // 加权因子
        var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
        // 校验位
        var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
        var sum = 0
        var ai = 0
        var wi = 0
        for (var i = 0; i < 17; i++) {
          ai = value[i]
          wi = factor[i]
          sum += ai * wi
        }
        // var last = parity[sum % 11]
        if (parity[sum % 11] !== value[17]) {
          required = false
        }
      }
    }
    return required
  }
})
/* 中文 */
Validator.extend('nameCn', {
  getMessage: (field, [args]) => `请输入中文`,
  validate: (value, [args]) => {
    const reg = /^[\u4e00-\u9fa5]*$/
    return reg.test(value)
  }
})
/* 大于零的整数 */
Validator.extend('intNumber', {
  getMessage: (field, [args]) => `请输入大于零的整数`,
  validate: (value, [args]) => {
    const reg = /^\+?[1-9]\d*$/
    return reg.test(value)
  }
})
/* 正数 */
Validator.extend('plusNumber', {
  getMessage: (field, [args]) => `请输入正数`,
  validate: (value, [args]) => {
    const reg = /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/
    return reg.test(value)
  }
})
/* 邮箱 */
Validator.extend('email', {
  getMessage: (field, [args]) => `请输入正确的邮箱`,
  validate: (value, [args]) => {
    const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
    return reg.test(value)
  }
})
