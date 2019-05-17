export default {
  methods: {
    /* 通讯录 */
    selectEnterpriseContact(selectedUserIds, callback, selectedDepartmentIds, mode = 'multi', type = ['user']) {
      this.$wxTMS.invoke('selectEnterpriseContact', {
        fromDepartmentId: -1, // 通讯录层级
        selectedUserIds: selectedUserIds, // 用户id列表
        selectedDepartmentIds: selectedDepartmentIds, // 部门id列表
        mode: mode, // multi多选 single单选
        type: type // user department
      }, (res) => {
        if (res.err_msg === 'selectEnterpriseContact:ok') {
          typeof res.result === 'string' && (res.result = JSON.parse(res.result))
          callback(res.result)
        } else this.$tool.messageErr('获取通讯录失败,请重试')
      })
    }
  }
}
