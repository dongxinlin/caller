<template>
    <div class="container">
        <div class="content">
            <div class="title"  @click="showAliasPicker">
                <span>选择咨询的专卖局</span>
                <span>{{info.shortName}} <i class="cubeic-arrow"></i></span>
            </div>
            <div class="phone-num">
              <span>联系电话</span>
              <input type="number" v-model="info.phone" maxlength=11 placeholder="请输入手机号码">
            </div>
            <textarea placeholder="咨询事务详细说明" v-model="info.content"></textarea>
        </div>
        <div class="btn">
          <button @click="submitConsult">提交咨询</button>
        </div>

    </div>
</template>

<script>
import qs from 'qs';
export default {
  data() {
    return {
      info: {
        content: '',
        phone: '',
        orgId:'',
        shortName: '',
        nickName: '',
        openId: '',
        orgList: []
      }
    };
  },
  created() {
    this.info.openId = this.$tool.localGet('openId')
    this.info.nickName = this.$tool.localGet('userWx').nickname
    this.getOrgList()
  },
  methods: {
    showToastTxtOnly(msg) {
      this.toast = this.$createToast({
        txt: msg,
        type: 'txt'
      })
      this.toast.show()
    },
    showAliasPicker() {
      if (!this.aliasPicker) {
        this.aliasPicker = this.$createPicker({
          title: '请选择烟草专卖局',
          data: [this.orgList],
          alias: {
            value: 'orgId',
            text: 'shortName'
          },
          onSelect: this.selectHandle
        })
      }
      this.aliasPicker.show()
    },
    selectHandle(selectedVal, selectedIndex, selectedText) {
      this.info.orgId = selectedVal[0]
      this.info.shortName = selectedText.join('')
    },
    submitConsult () {
      if(!this.info.shortName) return this.showToastTxtOnly('请选择烟草专卖局')
      if(!(/^1[3456789]\d{9}$/.test(this.info.phone))) return this.showToastTxtOnly('手机号码有误')
      if (!this.info.content.trim()) return this.showToastTxtOnly('咨询内容不能为空')
      var sendData = qs.stringify(this.info)
      this.axios.post(`/api-window-offices/legaladvice/gzh/add`, this.info).then(res => {
        alert('提交成功！')
        // location.reload()
        this.$router.push('/myConsult')
      })
    },
    getOrgList() {
      this.axios.get(`/api-window-offices/common-org/all`).then(res => {
        this.orgList = res.data.records.filter(item => item.orgType == 2)
        console.log(this.orgList);
      })
    }
  }
}
</script>






<style lang="less" scoped>
.container {
  position: absolute;
  top: 0;
  bottom: 48/37.5rem;
  left: 0;
  right: 0;
  overflow-x: hidden;
  .content {
    text-align: center;
    width: 100%;
    margin-top: 15/37.5rem;
    background-color: #fff;
    .title {
      display: flex;
      justify-content: space-between;
      height: 45/37.5rem;
      font-size: 17/37.5rem;
      line-height: 45/37.5rem;
      border-top: 1/37.5rem solid #f2f2f2;
      border-bottom: 1/37.5rem solid #f2f2f2;
      padding: 0 15/37.5rem;
      :last-child {
        font-size: 14/37.5rem;
      }
    }
    .phone-num {
      height: 45/37.5rem;
      line-height: 45/37.5rem;
      font-size: 16/37.5rem;
      display: flex;
      justify-content: space-between;
      padding: 0 15/37.5rem;
      border-bottom: 1/37.5rem solid #f2f2f2;
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
      height: 167.5/37.5rem;
      border: 0;
      outline: none;
      padding: 15/37.5rem;
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
