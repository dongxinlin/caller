import { getComEnum } from '@/api/common'

export const comEnumAlias = {
  value: 'itemCode',
  text: 'itemName'
}

export default {
  methods: {
    /* 获取字典表 */
    async getComEnum(enumCode, callback) {
      let { data } = await getComEnum({ enumCode })
      callback(data)
    }
  }
}
