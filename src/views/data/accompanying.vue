<template>
  <div class="accompanying-container">
    <div class="content" @click="skip"><span class="iconfont iconjia fs"></span>添加新的陪同人</div>
    <div class="m_10TM fsd">
      <cube-checkbox-group v-model="checkList">
        <div class="ss">
          <cube-checkbox option="1">
            <div class="imt">
              <p><span class="m_30RM">刘美</span><span>车牌号：鄂AM6060</span></p>
              <p>身份证号：420520199603090039</p>
            </div>
          </cube-checkbox>
          <span class="iconfont iconbianji" @click.prevent="skip()"></span>
        </div>
        <div class="ss">
          <cube-checkbox option="2">
            <div class="imt">
              <p><span class="m_30RM">刘美</span><span>车牌号：鄂AM6060</span></p>
              <p>身份证号：420520199603090039</p>
            </div>
          </cube-checkbox>
          <span class="iconfont iconbianji" @click.prevent="skip()"></span>
        </div>
      </cube-checkbox-group>
    </div>
    <div class="ms m_20TBM">
      <cube-button type="submit">保存</cube-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkList: [],
      options: ["1", "2", "3", "4"]
    };
  },
  methods: {
    gest() {
      console.log(1);
    },
    skip(id=""){
      this.$router.push({name:'newly',query:{id:id}})
    }
  }
};
</script>


<style lang="less" scoped>
.content {
  height: 0.8rem;
  width: 100%;
  text-align: center;
  justify-content: center;
  display: flex;
  align-items: center;
  color: rgba(251, 123, 74, 1);
  background-color: #fff;
  .fs {
    margin-right: 0.1rem;
  }
}
.imt {
  width: 100%;
  padding-left: 0.4rem;
}
.ss {
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(226, 226, 226, 1);
  align-items: center;
  box-sizing: border-box;
  &:last-of-type {
    border-bottom: none;
  }
}

.fsd {
  background-color: #fff;
  padding: 0 0.4rem;
}
</style>
