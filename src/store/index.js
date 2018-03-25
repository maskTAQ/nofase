import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import AppNavigator from "src/Navigation";
import AppReducer from "src/reducers";

const initialNav = AppNavigator.router.getStateForAction(
  AppNavigator.router.getActionForPathAndParams("Activity")
);

const initStore = {
  nav: initialNav,
  auth: {
    isLogin: false,
    AdminId: "",
    AdminLevel: ""
  }
};

const asyncDispetch = store => next => action => {
  const { type, api, promise } = action;
  if (promise) {
    next({ type, status: "loading" });
    return api()
      .then(res => {
        store.dispatch({ type, status: "success", payload: res });
        return Promise.resolve(res);
      })
      .catch(e => {
        store.dispatch({ type, status: "error", errData: e });
        return Promise.resolve(e);
      });
  }
  return next(action);
};
export default createStore(
  AppReducer,
  initStore,
  applyMiddleware(thunk, asyncDispetch)
);
