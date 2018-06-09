import Axios from "axios";
import { Tip } from "src/common";

import { baseURL } from "src/config";

// 拦截响应response，并做一些错误处理
Axios.interceptors.response.use(
  response => response,
  err => {
    console.log(err.message);
    // 这里是返回状态码不为200时候的错误处理
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = "请求错误";
          break;

        case 401:
          err.message = "未授权，请登录";
          break;

        case 403:
          err.message = "拒绝访问";
          break;

        case 404:
          err.message = `请求地址出错: ${err.response.config.url}`;
          break;

        case 408:
          err.message = "请求超时";
          break;

        case 500:
          err.message = "服务器内部错误";
          break;

        case 501:
          err.message = "服务未实现";
          break;

        case 502:
          err.message = "网关错误";
          break;

        case 503:
          err.message = "服务不可用";
          break;

        case 504:
          err.message = "网关超时";
          break;

        case 505:
          err.message = "HTTP版本不受支持";
          break;

        default:
      }
    }
    err.message = err.message.replace("Network Error", "网络错误");
    err.message = err.message.replace(
      /timeout of ([\d]+)ms exceeded/,
      "请求超时"
    );
    return Promise.reject(err);
  }
);
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
          if (handleCatch) {
            Tip.fail(`${message || "未知错误"}`);
          }
          console.log(message, "message");
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
          Tip.fail(
            `${String((e && e.message) || "未知错误").replace(
              "Network Error",
              "当前无网络"
            )}`
          );
        }
        return reject(String(e.message || "未知错误"));
      });
  });
};
export { post };
