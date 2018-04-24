import { combineReducers } from "redux";

import actionMap from "src/action";
import nav from "./nav";

const appReducer = combineReducers({
  auth: (state = {}, action) => {
    const { type, payload } = action;
    console.log(payload, "payload");
    if (type === actionMap.LOGIN) {
      return { ...state, isLogin: true, ...payload };
    }
    if (type === "LOGOUT") {
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
    return state;
  }
});
export default appReducer;
