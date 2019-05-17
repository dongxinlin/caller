<template>
  <cube-upload
    ref="upload"
    accept="*"
    :action="$tool.upload.img()"
    v-model="fileList"
    @file-click="fileClick"
    @file-success="fileSuccess"
    @file-error="fileError"/>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        uploadData: {
          category: 1303
        },
        fileList: []
      }
    },
    created() {
    },
    methods: {
      fileClick(item) {
        this.$cubeTMS.lookImg(this, item.url)
      },
      fileSuccess(item) {
        item.response.status != 0 && this.fileError(item)
      },
      fileError(item) {
        this.$refs['upload'].removeFile(item)
        this.$tool.messageErr('图片过大或未选择有效图片,请重新上传')
      },
      getFileList() {
        return this.fileList.map(v => v.response.data[0])
      },
      clearAll() {
        this.fileList = []
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>

</style>
