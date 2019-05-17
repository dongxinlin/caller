import Vue from 'vue';
import {Toast} from 'cube-ui';
import router from '@/router/index'

Vue.use(Toast);

const tool = {
  baseURL: process.env.BASE_API,
};

tool.scrollOp = {//下拉配置
  scrollbar: true,
  pullDownRefresh: {
    threshold: 60,
    stop: 40,
    txt: '更新成功'
  },
  pullUpLoad: {
    txt: {more: '暂无更多', noMore: '暂无更多'}
  }
};

tool.upload = { //上传
  img: () => `${tool.baseURL}/api-wx-qyh/file/upload?token=${tool.localGet('token')}`
};

tool.download = { //上传
  img: (fileUrl) => `${tool.baseURL}/api-wx-qyh/file/download/${fileUrl}`
};

tool.message = (msg, sec = 3) => {
  return Toast.$create({
    txt: msg,
    type: 'txt',
    time: sec * 1000,
    zIndex: 9999,
  }).show()
};

tool.messageSuccess = (msg, sec = 3) => {
  return Toast.$create({
    txt: msg,
    type: "correct",
    time: sec * 1000,
    zIndex: 9999,
  }).show()
};

tool.messageErr = (msg, sec = 3) => {
  return Toast.$create({
    txt: msg,
    type: "error",
    time: sec * 1000,
    zIndex: 9999,
  }).show()
};

tool.messageLoading = (msg) => {
  return Toast.$create({
    txt: msg,
    mask: true,
    type: "loading",
    time: 0,
    zIndex: 9999,
  })
};
//检查状态码
tool.checkStatus = (status, msg, ismessage, tip) => {
  (tip && status == 0) && tool.messageSuccess(msg || '操作成功!');
  (ismessage && status != 0) && tool.messageErr(msg || '请求失败!');
  if (status == -99999){
    tool.localClear()
    location.reload()
  }
  
};

tool.ObCopy = (data) => {//复制复杂类型
  return JSON.parse(JSON.stringify(data));
};

tool.getElement = (dom, all = false) => {//获取Dom
  if (all) return document.querySelectorAll(dom)
  else return document.querySelector(dom)
};

tool.getAnyDate = (curDate, dayInterval = 0, isTime = false) => {
  //截取任意时间
  //var curDate = new Date(Date.parse(fromDate.replace(/-/g, "/")));
  curDate.setDate(curDate.getDate() + dayInterval);
  let year = curDate.getFullYear();
  let month = (curDate.getMonth() + 1) < 10 ? "0" + (curDate.getMonth() + 1) : (curDate.getMonth() + 1);
  let day = curDate.getDate() < 10 ? "0" + curDate.getDate() : curDate.getDate();
  let hour = curDate.getHours() < 10 ? '0' + curDate.getHours() : '' + curDate.getHours();
  let minutes = curDate.getMinutes() < 10 ? '0' + curDate.getMinutes() : '' + curDate.getMinutes();
  let seconds = curDate.getSeconds() < 10 ? '0' + curDate.getSeconds() : '' + curDate.getSeconds();
  if (isTime) return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
  else return `${year}-${month}-${day}`;
};

tool.getDateRange = (start, end) => {
  if (!start || !end) return '未知时间';
  let data = new Date(end).getTime() - new Date(start).getTime();
  if (!data || data < 0) return '未知时间';
  let days = Math.floor(data / (24 * 3600 * 1000));
  let leave1 = data % (24 * 3600 * 1000);//小时余数
  let hours = Math.floor(leave1 / (3600 * 1000)) > 9 ? Math.floor(leave1 / (3600 * 1000)) : `0${Math.floor(leave1 / (3600 * 1000))}`;
  let leave2 = leave1 % (3600 * 1000);//分钟余数
  let minutes = Math.floor(leave2 / (60 * 1000)) > 9 ? Math.floor(leave2 / (60 * 1000)) : `0${Math.floor(leave2 / (60 * 1000))}`;
  let leave3 = leave2 % (60 * 1000);//秒余数
  let seconds = Math.round(leave3 / 1000) > 9 ? Math.round(leave3 / 1000) : `0${Math.round(leave3 / 1000)}`;
  return `${days}天${hours}:${minutes}`
};

