export default {
  methods: {
    /* 获取数据 */
    getSendData(refsName) {
      if (!this.$refs[refsName].getSendData()) return false
      return Object.assign(this.sendData, this.$refs[refsName].getSendData())
    }
  }
}
