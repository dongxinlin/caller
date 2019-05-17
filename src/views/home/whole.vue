<template>
  <div class="whole-container">
    <cube-form :model="model" @validate="validateHandler" @submit="submitHandler">
      <div class="content">
        <p class="title"><span class="ico"></span><span>被预约人信息</span></p>
        <cube-form-group>
          <cube-form-item :field="fields[0]"></cube-form-item>
          <cube-form-item :field="fields[1]"></cube-form-item>
          <cube-form-item :field="fields[2]"></cube-form-item>
          <cube-form-item :field="fields[3]"></cube-form-item>
          <cube-form-item :field="fields[4]">
            <cube-button class="btn ff" @click="showDatePicker">{{model.reservationTime ||
              '请选择预约时间'}}</cube-button>
            <date-picker ref="datePicker" @select="dateSelectHandler"></date-picker>
          </cube-form-item>
          <cube-form-item :field="fields[5]"></cube-form-item>
        </cube-form-group>
      </div>
      <div class="content fs">
        <p class="title"><span class="ico"></span> <span>预约人信息</span></p>
        <div class="cst"><span class="ffs">单位: </span><span>喻信中智（武汉）科技有限公司</span></div>
        <div class="cst"><span class="ffs">姓名: </span><span>王二小</span></div>
        <div class="cst"><span class="ffs">性别: </span><span>男</span></div>
        <div class="cst"><span class="ffs">手机号: </span><span>13527891329</span></div>
        <div class="cst"><span class="ffs">身份证号: </span><span>420520199603090039</span></div>
        <div class="cst"><span class="ffs">部门: </span><span>技术部</span></div>
        <div class="cst"><span class="ffs">车牌号: </span><span>鄂AM6060</span></div>
      </div>
      <div class="content fs">
        <div class="dd">
          <p class="title"><span class="ico"></span><span>陪同人信息</span></p>
          <router-link class="peit" to="/data/accompanying">+ 选择陪同人</router-link>
        </div>
        <div class="fst"><span class="ffs">王二小</span><span>420520199603090039</span><span>鄂AM6060</span><span class="iconfont iconshanchu-copy"
            @click="confirmDialog('确定删除陪同人?','remove')"></span></div>
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
import { DatePicker } from "cube-ui";
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
          label: "预约单位 :",
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
          label: "预约部门 :",
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
          modelKey: "appelleePassivityName",
          label: "预约人员 :",
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
          modelKey: "appelleePassivityPhone",
          label: "预约手机 :",
          props: {
            placeholder: "请输入姓名"
          },
          rules: {
            required: true,
            type: "tel"
          },
          trigger: "blur"
        },
        {
          modelKey: "reservationTime",
          label: "预约时间 :",
          rules: {
            required: true
          }
        },
        {
          type: "input",
          modelKey: "reservationNumber",
          label: "预约号 :",
          props: {
            placeholder: "请输入姓名"
          },
          rules: {
            required: true
          },
          trigger: "blur"
        }
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
    showDatePicker() {
      if (!this.dateTimePicker) {
        this.dateTimePicker = this.$createDatePicker({
          title: "预约时间",
          format: {
            year: "YYYY年",
            month: "MM月",
            date: "DD日",
            hour: "hh时",
            minute: "mm分",
          },
          min: new Date(),
          value: new Date(),
          columnCount: 5,
          onSelect: this.dateSelectHandler,
          onCancel: this.dateSelectHandler
        });
      }
      this.dateTimePicker.show();
    },
    dateSelectHandler(date, selectedVal, selectedText) {
      this.model.reservationTime = "";
      this.model.reservationTime = this.$tool.dateToOb(date);
    },
    skip() {
      t;
    },
    remove() {}
  },
  components: {
    DatePicker
  }
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

