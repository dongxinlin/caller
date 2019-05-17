<template>
  <div>
    <van-search placeholder="搜索单位名/姓名" @blur="search" v-model="sendData.condition" />
    <van-tabs v-model="active">
      <van-tab title="预约中" class="full">
        <!-- <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="item in list" :key="item" :title="item" />
        </van-list> -->
        <van-swipe-cell :right-width="120" :disabled="false">
            <van-cell-group>
              <div class="conten">
                <div class="imt">
                  <p><span class="m_30RM">南方都市环保有限公司</span><span>苏大强</span></p>
                  <p class="m_20TM">2019年4月5日 15:30</p>
                </div>
                <div class="graph bgcBl">待审批</div>
              </div>
            </van-cell-group>
            <span slot="right" class="dtn" style="background:rgba(237,117,46,1);" @click="goCancel">变更</span>
            <span slot="right" class="dtn" style="background:rgba(234,78,61,1);" @click="confirmDialog('确定取消当前预约?','cancel')">取消</span>
          </van-swipe-cell>
      </van-tab>
      <van-tab title="历史预约">
        <van-swipe-cell :right-width="60" :disabled="false">
          <van-cell-group>
            <div class="conten">
              <div class="imt">
                <p><span class="m_30RM">南方都市环保有限公司</span><span>苏大强</span></p>
                <p class="m_20TM">2019年4月5日 15:30</p>
              </div>
              <div class="graph bgcBl">待审批</div>
            </div>
          </van-cell-group>
          <span slot="right" class="dtn" style="background:rgba(234,78,61,1);" @click="confirmDialog('确定删除当前预约?','cancel')">删除</span>
        </van-swipe-cell>
      </van-tab>
    </van-tabs>
  </div>
</template>


<script>
import mixinPage from "@/mixin/mixinPage.js";
import mixinConfirmDialog from "@/mixin/mixinConfirmDialog";
import { getSupList } from "@/api";
export default {
  mixins: [mixinConfirmDialog, mixinPage],
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      records: [],
      sendData: {
        condition: "",
        current: 1,
        size: 10
      }
    };
  },
  created() {
    // this._pullingPage();
    // getSupList(this.sendData)
  },
  methods: {
    search() {
      console.log(1);
    },
    cancel() {
      console.log(2);
    },
    goCancel() {
      this.$cubeTMS.promptDialog(this, "", (e, val) => {
        if (!val) return this.$tool.messageErr("");
      });
    },
    // onLoad() {
    //   // 异步更新数据
    //   setTimeout(() => {
    //     for (let i = 0; i < 10; i++) {
    //       this.list.push(this.list.length + 1);
    //     }
    //     // 加载状态结束
    //     this.loading = false;

    //     // 数据全部加载完成
    //     if (this.list.length >= 40) {
    //       this.finished = true;
    //     }
    //   }, 500);
    // },
    _pullingPage(FP = true) {
      this.pullingPage(getSupList, FP);
    }
  }
};
</script>

<style lang="less" scoped>
.dynamic-container {
  width: 100%;
}
.conten {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.4rem;
  .imt {
  }
}
.dtn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 100%;
  color: #fff;
}
</style>
