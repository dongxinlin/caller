import Vue from 'vue'

// Vue.prototype.$imgSrc = (process.env.NODE_ENV === "production" ? process.env.BASE_API : '/a1');

Vue.filter('formatDate', (value) => {
  if(!value) return
  var d = new Date(value);
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
  // var hour = d.getHours() < 10 ? '0' + d.getHours() : '' + d.getHours();
  // var minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : '' + d.getMinutes();
  // var seconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : '' + d.getSeconds();
  return year + '/' + month + '/' + day;
  // return year + '/' + month + '/' + day + ' ' + hour + ':' + minutes + ':' + seconds;
})

Vue.filter('title25', (val) => {
  return val.substring(0, 15) + '...'
})
