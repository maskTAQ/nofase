import { NativeModules } from "react-native";

const Alipay = async params => {
  NativeModules.Alipay.pay(params);
};

export { Alipay };
