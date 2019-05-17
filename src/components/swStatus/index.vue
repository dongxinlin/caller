<template>
    <span class="dIb vAt">
      <span v-if="item.status==1" class="flashIcon bgcJs">待审核</span>
      <span v-if="item.status==2" class="flashIcon bgcJs">待审批</span>
      <span v-if="item.status==3" class="flashIcon bgcBl">已审批</span>
      <span v-if="item.status==4" class="flashIcon bgcFe">已驳回</span>
      <span v-if="item.status==5" class="flashIcon bgcLs">发通知</span>
      <span v-if="item.status==6" class="flashIcon bgcLs">督查中</span>
      <span v-if="item.status==7" class="flashIcon bgcBl">已办结</span>
      <span v-if="item.status==8" class="flashIcon bgcBl">已归档</span>
      <span v-if="item.status==9" class="flashIcon bgcFe">已驳回</span>
      <span class="font32R">{{ item.supervisionName | titleFilter(15) }}</span>
    </span>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ['item']
  }
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>

</style>
