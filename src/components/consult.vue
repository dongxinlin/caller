<template>
    <div class="container">
        <router-view></router-view>
        <div class="footer">
            <router-link :to="{name: 'consultNow'}" tag="div" :class="{active:$route.name == 'consultNow'}" replace><i class="iconfont icon--17"></i> <p>立即咨询</p></router-link>
            <router-link :to="{name: 'myConsult'}" tag="div" :class="{active:$route.name == 'myConsult'}" replace><i class="iconfont icon--14"></i> <p>我的咨询</p></router-link>
        </div>
    </div>
</template>

<script>

</script>

<style lang="less" scoped>
.container {
    position: absolute;
    top: 0;
    bottom: 48/37.5rem;
    left: 0;
    right: 0;
    overflow-x: hidden;
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
}
</style>
