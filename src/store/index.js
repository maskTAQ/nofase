import AppNavigator from "src/Navigation";

const initialNav = AppNavigator.router.getStateForAction(
  AppNavigator.router.getActionForPathAndParams("Home")
);

export default {
  nav: initialNav,
  auth: {
    isLogin: false,
    username: "",
    mobile: ""
  }
};
