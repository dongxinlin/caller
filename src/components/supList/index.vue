<template>
  <div class="bgcFf p_20LRM">
    <div class="poR p_10BM bor_TS" v-for="(item, index) in list" :key="index" @click="goPage(item)">
      <div class="comHei60R">
        <swStatus :item="item"/>
      </div>
      <div class="lh40R color99">
        <P>牵头部门 : {{ item.orgName | titleFilter(20) }}</P>
        <P>创建时间 : {{ item.createTime }}</P>
        <P v-if="item.serial">编号 : {{ item.serial }}</P>
      </div>
      <goIcon class="posRC"/>
    </div>
    <noData v-if="!list.length" style="height: 8rem" title="暂无督察督办"/>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ['list', 'nowType'],
    data() {
      return {}
    },
    created() {
    },
    methods: {
      goPage(item) {
        let name = 'supDetail'
        let supervisionId = item.id
        let nowType = this.nowType
        let query = { supervisionId, nowType }
        this.$router.push({ name, query })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>

</style>
