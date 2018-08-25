import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import AppNavigator from "../Navigation";
import AppReducer from "src/reducers";

const initialNav = AppNavigator.router.getStateForAction(
  AppNavigator.router.getActionForPathAndParams("Home")
);

const initStore = {
  nav: initialNav,
  auth: {
    isLogin: false,
    AdminId: "",
    AdminLevel: ""
  },
  userInfo: {
    hasData: false
  },
  location: {}
};

const asyncDispetch = store => next => action => {
  const { type, api, promise } = action;
  if (promise) {
    next({ type, payload: { hasData: "loading" } });
    return api()
      .then(res => {
        store.dispatch({
          type,
          payload: Object.assign({ hasData: true, ...res })
        });
        return Promise.resolve(res);
      })
      .catch(e => {
        store.dispatch({ type, status: "error", errData: e });
        return Promise.resolve(e);
      });
  }
  return next(action);
};
const store = createStore(
  AppReducer,
  initStore,
  applyMiddleware(thunk, asyncDispetch)
);
export default store;
