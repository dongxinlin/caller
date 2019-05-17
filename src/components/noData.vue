<template>
  <div class="full">
    <span class="icon-zanwuxiaoxi iconfont" style="font-size: 2.5rem"></span>
    <span class="color99">{{title || '暂无数据!!!'}}</span>
  </div>
</template>

<script>
  import '@/assets/font/iconfont.css';
  export default {
    props: ['title']
  }
</script>

<style scoped>
.full {
  height: 4rem;
  width: 100%;
  margin-top: 1.5rem;
  color: #999;
  font-size: 0.4125rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