tool.RndNum = (n) => {//生成随机数
  return Math.floor(Math.random() * n);
};

tool.ranColor = () => {//随机颜色
  return "#" + (function (color) {
    return new Array(7 - color.length).join("0") + color;
  })((Math.random() * 0x1000000 | 0).toString(16));
};

tool.localSet = (key, data) => {/*存储*/
  typeof data != 'object' && localStorage.setItem(key, data);
  typeof data == 'object' && localStorage.setItem(key, JSON.stringify(data));
};

tool.localRem = (key) => {
  localStorage.removeItem(key);
};

tool.localGet = (key) => {
  let data = localStorage.getItem(key);
  if (tool.IFJSON(data)) return JSON.parse(data);
  else return data;
};
/*判断JSON*/
tool.IFJSON = (str) => {
  try {
    let obj = JSON.parse(str);
    if (typeof obj == 'object' && obj) return true;
    else return false;
  } catch (e) {
    return false;
  }
}

tool.localClear = () => {
  localStorage.clear();
};

tool.deletParams = (form, ...arg) => {//删除对象固有字段
  arg.forEach((v, i) => {
    delete form[v]
  })
};

tool.backPage = () => {
  router.go(-1);
};

tool.goPage = (name) => {
  router.push({name});
};

tool.quit = () => {
  document.addEventListener('plusready', () => {//退出功能
    var first = null;
    plus.key.addEventListener("backbutton", function () {
      if (
        router.currentRoute.matched[0].name == 'home' ||
        router.currentRoute.matched[0].name == 'login' ||
        router.currentRoute.matched[0].name == 'maintain'
      ) {
        if (!first) {
          first = new Date().getTime();
          tool.message('再次点击退出应用')
          setTimeout(() => {
            first = null;
          }, 1000);
        } else {
          if (new Date().getTime() - first < 1000) {
            //那么就退出app
            plus.runtime.quit();
          }
        }
      }
      else {
        router.go(-1)
      }
    })
  })
};

tool.inputOnfocus = () => {//聚焦
  if (/Android [4-6]/.test(navigator.appVersion)) {
    tool.getElement("#app input", true).onfocus(function (event) {
      setTimeout(() => {
        $(event.target)[0].scrollIntoView();
      }, 200)
    });
  }
};

/*scroll*/
tool.forceUpdate = (el) => {//更新下拉
  setTimeout(() => {
    el.forceUpdate()
  }, 1000)
};

tool.refreshImg = (el) => {//图片加载
  let img = document.querySelectorAll('img');
  document.addEventListener('onload', img, () => {
    el && el.refresh();
  })
};

tool.onresize = (el) => {//监听屏幕变化
  window.addEventListener('resize', () => {
    el && el.scroll.refresh();
  })
};
/*scroll*/
tool.getCode = name => {//获取code码
  let url = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  let newUrl = window.location.search.substr(1).match(url);
  if (newUrl != null) return unescape(newUrl[2]);
  else return false;
}
/*查询参数为复杂类型*/
tool.getQuery = (item, open = true) => {
  if (!item) return false;
  if (open) return JSON.parse(decodeURIComponent(item));
  else return encodeURIComponent(JSON.stringify(item));
}
/*将请求中的复杂类型转为str*/
tool.filterRes = dataCp => {
  for (var key in dataCp) {
    typeof (dataCp[key]) == 'object' && (dataCp[key] = JSON.stringify(dataCp[key]))
  }
  return dataCp;
}
/*404图片处理*/
tool.imgErr = () => {
  document.addEventListener("error", function (e) {
    let elem = e.target;
    elem.tagName.toLowerCase() == 'img' && ( elem.src = '/static/img/404.png')
  }, true);
}

Vue.prototype.$tool = tool
export default tool
