<template>
  <div class="container">
        <router-view></router-view>
    <div class="footer">
        <router-link :to="{name: 'appointNow'}" tag="div" :class="{active:$route.name == 'appointNow'}" replace><i class="iconfont icon--15"></i> <p>立即预约</p></router-link>
        <router-link :to="{name: 'myAppoint'}" tag="div" :class="{active:$route.name == 'myAppoint'}" replace><i class="iconfont icon--16"></i> <p>我的预约</p></router-link>
    </div>
  </div>
</template>

<style lang="less" scoped>
.footer {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    background-color: #fff;
    height: 48/37.5rem;
    padding-top: 5/37.5rem;
    box-sizing: border-box;
    div {
      float: left;
      width: 50%;
      height: 48/37.5rem;
      text-align: center;
      line-height: 20/37.5rem;
        p {
            font-size: 10/37.5rem;
        }
        i {
            font-size: 20/37.5rem;
        }
    }
}
.active {
    color: #026a52;
}
</style>
