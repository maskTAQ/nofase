import { NativeModules } from "react-native";

const Alipay = async () => {
  const params = {
    seller: "ad",
    amount: 1
  };
  console.log(NativeModules.Alipay.pay(JSON.stringify(params)));
  // let ret = await call(Alipay.pay, res.data); // 调起支付宝，发起支付
  // if (ret.resultStatus === '9000') {
  //  // 支付成功回调
  // } else {
  //  // 支付失败回调
  // }
};

export { Alipay };
