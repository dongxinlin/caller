import Vue from 'vue'

class cubeTMS {
  /* 单一选择器 */
  static getPicker(that, alias, confirm, cancel, ...column) {
    return that.$createPicker({
      title: '选择内容',
      alias: alias,
      data: [...column],
      onSelect: confirm,
      onCancel: cancel
    })
  }

  /* 日期选择器 */
  static getDatePicker(that, column, confirm, cancel, isMin) {
    return that.$createDatePicker({
      title: '选择日期',
      format: {
        year: 'YYYY年',
        month: 'MM月',
        date: 'DD日',
        hour: 'hh时',
        minute: 'mm分',
        second: 'ss秒'
      },
      columnCount: column,
      min: isMin ? new Date([new Date().getFullYear() - 1]) : new Date(),
      value: new Date(),
      onSelect: confirm,
      onCancel: cancel
    })
  }

  /* 时间选择器 */
  static getTimePicker(that, confirm, cancel, minuteStep = 10, isMin) {
    return that.$createTimePicker({
      title: '选择日期',
      showNow: false,
      minuteStep: minuteStep,
      min: isMin ? new Date([new Date().getFullYear() - 1]) : null,
      max: new Date([new Date().getFullYear() + 2]),
      onSelect: confirm,
      onCancel: cancel
    })
  }

  /* 级联选择器 */
  static getCascadePicker(that, alias, data, confirm, cancel) {
    return that.$createCascadePicker({
      title: '选择内容',
      alias: alias,
      data: data,
      onSelect: confirm,
      onCancel: cancel
    })
  }

  /* 查看img */
  static lookImg(that, url) {
    const params = {
      $props: {
        imgs: [url]
      }
    }
    that.$createImagePreview({ ...params }).show()
  }

  /* 查看img列表 */
  static lookImgList(that, imgs, index) {
    that.imgIndex = index
    const params = {
      $props: {
        imgs: that[imgs],
        initialIndex: 'imgIndex', // 响应式数据key
        loop: false
      },
      $events: {
        change: (index) => {
          that.imgIndex = index
        }
      }
    }
    that.$createImagePreview({ ...params }).show()
  }

  /* 消息框 */
  static alertDialog(that, title = '提示', content, confirm, confirmBtn = '确认') {
    that.$createDialog({
      type: 'alert',
      icon: 'cubeic-alert',
      showClose: true,
      title: title,
      content: content,
      onConfirm: confirm,
      confirmBtn: confirmBtn
    }).show()
  }

  /* 确认框 */
  static confirmDialog(that, title = '提示', confirm, cancel, confirmBtn = '确认', cancelBtn = '取消') {
    that.$createDialog({
      type: 'confirm',
      icon: 'cubeic-alert',
      showClose: true,
      title: title,
      onConfirm: confirm,
      onCancel: cancel,
      confirmBtn: confirmBtn,
      cancelBtn: cancelBtn
    }).show()
  }

  /* 输入确认框 */
  static promptDialog(that, title = '提示', confirm, cancel, confirmBtn = '确认', cancelBtn = '取消') {
    that.$createDialog({
      type: 'prompt',
      showClose: true,
      title: title,
      prompt: {
        value: '',
        placeholder: '请输入'
      },
      onConfirm: confirm,
      onCancel: cancel,
      confirmBtn: confirmBtn,
      cancelBtn: cancelBtn
    }).show()
  }

  /* scroll配置 */
  static scrollOp() {
    return {
      scrollbar: true,
      pullDownRefresh: {
        threshold: 60,
        stop: 40,
        txt: '更新成功'
      },
      pullUpLoad: {
        txt: { more: '暂无更多', noMore: '暂无更多' }
      }
    }
  }

  /* scroll更新 */
  static scrollForceUpdate(el) {
    setTimeout(() => el.forceUpdate(), 1000)
  }

  /* scroll重置 */
  static scrollRefresh(el) {
    setTimeout(() => el.scrollRefresh(), 1000)
  }

  /* scroll屏幕变化 */
  static scrollResize(el) {
    window.addEventListener('resize', () => {
      el && this.scrollRefresh(el)
    })
  }

  /* scroll重置img */
  static scrollRefreshByImg(el) {
    document.addEventListener('onload', (e) => {
      const elem = e.target
      elem.tagName.toLowerCase() === 'img' && el && el.refresh()
    }, true)
  }
}

Vue.prototype.$cubeTMS = cubeTMS
export default cubeTMS
