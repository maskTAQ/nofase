import { StackNavigator } from "react-navigation";

import { Login, BindUser, Register, Recharge, Card } from "src/pages";

export const RouteConfigs = {
  Login: {
    screen: Login
  },
  Register: {
    screen: Register
  },
  BindUser: {
    screen: BindUser
  },
  Recharge: {
    screen: Recharge
  },
  Card: {
    screen: Card
  }
};

export default StackNavigator(RouteConfigs, {
  headerMode: "none",
  navigationOptions: {
    gesturesEnabled: false
  }
});
