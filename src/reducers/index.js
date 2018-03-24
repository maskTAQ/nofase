import { combineReducers } from "redux";

import actionMap from "src/action";
import nav from "./nav";

const appReducer = combineReducers({
  auth: (state = {}, action) => {
    const { type, payload } = action;
    if (type === actionMap.LOGIN) {
      return { ...state, isLogin: true, ...payload };
    }
    return state;
  },
  nav: nav
});
export default appReducer;
