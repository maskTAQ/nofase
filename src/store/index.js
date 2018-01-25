import AppNavigator from "src/Navigation";

const initialNav = Navigator.router.getStateForAction(
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
