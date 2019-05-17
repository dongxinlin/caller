<template>
  <div class="info">
    <div style="padding: 0 0.4rem;">
      <div class="info-container" v-for="(item, index) in myConsultList" :key="index">
        <p>{{item.createTime}}</p>
        <div>
          <p>
            <span>联系电话：</span>
            <span>{{item.phone}}</span>
          </p>
          <p>
            <span>咨询对象：</span>
            <span>{{item.orgName}}</span>
          </p>
          <p>
            <span>咨询内容:</span>
            <br>
            <br>
            <span style="color: #999;">{{item.content}}</span>
          </p>
        </div>
        <div>
          <p>
            <span>回复时间：</span>
            <span>{{item.replyTime}}</span>
          </p>
          <p>
            <span>回复内容:</span>
            <br>
            <br>
            <span style="color: #999;">{{item.replyContent}}</span>
          </p>
        </div>
      </div>

      <no-data v-if="!myConsultList.length"></no-data>
    </div>
  </div>
</template>

<script>
import noData from "./noData";
export default {
  data() {
    return {
      myConsultList: [] // 接收返回数据的数组
    };
  },
  created() {
    this.getConsultList();
  },
  methods: {
    getConsultList() {
      let _openId = this.$tool.localGet("openId");
      this.axios
        .get(
          `/api-window-offices/legaladvice/gzh/list-by-openid?openId=${_openId}`
        )
        .then(res => {
          console.log(res);
          if (res.data) this.myConsultList = res.data;
        });
    }
  },
  components: {
    noData
  }
};
</script>

<style lang="less" scoped>
.info {
  
  padding-top: 21/37.5rem;
  font-size: 14/37.5rem;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  .info-container {
    background-color: #fff;
    border-radius: 6/37.5rem;
    margin-bottom: 15/37.5rem;
    box-shadow: 0 0 1px 1px rgba(155, 155, 155, 0.1);
    > p {
      height: 40/37.5rem;
      line-height: 40/37.5rem;
      padding: 0 12/37.5rem;
      border-bottom: 1/37.5rem solid #f2f2f2;
    }
    > div {
      padding-bottom: 13/37.5rem;
      border-bottom: 1/37.5rem solid #f2f2f2;
      p {
        padding: 12/37.5rem 12/37.5rem 0;
      }
    }
  }
}
</style>
