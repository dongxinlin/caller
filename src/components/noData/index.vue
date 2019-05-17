<template>
  <div class="noData flexCC">
    <span class="iconfont icon-zanwuxiaoxi color99 m_20BM"></span>
    <span class="color99">{{ title || '暂无数据' }}</span>
  </div>
</template>

<script>
  export default {
    props: ['title']
  }
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>
  .noData {
    height: 4rem;
    .iconfont {
      font-size: 2rem;
    }
  }
</style>
