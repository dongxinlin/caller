<template>
  <div>
    <div class="comHei88R bor_TS" v-for="(item, index) in cloudList" :key="index" @click="lookFile(item)">
      <cube-checkbox
        v-if="checkbox"
        class="dIb p_0AM m_10RM"
        v-model="item.checked"
        @click.native.stop="checkCloud(item, index)"/>
      <img
        v-if="$tool.isImg(item.fileUrl)"
        class="zfx60R bgcF5 m_10RM"
        :src="$tool.download.img(item.fileUrl)">
      <iconClass v-else class="icon-wenjian font60R m_10RM"/>
      <span>{{ item.fileName }}</span>
      <span v-if="deleteIt" class="fr colorBl" @click.stop="$emit('deleteIt', item)">删除</span>
    </div>
    <noData v-if="emptyShow && !cloudList.length" title="暂无云文件"/>
  </div>
</template>

<script type="text/ecmascript-6">
  import mixinLookFile from '@/mixin/mixinLookFile'

  export default {
    props: ['cloudList', 'checkbox', 'deleteIt', 'emptyShow'],
    mixins: [mixinLookFile],
    data() {
      return {}
    },
    created() {
    },
    methods: {
      checkCloud(item, index) {
        setTimeout(() => {
          let list = this.cloudList.filter(v => v.checked)
          this.$emit('checkCloud', ...[list, item, index])
        }, 50)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>

</style>
