export default {
  methods: {
    /* 弹窗提示 */
    confirmDialog(title, api, item) {
      this.$cubeTMS.confirmDialog(this, title, () => {
        this[api](item)
      })
    }
  }
}
