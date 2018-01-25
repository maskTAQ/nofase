import { combineReducers } from "redux";
import AppNavigator from "src/Navigation";
import { NavigationActions } from "react-navigation";

const navReducer = (state, action) => {
  console.log(state, action, 3232);
  let nextState;
  const { type } = action;
  switch (type) {
    case "Login":
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: "Home" }),
        state
      );
      break;
    case "Logout":
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: "Login" }),
        state
      );
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  return nextState || state; // eslint-disable-line
};

function auth(state = {}, action) {
  const { type } = action;
  switch (type) {
    case "Login":
      return { ...state, isLogin: true };
    case "Logout":
      return { ...state, isLogin: false };
    default:
      return state;
  }
}
const appReducer = combineReducers({
  auth: auth,
  nav: navReducer
});
export default appReducer;
