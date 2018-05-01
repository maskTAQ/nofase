/**
 * 原生桥接
 */
import { NativeModules } from "react-native";
/**
 * 平台
 */
const SharePlatform = {
  QQ: 0,
  SINA: 1,
  WECHAT: 2,
  WECHATMOMENT: 3,
  QQZONE: 4,
  FACEBOOK: 5
};

const share = ({ title, content, url, imgSrc, platform }) => {
  return new Promise((resolve, reject) => {
    NativeModules.sharemodule.share(
      content,
      imgSrc,
      url,
      title,
      SharePlatform[platform],
      message => {
        if (message === "分享成功") {
          resolve(message);
        } else {
          reject(message);
        }
        // message:分享成功、分享失败、取消分享
      }
    );
  });
};
const login = platform => {
  return new Promise((resolve, reject) => {
    NativeModules.sharemodule.authLogin(SharePlatform[platform], result => {
      if (result.code === 0) {
        console.log(
          "授权登录成功:" +
            "userId: " +
            result.uid +
            "accessToken: " +
            result.accessToken +
            "userName: " +
            result.userName +
            "userGender: " +
            result.userGender +
            "userAvatar: " +
            result.userAvatar
        );
        resolve(Object.assign(result, { userId: result.userId || result.uid }));
      } else {
        reject(result.code === 1 ? "登录失败" : "取消登录");
      }
    });
  });
};
export { share, login };
