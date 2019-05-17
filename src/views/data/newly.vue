<template>
  <div class="whole-container">
    <cube-form :model="model" @validate="validateHandler" @submit="submitHandler">
      <div class="content">
        <cube-form-group>
          <cube-form-item :field="fields[0]"></cube-form-item>
          <cube-form-item :field="fields[1]"></cube-form-item>
          <cube-form-item :field="fields[2]"></cube-form-item>
        </cube-form-group>
      </div>
      <cube-form-group>
        <div class="ms m_20TBM">
          <cube-button type="submit">保存</cube-button>
        </div>
      </cube-form-group>
    </cube-form>
  </div>
</template>
<script>
import mixinConfirmDialog from "@/mixin/mixinConfirmDialog";
export default {
  mixins: [mixinConfirmDialog],
  data() {
    return {
      validity: {},
      valid: undefined,
      model: {
        appelleeUnitName: "",
        appelleeDepartmentName: "",
        appelleePassivityName: "",
        appelleePassivityPhone: "",
        reservationTime: "",
        reservationNumber: ""
      },
      fields: [
        {
          type: "input",
          modelKey: "appelleeUnitName",
          label: "姓名: ",
          props: {
            placeholder: "请输入姓名"
          },
          rules: {
            required: true
          },
          trigger: "blur"
        },
        {
          type: "input",
          modelKey: "appelleeDepartmentName",
          label: "身份证号: ",
          props: {
            placeholder: "请输入姓名"
          },
          rules: {
            required: true,
             pattern:/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
          },
          trigger: "blur",
        },
        {
          type: "input",
          modelKey: "appelleePassivityName",
          label: "车牌号: ",
          props: {
            placeholder: "请输入姓名"
          },
          rules: {
            required: true
          },
          trigger: "blur"
        },
      ]
    };
  },
  methods: {
    submitHandler(e) {
      console.log(e);
    },
    validateHandler(result) {
      this.validity = result.validity;
      this.valid = result.valid;
    },
    skip() {

    },
    remove() {},
  },
};
</script>

<style lang="less" scoped>
.fs {
  margin-top: 0.1rem;
}
.dd {
  display: flex;
  justify-content: space-between;
}
.content {
  padding: 0.26rem;
  background-color: #fff;
  .title {
    display: flex;
    align-items: center;
    font-size: 0.3rem;
    .ico {
      width: 0.04rem;
      height: 0.3rem;
      background-color: #ffaf24;
      margin-right: 0.1rem;
    }
  }
  .cst {
    padding: 10px 0;
    .ffs {
      display: inline-block;
      width: 100px;
      padding-right: 10px;
      text-align: right;
    }
  }
  .peit {
    background: rgba(251, 232, 218, 1);
    padding: 0.1rem;
    font-size: 0.23rem;
    color: #fb7b4a;
    border-radius: 0.2rem;
  }
  .fst {
    display: flex;
    padding: 0.3rem 0;
    justify-content: space-between;
    border-bottom: 1px solid rgba(226, 226, 226, 1);
    span {
      padding: 0 0.15rem;
      font-size: 0.3rem;
      color: rgba(90, 91, 91, 1);
    }
  }
}
</style>

