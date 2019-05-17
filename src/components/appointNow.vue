<template>
  <div class="container">
    <div class="info">
      <p @click="showDatePicker">
        <span>查获案件日期</span>
        <span>
          {{appointInfo.seizeDate | formatDate}}
          <i class="cubeic-arrow"></i>
        </span>
      </p>
      <p @click="showPickList">
        <span>受理单位</span>
        <span>
          {{appointInfo.orgName}}
          <i class="cubeic-arrow"></i>
        </span>
      </p>
      <p>
        <span>预约人姓名</span>
        <input type="text" placeholder="请填写姓名" v-model="appointInfo.retailerName">
      </p>
      <p>
        <span>身份证号</span>
        <input type="number" placeholder="请填写身份证号" v-model="appointInfo.retailerIdNumber">
      </p>
      <p>
        <span>联系电话</span>
        <input type="number" placeholder="请填写联系电话" v-model="appointInfo.retailerPhone">
      </p>
      <p @click="showChooseDate">
        <span>预约日期(查获起7日内)</span>
        <span>
          {{appointInfo.appointmentDate | formatDate}}
          <i class="cubeic-arrow"></i>
        </span>
      </p>
      <textarea placeholder="请填写说明事项" v-model="appointInfo.content"></textarea>
    </div>
    <div class="btn">
      <button @click="appoint">预约</button>
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      appointInfo: {
        seizeDate: "",
        retailerName: "",
        retailerIdNumber: "",
        retailerPhone: "",
        content: "",
        appointmentDate: "",
        orgName: "",
        orgId: "",
        openId: "",
        nickName: ''
      },
      orgList: []
    };
  },
  created() {
    this.appointInfo.openId = this.$tool.localGet("openId")
    if(this.$tool.localGet('userWx').nickname) {
      this.appointInfo.nickName = this.$tool.localGet('userWx').nickname
    }
    if(!this.$tool.localGet('userWx').nickname) {
      this.$tool.localRem('userWx')
      location.reload()
    }
    this.getOrgList();
  },
  methods: {
    showDatePicker() {
      if (!this.datePicker) {
        this.datePicker = this.$createDatePicker({
          title: "选择日期",
          min: new Date(),
          max: new Date(2100, 0, 1),
          value: new Date(),
          onSelect: this.selectHandle
        });
      }
      this.datePicker.show();
    },
    selectHandle(date, selectedVal, selectedText) {
      this.appointInfo.seizeDate = this.$tool.getAnyDate(date);
    },
    showChooseDate() {
      if (!this.chooseDate) {
        if(!this.appointInfo.seizeDate) return this.$tool.message('请先选择案件查获日期!')
        var maxDate = new Date(this.appointInfo.seizeDate).getTime() + 7 * 24 * 60 * 60 * 1000
        this.chooseDate = this.$createDatePicker({
          title: "选择日期",
          min: new Date(),
          max: new Date(maxDate),
          value: new Date(),
          onSelect: this.selectDate
        });
      }
      this.chooseDate.show();
    },
    selectDate(date, selectedVal, selectedText) {
      this.appointInfo.appointmentDate = this.$tool.getAnyDate(date);
    },
    showPickList() {
      if (!this.pcikList) {
        this.pcikList = this.$createPicker({
          title: "请选择烟草专卖局",
          data: [this.orgList],
          alias: {
            value: "orgId",
            text: "shortName"
          },
          onSelect: this.selectList
        });
      }
      this.pcikList.show();
    },
    selectList(selectedVal, selectedIndex, selectedText) {
      this.appointInfo.orgId = selectedVal[0];
      this.appointInfo.orgName = selectedText.join("");
    },
    showToastTxtOnly(msg) {
      this.toast = this.$createToast({
        txt: msg,
        type: "txt"
      });
      this.toast.show();
    },
    appoint() {
      if (!this.appointInfo.seizeDate)
        return this.showToastTxtOnly("请选择查获案件日期");
      if (!this.appointInfo.orgName)
        return this.showToastTxtOnly("请选择受理单位");
      if (!this.appointInfo.retailerName)
        return this.showToastTxtOnly("预约人姓名不能为空");
      if (
        !/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(
          this.appointInfo.retailerIdNumber
        )
      )
        return this.showToastTxtOnly("二代身份证号码有误");
      if (!this.appointInfo.appointmentDate)
        return this.showToastTxtOnly("请选择预约日期");
      if (this.appointInfo.appointmentDate) {
        if (
          new Date(this.appointInfo.appointmentDate).getDate() -
            new Date().getDate() >
          604800000
        )
          return this.showToastTxtOnly("预约日期仅能为即日起7天内");
      }
      if (!this.appointInfo.content.trim())
        return this.showToastTxtOnly("说明事项不能为空");
      var sendData = qs.stringify(this.appointInfo);
      this.axios
        .post("/api-window-offices/case-reservation/gzh/add", this.appointInfo)
        .then(res => {
          alert("提交成功！");
          this.$router.push('/myAppoint')
        });
    },
    getOrgList() {
      this.axios.get(`/api-window-offices/common-org/all`).then(res => {
        this.orgList = res.data.records.filter(item => item.orgType == 2)
        console.log(this.orgList);
      });
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
  .info {
    margin-top: 21/37.5rem;
    background-color: #fff;
    padding-left: 15/37.5rem;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    p {
      height: 45/37.5rem;
      line-height: 45/37.5rem;
      font-size: 16/37.5rem;
      border-bottom: 1/37.5rem solid #f2f2f2;
      display: flex;
      justify-content: space-between;
      padding-right: 15/37.5rem;
      span:last-child {
        font-size: 14/37.5rem;
      }
      input {
        outline: none;
        font-size: 14/37.5rem;
        width: 50%;
        text-align: right;
        ::-webkit-input-placeholder {
          color: #8c8b8b;
        }
      }
    }
    textarea {
      width: 100%;
      height: 111/37.5rem;
      border: 0;
      outline: none;
      padding: 15/37.5rem 0;
      box-sizing: border-box;
      resize: none;
      font-size: 14/37.5rem;
      ::-webkit-input-placeholder {
        color: #8c8b8b;
      }
    }
  }
  .btn {
    padding: 15/37.5rem;
    margin-top: 21/37.5rem;
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
}
</style>
