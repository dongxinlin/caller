<template>
  <div class="p_120BM">
    <cube-scroll
      ref="scroll"
      class="full"
      :data="records"
      :options="$cubeTMS.scrollOp()"
      @pulling-down="_pullingPage"
      @pulling-up="_pullingPage(false)">
      <cloudList
        class="bgcFf p_20LRM"
        :cloudList="records"
        :checkbox="true"
        :emptyShow="true"
        @checkCloud="checkCloud"/>
    </cube-scroll>
    <div class="posFB w100 p_20AM">
      <div class="btnSe bgcBl borderRa10R BS" @click="goConfirm">确认</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import mixinPage from '@/mixin/mixinPage'
  import cloudList from './components/cloudList'
  import { getCloudFile } from '@/api/common'
  import { mapMutations } from 'vuex'

  export default {
    mixins: [mixinPage],
    components: { cloudList },
    data() {
      return {
        sendData: {
          category: 1302,
          size: 15,
          current: 1
        },
        records: [],
        listByCloud: []
      }
    },
    created() {
      this._pullingPage()
    },
    methods: {
      ...mapMutations(['SET_LISTBYCLOUD']),
      _pullingPage(FP) {
        this.pullingPage(getCloudFile, FP)
      },
      checkCloud(list) {
        this.listByCloud = list
      },
      goConfirm() {
        this.SET_LISTBYCLOUD(this.listByCloud)
        this.$router.go(-1)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>

</style>
