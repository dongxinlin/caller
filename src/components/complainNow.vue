<template>
  <div class="container">
    <div class="content">
      <p @click="showActionSheet">
        <span>投诉类型</span>
        <span>
          {{tsInfo.rcType}}
          <i class="cubeic-arrow"></i>
        </span>
      </p>
      <p @click="showAliasPicker" v-if="!unclick">
        <span>所在区域</span>
        <span>
          {{tsInfo.orgName}}
          <i class="cubeic-arrow"></i>
        </span>
      </p>
      <p v-if="unclick">
        <span>所在区域</span>
        <span>
          {{tsInfo.orgName}}
        </span>
      </p>
      <p>
        <span>联系电话</span>
        <input type="number" v-model="tsInfo.phone" maxlength="11" placeholder="请输入手机号码">
      </p>
      <textarea placeholder="输入投诉的事情" v-model="tsInfo.rcContent" maxlength="60"></textarea>
    </div>
    <div class="btn">
      <button @click="submitComplain">提交举报投诉</button>
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      tsInfo: {
        orgId: "",
        openId: "",
        nickName: "",
        rcContent: "",
        phone: "",
        orgName: "",
        rcType: "",
      },
      unclick: false,
      orgCategory: [
        { orgId: 1, orgName: "乐山市烟草专卖局" },
        { orgId: 2, orgName: "乐山市市中区烟草专卖局" },
        { orgId: 3, orgName: "乐山市烟草专卖局" }
      ],
      rcTypeCategory: [
        {
          content:
            '<p style="color: #000; font-weight: 700">假烟走私烟</p><br /> <span style="font-size: 13px">向各烟草专卖局专卖科举报涉假烟和涉走私烟线索</span>',
          class: "center"
        },
        {
          content:
            '<p style="color: #000; font-weight: 700">其他</p> <br /> <span style="font-size: 13px">向乐山市烟草专卖局监察科投诉</span>',
          align: "center"
        }
      ]
    };
  },
  created() {
    this.tsInfo.openId = this.$tool.localGet("openId")
    this.tsInfo.nickName = this.$tool.localGet('userWx').nickname
    this.getOrgList();
  },
  methods: {
    showAliasPicker() {
      if (!this.aliasPicker) {
        this.aliasPicker = this.$createPicker({
          title: "请选择烟草专卖局",
          data: [this.orgCategory],
          alias: {
            value: "orgId",
            text: "shortName"
          },
          onSelect: this.selectHandle
        });
      }
      this.aliasPicker.show();
    },
    selectHandle(selectedVal, selectedIndex, selectedText) {
      this.tsInfo.orgId = selectedVal[0];
      this.tsInfo.orgName = selectedText.join("");
    },
    showActionSheet() {
      this.$createActionSheet({
        title: "举报投诉类型",
        data: this.rcTypeCategory,
        onSelect: (item, index) => {
          if (item.content.split(">")[1].split("<")[0] == '其他') {
            this.tsInfo.orgId = 9
            this.tsInfo.orgName = '乐山市局监察科'
            this.unclick = true
          }else {
            this.tsInfo.orgId = ''
            this.tsInfo.orgName = ''
            this.unclick = false
          }
          this.tsInfo.rcType = item.content.split(">")[1].split("<")[0];
        }
      }).show();
    },
    showToastTxtOnly(msg) {
      this.toast = this.$createToast({
        txt: msg,
        type: "txt"
      });
      this.toast.show();
    },
    submitComplain() {
      if (!this.tsInfo.rcType) return this.showToastTxtOnly("请选择投诉类型");
      if (!this.tsInfo.orgName) return this.showToastTxtOnly("请选择所在区域");
      if (!/^1[3456789]\d{9}$/.test(this.tsInfo.phone))
        return this.showToastTxtOnly("手机号码有误请重输");
      if (!this.tsInfo.rcContent.trim())
        return this.showToastTxtOnly("投诉内容不能为空");
      var sendData = qs.stringify(this.tsInfo);
      this.axios
        .post("/api-window-offices/report-complaints/gzh/add", this.tsInfo)
        .then(res => {
          alert("提交成功");
          this.$router.push('/myComplain')
        });
    },
    getOrgList() {
      this.axios.get(`/api-window-offices/common-org/all`).then(res => {
        this.orgCategory = res.data.records.filter(item => item.orgType == 2)
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
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  .content {
    padding: 0 15/37.5rem;
    margin-top: 21/37.5rem;
    background-color: #fff;
    p {
      display: flex;
      justify-content: space-between;
      font-size: 16/37.5rem;
      height: 45/37.5rem;
      line-height: 45/37.5rem;
      border-bottom: 1/37.5rem solid #f2f2f2;
      :last-child {
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
  }
  textarea {
    width: 100%;
    height: 200/37.5rem;
    padding: 15/37.5rem 0;
    border: 0;
    outline: none;
    box-sizing: border-box;
    resize: none;
    font-size: 14/37.5rem;
    ::-webkit-input-placeholder {
      color: #8c8b8b;
    }
  }
  .btn {
    padding: 15/37.5rem;
    margin-top: 43/37.5rem;
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
