<template>
  <div>
    <div class="info">
      <p>
        <span>手机号码</span>
        <input type="text" placeholder="请输入手机号码" v-model="phone">
      </p>
    </div>
    <div class="btn" @click="search">
      <button>查询</button>
    </div>
    <div class="info">
      <p>
        <span>零售户名称</span>
        <span>{{shopName}}</span>
      </p>
      <p>
        <span>负责人</span>
        <span>{{shopManager}}</span>
      </p>
    </div>

    <div class="steps">
      <div class="step">
        <span :class="{'active':flag=='0200'}">1</span>
        <span class="title">办证申请</span>
        <div class="describe" v-if="flag=='0200'">完成时间：{{porcTime}}</div>
        <div class="line"></div>
      </div>

      <div class="step">
        <span :class="{'active':flag==='0201'}">2</span>
        <span class="title">现场勘察</span>
        <div class="describe" v-if="flag=='0201'">完成时间：{{porcTime}}</div>
        <div class="describe" v-if="flag=='0200'">预计完成时间：{{planDate}}</div>
        <div class="line"></div>
      </div>

      <div class="step">
        <span :class="{'active':flag==='0202'}">3</span>
        <span class="title">审批制证</span>
        <div class="describe" v-if="flag=='0202'">完成时间：{{porcTime}}</div>
        <div class="describe" v-if="flag=='0201'">预计完成时间：{{planDate}}</div>
        <div class="line"></div>
      </div>

      <div class="step">
        <span :class="{'active':flag==='0203'}">4</span>
        <span class="title">许可证发放</span>
        <div class="describe" v-if="flag=='0203'">完成时间：{{porcTime}}</div>
        <div class="describe" v-if="flag=='0202'">预计完成日期：{{planDate}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: '',
      phone: '',
      shopName: '',
      shopManager: '',
      porcTime: '',
      planDate: ''
    };
  },
  methods: {
    showToastTxtOnly(msg) {
      this.toast = this.$createToast({
        txt: msg,
        type: "txt"
      });
      this.toast.show();
    },
    search() {
      this.axios.get(`/api-window-offices/monopolylicens-step/gzh/steps-by-monoId?phone=${this.phone}`)
      .then(res => {
        console.log(res);
        this.planDate = res.data.planDate
        this.shopName = res.data.shopName
        this.shopManager = res.data.shopManager
        this.flag = res.data.list[(res.data.list.length - 1)].stepCode
        this.porcTime = res.data.list[0].porcTime
      })
    }
  }
};
</script>

<style lang="less" scoped>
.info {
  margin: 21/37.5rem 0;
  background-color: #fff;
  padding-left: 15/37.5rem;
  p {
    height: 45/37.5rem;
    line-height: 45/37.5rem;
    font-size: 17/37.5rem;
    border-bottom: 1/37.5rem solid #f2f2f2;
    display: flex;
    justify-content: space-between;
    padding-right: 15/37.5rem;
    input {
      outline: none;
      font-size: 15/37.5rem;
      width: 50%;
      text-align: right;
      ::-webkit-input-placeholder {
        color: #8c8b8b;
      }
    }
  }
}
.btn {
  padding: 10/37.5rem 15/37.5rem;
  button {
    background-color: #026a52;
    border: 0;
    outline: none;
    color: #fff;
    width: 100%;
    padding: 13/37.5rem 0;
    border-radius: 6/37.5rem;
    font-size: 18/37.5rem;
  }
}

.steps {
  padding: 25/37.5rem;
  background-color: #fff;
  .step {
    height: 40/37.5rem;
    line-height: 20/37.5rem;
    position: relative;
    margin-bottom: 48/37.5rem;
    :first-child {
      width: 20/37.5rem;
      height: 20/37.5rem;
      line-height: 20/37.5rem;
      border-radius: 50%;
      background-color: #999;
      color: #fff;
      display: inline-block;
      text-align: center;
      font-size: 11/37.5rem;
    }
    .title {
      font-size: 16/37.5rem;
      padding-left: 16/37.5rem;
    }
    .describe {
      font-size: 13/37.5rem;
      color: #8c8b8b;
      padding-left: 44/37.5rem;
    }
    .line {
      position: absolute;
      height: 80/37.5rem;
      width: 2/37.5rem;
      top: 25/37.5rem;
      left: 9.5/37.5rem;
      background-color: #999;
    }
  }
  :last-child {
    margin-bottom: 0;
  }
}
.active {
  background-color: #026a52 !important;
}
</style>
