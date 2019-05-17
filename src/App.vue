<template>
  <div id="app" class="poR" v-wechat-title="$route.meta.title">
    <router-view v-if="!$route.meta.keepAlive && isRouterAlive" class="full poR"/>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive && isRouterAlive" class="full poR"/>
    </keep-alive>
  </div>
</template>

<script>
  import mixinReload from '@/mixin/mixinReload'

  export default {
    name: 'App',
    mixins: [mixinReload],
    data() {
      return {}
    },
    created() {
    },
    mounted() {
      this.$tool.inputFocus()
      this.initConfig()
    },
    methods: {
      initConfig() {
        this.$tool.localGet('token') && this.$store.dispatch('_getWxConfig')
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>

</style>
