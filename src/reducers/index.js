import { combineReducers } from "redux";
import { AsyncStorage } from "react-native";

import actionMap from "src/action";
import nav from "./nav";
import store from "src/store";

const appReducer = combineReducers({
  auth: (state = {}, action) => {
    const { type, payload } = action;
    if (type === actionMap.LOGIN) {
      store.dispatch(action.navigate.go({ routeName: "Home" }));
      return { ...state, isLogin: true, ...payload };
    }
    if (type === actionMap.LOGOUT) {
      AsyncStorage.removeItem("mobile");
      store.dispatch(actionMap.navigate.go({ routeName: "Login" }));
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
