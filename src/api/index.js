import { post } from "./base";
import Axios from "axios";

export default {
  token() {
    return Axios.request({
      url: "http://47.104.131.96:8000/",
      method: "get",
      timeout: 60000
    });
  },
  //获取二维码地址
  getQrCodeUrl(UserId, CardId) {
    return Axios.request({
      url: `https://vmslq.cn/User/GetQRImgUrl?userId=${UserId}&CardId=${CardId}`,
      method: "get",
      timeout: 6000
    });
  },
  login({ Tel, ExCode }) {
    return post("/User/UserLogin", { Tel, ExCode });
  },
  rememberLogin({ Tel }) {
    return post("/User/UserLoginTest", { Tel });
  },
  register({ NickName, Tel, ExCode }) {
    return post("/User/UserReg", { NickName, Tel, ExCode });
  },
  sendCode(Tel, isLogin) {
    const url = isLogin ? "/User/GetExCodeByLogin" : "/User/GetExCode";
    return post(url, { Tel }, { loading: false });
  },
  // 获取商家列表(列表模式)
  getStoreList(params) {
    return post("/User/GetStoreListBySeach", params, { loading: false });
  },
  //获取用户信息
  getUserInfo(loading = true) {
    return post("/User/GetUserInfo", {}, { loading });
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
  //获取店铺在线数
  getStoreNowPeople(StoreId) {
    return post("/Store/GetStoreNowPeople", { StoreId }, { loading: false });
  },
  //获取商铺图片 http://101.200.196.202:8888/Store/GetStoreImgs
  getStoreImg(StoreId) {
    return post("/Store/GetStoreImgs", { StoreId }, { loading: false });
  },
  //读取课程表
  getCurriculum({ StoreId }) {
    return post("/Store/GetCurriculumList", { StoreId }, { loading: false });
  },
  //获取设备信息
  getStoreEquip(params) {
    return post("/Store/GetStoreEqui", params, { loading: false });
  },
  //获取用户消费记录
  getUserOrderList(params) {
    return post("/User/GetUserOrderList", params, { loading: false });
  },
  //获取充值记录 http://101.200.196.202:8888/User/GetRechargeList
  getRechargeList(params) {
    return post("/User/GetRechargeList", params, { loading: false });
  },
  //完成订单
  completeOrder({ OrderId, CardId, Score, StoreId }) {
    return post("/User/SaveStoreScore", { StoreId, OrderId, CardId, Score });
  },
  //获取用户订单状态
  getOrderStatus() {
    return post("/User/GetUsingOrder", {}, { handleCatch: false });
  },
  //获取优惠列表
  getDiscountList() {
    return post("/User/GetUserCardList", {}, { loading: false });
  },
  //获取充值记录 http://101.200.196.202:8888/User/GetRechargeList
  getGetRechargeList(params) {
    return post("/User/GetRechargeList", params, { loading: false });
  },
  //获取店铺 评论头像 /User/GetScoreUserList
  getScoreUserPortrait(StoreId) {
    return post("/User/GetScoreUserList", { StoreId }, { loading: false });
  },
  getStoreScore(StoreId) {
    return post("/Store/GetStoreScore", { StoreId }, { loading: false });
  },
  //支 付
  pay(vChargeVal, UserId) {
    return post("/User/toAliPay", { vChargeVal, UserId });
  },
  wxPay(vChargeVal, UserId) {
    return post("/User/toWxPay", { vChargeVal, UserId });
  },
  //微信登录
  WxLogin(WxOpenId) {
    return post("/User/WxLogin", { WxOpenId }, { handleCatch: false });
  },
  //绑定微信
  WxBind(params) {
    return post("/User/WxBind", params);
  },
  //获取今日消费金额
  getUserPaysToday(UserId) {
    return post("/User/GetUserPaysToday", { UserId });
  },
  //获取订单状态
  getRecInfo(OrderNo) {
    return post("User/GetRecInfo", { OrderNo }, { loading: false });
  },
  //获取最新版app
  getNewApp(params) {
    return post("/Admin/GetNewUserApp", params, { loading: false });
  }
};
