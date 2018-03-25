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
    return post("/User/GetStoreListBySeach", params);
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
  }
};
