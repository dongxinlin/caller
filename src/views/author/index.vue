<template>
  <div class="bgcFf flexCC font40R">
    授权中...
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { getWxCodeUrl } from '@/api/wxAuth'

  export default {
    data() {
      return {
        redirect: this.$route.query.redirect || ''
      }
    },
    created() {
      this.author()
    },
    methods: {
      ...mapActions(['_getWxAuth', '_getWxConfig']),
      async author() {
        if (!this.$tool.getQueryString('code')) {
          const { data } = await getWxCodeUrl()
          location.href = data
        } else {
          await this._getWxAuth(this.$tool.getQueryString('code')).catch(err => {
            this.$router.push('/404')
          })
          this._getWxConfig()
          this.$router.push(this.redirect || '/')
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>

</style>
