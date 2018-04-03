import { post } from "./base";

export default {
  login({ Tel, ExCode }) {
    //http://101.200.196.202:8888/Admin/
    return post("/User/UserLoginTest", { Tel, ExCode });
  },
  rememberLogin({ Tel }) {
    return post("/User/UserLoginTest", { Tel });
  },
  register({ NickName, Tel, ExCode }) {
    return post("/User/UserReg", { NickName, Tel, ExCode });
  },
  sendCode(Tel) {
    return post("/User/GetExCode", { Tel }, { loading: false });
  },
  // 获取商家列表(列表模式)
  getStoreList(params) {
    return post("/User/GetStoreListBySeach", params, { loading: false });
  },
  //获取用户信息
  getUserInfo() {
    return post("/User/GetUserInfo");
  },
  //设置用户信息
  setUserInfo(params) {
    return post("/User/EditUserInfo", params);
  },
  //验证 验证码
  verifyCode(Tel, ExCode) {
    return post("/User/ExTelCode", { Tel, ExCode });
  },
  //获取店铺信息
  getStoreInfo({ Need, StoreId, AdminId }) {
    return post(
      "/Store/GetStoreInfoByNeed",
      { Need, StoreId, AdminId },
      { loading: false }
    );
  },
  //读取课程表
  getCurriculum({ StoreId }) {
    return post("/Store/GetCurriculumList", { StoreId }, { loading: false });
  },
  //获取设备信息
  getStoreEquip(params) {
    return post("/Store/GetStoreEqui", params, { loading: false });
  },
  //获取用户消费信心
  getUserOrderList(params) {
    return post("/User/GetUserOrderList", params);
  },
  //完成订单
  completeOrder({ OrderId, CardId, Score }) {
    return post("/User/SettlementOrder", { OrderId, CardId, Score });
  },
  //获取用户订单状态
  getOrderStatus() {
    return post("/User/GetUsingOrder");
  },
  //获取优惠列表
  getDiscountList() {
    return post("/User/GetUserCardList");
  }
};
