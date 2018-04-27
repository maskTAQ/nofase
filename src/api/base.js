import Axios from "axios";
import { Tip } from "src/common";

import { baseURL } from "src/config";

/**
 * 请求拦截器
 * */
// Axios.interceptors.request.use(
//   config => {
//     //在发送请求之前做某事
//     // console.log("这里是拦截器");
//     // console.log("config", config);
//     return Storage.get("Token")
//       .then(data => {
//         if (data) {
//           config.headers["token"] = data;
//         }
//         config.headers["Content-Type"] = "application/json";
//         config.headers["timestamp"] = Date.parse(new Date());
//         config.headers["version"] = "1.0.0";
//         return config;
//       })
//       .catch(e => {
//         config.headers["Content-Type"] = "application/json";
//         config.headers["timestamp"] = Date.parse(new Date());
//         config.headers["version"] = "1.0.0";
//         return config;
//       });
//   },
//   error => {
//     //请求错误时做些事
//     return Promise.reject(error);
//   }
// );

const requestWrapper = (url, param = {}) => {
  const { UserId } = require("../store").default.getState().auth;
  return Axios.request({
    baseURL: baseURL,
    url,
    method: "post",
    timeout: 60000,
    data: Object.assign(param, { UserId })
  });
};
const post = (
  url,
  params = {},
  { loading = true, handleCatch = true } = {}
) => {
  loading && Tip.loading();
  //console.log(store && url);
  return new Promise((resolve, reject) => {
    requestWrapper(url, params)
      .then(res => {
        const { data: Data } = res;
        const { code, message, data } = Data;
        loading && Tip.dismiss();
        if (code > 0) {
          const d = data || message;
          return resolve(d);
        } else {
          console.log("------ start -------");
          console.log("error:", res);
          console.log("地址:" + url);
          console.log("参数:", params);
          console.log("------ end -------");
          Tip.fail(`error:${message}`);
          return reject(message);
        }
      })
      .catch(e => {
        console.log("------ start -------");
        console.log("error:", e);
        console.log("地址:" + url);
        console.log("参数:", params);
        console.log("------ end -------");
        loading && Tip.dismiss();
        if (handleCatch) {
          Tip.fail(`error:${String(e)}`);
        }
        return reject(String(e));
      });
  });
};
export { post };
