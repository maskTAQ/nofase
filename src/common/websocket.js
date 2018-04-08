import { wss } from "src/config";
let fn = () => {};

const result = UserId => {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(wss);
    ws.onopen = () => {
      console.log(UserId);
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

export default {
  result,
  addEventListenter(f) {
    fn = f;
  }
};
