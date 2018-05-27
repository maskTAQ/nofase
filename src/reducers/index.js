import { combineReducers } from "redux";
import { AsyncStorage } from "react-native";
import actionMap from "src/action";
import nav from "./nav";

const appReducer = combineReducers({
  auth: (state = {}, action) => {
    const { type, payload } = action;
    if (type === actionMap.LOGIN) {
      AsyncStorage.removeItem("mobile");
      return { ...state, isLogin: true, ...payload };
    }
    if (type === actionMap.LOGOUT) {
      return { ...state, isLogin: false, ...payload };
    }
    return state;
  },
  nav: nav,
  userInfo: (state = {}, action) => {
    const { type, payload } = action;
    if (type === "userInfo") {
      return { ...state, ...payload };
    }

    if (type === "userInfo_reset") {
      return { hasData: false };
    }
    return state;
  }
});
export default appReducer;
