import { createStore, combineReducers } from "redux";
import AppNavigator from "src/Navigation";
const initialState = AppNavigator.router.getStateForAction(
  AppNavigator.router.getActionForPathAndParams("Login")
);

const navReducer = (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(state);
  return AppNavigator.router.getStateForAction(
    AppNavigator.router.getActionForPathAndParams("Home")
  );
  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state; // eslint-disable-line
};
const appReducer = combineReducers({
  test: { value: 1 },
  nav: navReducer
});
export default createStore(appReducer);
