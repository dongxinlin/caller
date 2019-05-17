<template>
  <div class="container">
    <div class="info">
      <div class="info-container" v-for="(item, index) in mycomplainList" :key="index">
        <p>{{item.createTime}}</p>
        <div>
          <p>
            <span>联系电话：</span>
            <span>{{item.phone}}</span>
          </p>
          <p>
            <span>投诉对象：</span>
            <span>{{item.orgName}}</span>
          </p>
          <p>
            <span>举报投诉内容：</span><br><br>
            <span style="color: #999;">{{item.rcContent}}</span>
          </p>
        </div>
        <div>
          <p>
            <span>回复时间：</span>
            <span>{{item.replyTime}}</span>
          </p>
          <p>
            <span>回复内容：</span><br><br>
            <span style="color: #999;">{{item.replyContent}}</span>
          </p>
          <p>
            <span>回复单位：</span>
            <span>{{item.replySectionName}}</span>
          </p>
        </div>
      </div>
    </div>
    <no-data v-if="!mycomplainList.length"></no-data>
  </div>
</template>

<script>
import noData from "./noData";
export default {
  components: {
    noData
  },
  data() {
    return {
      openId: "",
      mycomplainList: [] // 接收返回数据的数组
    };
  },
  mounted() {
    this.getCompalinList();
  },
  methods: {
    getCompalinList() {
      let _openId = this.$tool.localGet("openId");
      this.axios
        .get(
          `/api-window-offices/report-complaints/gzh/list-by-openid?openId=${_openId}`
        )
        .then(res => {
          console.log(res);
          res.data && (this.mycomplainList = res.data);
        });
    }
  },
  components: {
    noData
  }
};
</script>

<style lang="less" scoped>
.container {
  position: absolute;
  top: 0;
  bottom: 48/37.5rem;
  left: 0;
  right: 0;
  overflow-x: hidden;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  .info {
    margin: 0 15/37.5rem;
    padding-top: 21/37.5rem;
    font-size: 14/37.5rem;
    .info-container {
      background-color: #fff;
      border-radius: 10/37.5rem;
      margin-bottom: 15/37.5rem;
      box-shadow: 0 0 1px 1px rgba(155, 155, 155, .1);
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
          padding: 12/37.5rem 10/37.5rem 0;
        }
      }
    }
  }
}
</style>
