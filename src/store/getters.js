const getters = {
  /* wxConfig */
  userWx: state => state.wxConfig.userWx,
  wx: state => state.wxConfig.wx,
  /* user */
  userInfo: state => state.user.userInfo,
  /* global */
  listByCloud: state => state.global.listByCloud
}

export default getters
