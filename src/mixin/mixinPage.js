export default {
  methods: {
    /* 上拉下拉 */
    async pullingPage(callback, FP = true) {
      FP && (this.sendData.current = 1)
      !FP && this.sendData.current++
      const { data } = await callback(this.sendData).catch(err => {
        this.$cubeTMS.scrollForceUpdate(this.$refs.scroll)
      })
      FP && data.records.length && (this.records = data.records)
      !FP && data.records.length && (this.records = this.records.concat(data.records))
      if (!data.records.length) {
        this.$cubeTMS.scrollForceUpdate(this.$refs.scroll)
        this.sendData.current > 1 && this.sendData.current--
      }
    }
  }
}
