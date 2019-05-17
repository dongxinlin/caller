const pageList = ['cloud']

export default {
  methods: {
    /* 清空页面 */
    clearPage(to) {
      if (pageList.indexOf(to.name) !== -1) return
      this.clearAll()
    }
  },
  beforeRouteLeave(to, from, next) {
    this.clearPage(to)
    next()
  }
}
