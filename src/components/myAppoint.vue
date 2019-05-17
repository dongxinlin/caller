<template>
  <div class="container">
    <div class="info">
      <div class="info-container" v-for="(item, index) in myAppointList" :key="index">
        <p>{{item.createTime}}</p>
        <div>
          <p>
            <span>查获案件日期：</span>
            <span>{{item.seizeDate | replaceDate}}</span>
          </p>
          <p>
            <span>姓名：</span>
            <span>{{item.retailerName}}</span>
          </p>
          <p>
            <span>身份证号：</span>
            <span>{{item.retailerIdNumber}}</span>
          </p>
          <p>
            <span>联系电话：</span>
            <span>{{item.retailerPhone}}</span>
          </p>
          <p>
            <span>说明内容:</span><br><br>
            <span style="color: #999;">{{item.content}}</span>
          </p>
          <p>
            <span>申请预约时间：</span>
            <span>{{item.appointmentDate | replaceDate}}</span>
          </p>
        </div>
        <div>
          <p>
            <span>回复时间：</span>
            <span>{{item.replyTime}}</span>
          </p>
          <p>
            <span>确定预约时间：</span>
            <span>{{item.reservedDate | replaceDate}}</span>
          </p>
          <p>
            <span>回复单位：</span>
            <span>{{item.orgName}}</span>
          </p>
          <p>
            <span>回复内容:</span><br><br>
            <span style="color: #999;">{{item.replyContent}}</span>
          </p>
        </div>
      </div>
    </div>

    <no-data v-if="!myAppointList.length"></no-data>
  </div>
</template>

<script>
import noData from "./noData";
export default {
  data() {
    return {
      myAppointList: []
    };
  },
  created() {
    this._getList();
  },
  methods: {
    _getList() {
      let _openId = this.$tool.localGet("openId");
      this.axios
        .get(
          `/api-window-offices/case-reservation/gzh/list-by-openid?openId=${_openId}`
        )
        .then(res => {
          console.log(res);
          this.myAppointList = res.data;
        });
    }
  },
  components: {
    noData
  },
  filters: {
    replaceDate(value) {
      if (!value) return;
      let reg = new RegExp("-", "g");
      return value.slice(0, 10).replace(reg, "/");
    }
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
      margin-bottom: 14/37.5rem;
      box-shadow: 0 0 1px 1px rgba(155, 155, 155, .1);
      -webkit-overflow-scrolling: touch;
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
}
</style>
