<template>
  <div class="personage-container">
    <div class="header">
      <div class="tit">
          <div class="im"><img src="" alt=""></div>
          <div class="xinx">
            <p class="name">刘晨</p>
            <p class="m_20TM">13326349626</p>
          </div>
      </div>
    </div>
    <div class="content">
      <van-cell>111</van-cell>
      <van-cell>111</van-cell>
      <van-cell>111</van-cell>
      <van-cell>111</van-cell>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="less" scoped>
.header{
  height: 3rem;
  width: 100%;
  background:linear-gradient(0deg,rgba(255,116,48,1),rgba(255,175,36,1));
  position: relative;
  .tit{
    position: absolute;
    left: .3rem;
    bottom: .5rem;
    display: flex;
    align-items: center;
    color: #fff;
    .im{
      width: 1.3rem;
      height: 1.3rem;
      background-color: #fff;
      border-radius: 50%;
    }
    .xinx{
      margin-left: .45rem;
      .name{
        font-size: .32rem;
      }
    }
  }
}
</style>
