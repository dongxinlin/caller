export default {
  data() {
    return {
      imgList: []
    }
  },
  methods: {
    /* 查看img */
    lookImg(fileUrl) {
      this.$cubeTMS.lookImg(this, this.$tool.download.img(fileUrl))
    },
    /* 查看img列表 */
    lookImgList(list, index) {
      this.imgList = list.map(v => this.$tool.download.img(v.fileUrl))
      this.$cubeTMS.lookImgList(this, 'imgList', index)
    },
    /* 查看文件 */
    lookFile(item, type = 'img') {
      if (this.$tool.isImg(item.fileUrl)) {
        this.$cubeTMS.lookImg(this, this.$tool.download.img(item.fileUrl))
      } else {
        this.$wxTMS.wxInit('previewFile', {
          url: this.$tool.download[type](item.fileUrl),
          name: item.fileName,
          size: Number(item.fileSize)
        })
      }
    }
  }
}
