import { StackNavigator } from "react-navigation";

import {
  Login,
  BindUser,
  Register,
  Recharge,
  Home,
  Card,
  TranSaction,
  StoreDetail,
  Wallet,
  Pay,
  Fitnessrecord,
  User,
  Feedback
} from "src/pages";

import { TimeSlideChoose } from "src/components";
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
    screen: Recharge //充值
  },
  Card: {
    screen: Card
  },
  Home: {
    screen: Home
  },
  TranSaction: {
    screen: TranSaction //交易
  },
  TimeSlideChoose: {
    screen: TimeSlideChoose
  },
  StoreDetail: {
    screen: StoreDetail
  },
  Wallet: {
    screen: Wallet //我的钱包
  },
  Pay: {
    screen: Pay
  },
  Fitnessrecord: {
    screen: Fitnessrecord
  }, //健身记录
  User: {
    screen: User
  },
  Feedback: {
    screen: Feedback
  }
};

export default StackNavigator(RouteConfigs, {
  headerMode: "none",
  navigationOptions: {
    gesturesEnabled: false
  }
});
