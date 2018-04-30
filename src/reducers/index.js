import { combineReducers } from "redux";

import actionMap from "src/action";
import nav from "./nav";

const appReducer = combineReducers({
  auth: (state = {}, action) => {
    const { type, payload } = action;
    if (type === actionMap.LOGIN) {
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

    if (type === "userInfo_result") {
      return { hasData: false };
    }
    return state;
  }
});
export default appReducer;
