<template>

</template>

<script>
const GetQueryString = function (name) {
  let url = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  let newUrl = window.location.search.substr(1).match(url);
  if (newUrl != null) return unescape(newUrl[2]);
  else return false;
}

export default {
  data() {
    return { }
  },
  methods: {
    _getCode() {
      this.$tool.localSet('lastRoute', this.$route.query)
      if(!GetQueryString("code")) {
        this.axios.get('/api-wx-gzh/wx-user/code-url').then(res => {
          location.href = res.data
        }).catch(() =>{
          alert('授权失败！')
        })
      } else {
        this.getUserInfo(GetQueryString("code"))
      }
    },
    getUserInfo(code) {
      this.axios.get(`/api-wx-gzh/wx-user/auth?code=${code}`).then(res => {
        // this.$tool.localClear()
        // console.log(res.data)
        this.$tool.localSet('userWx', res.data)
        this.$tool.localSet('token', res.data.token)
        this.$tool.localSet('openId', res.data.openid)
        let _url = JSON.parse(localStorage.getItem('lastRoute'))
        this.$router.replace({ path: _url.redirect })
      }).catch(() => {
        alert('登陆失败!')
      })
    }
  },
  mounted() {
    this._getCode()
  }
}
</script>

<style>

</style>
