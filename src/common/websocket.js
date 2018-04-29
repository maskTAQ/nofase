import { wss } from "src/config";
import { Alert } from "react-native";
let fn = () => {};

const QRWebsocket = UserId => {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(wss);
    ws.onopen = () => {
      ws.send(String(UserId)); // 注册服务
      resolve("wensocket连接成功");
    };
    ws.onerror = e => {
      console.log(e);
      resolve("wensocket连接失败：" + String(e));
    };
    ws.onmessage = e => {
      fn(JSON.parse(e.data));
    };
  });
};

const uniqueLoginWebsocket = ({ UserId, logout, paySuccess, payError }) => {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket("wss://vmslq.cn/UserStateHandler.ashx");
    ws.onopen = () => {
      console.log(UserId, "发送");
      ws.send(String(UserId)); // 注册服务
      Alert.alert("uniqueLoginWebsocket连接成功");
      resolve("uniqueLoginWebsocket连接成功");
    };
    ws.onerror = e => {
      console.log(e);
      resolve("wensocket连接失败：" + String(e));
    };
    ws.onmessage = e => {
      const { data } = e;
      Alert.alert(JSON.stringify(data));
      if (data === "False") {
        logout();
      }
      if (data === "PayTrue") {
        paySuccess();
      }
      if (data === "PayFalse") {
        payError();
      }
    };
  });
};

export default {
  QRWebsocket,
  uniqueLoginWebsocket,
  addEventListenter(f) {
    fn = f;
  }
};
