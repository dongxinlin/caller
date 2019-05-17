const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
const initView = () => {
  let clintWidth = document.body.clientWidth / 7.5
  document.querySelector('html').style.fontSize = `${clintWidth}px`
}
window.addEventListener(resizeEvt, initView)
document.addEventListener('DOMContentLoaded', initView)
