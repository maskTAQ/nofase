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
  Feedback,
  DiscountsCard,
  Activity,
  FeedbackProblem,
  UpPortrait,
  Navigation
} from "src/pages";

import { Map } from "src/components";

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
    screen: Wallet //交易明细
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
  },
  DiscountsCard: {
    screen: DiscountsCard
  },
  Activity: {
    screen: Activity
  },
  Map: {
    screen: Map
  },
  FeedbackProblem: {
    screen: FeedbackProblem
  },
  UpPortrait: {
    screen: UpPortrait
  },
  Navigation: {
    screen: Navigation
  }
};

export default StackNavigator(RouteConfigs, {
  headerMode: "none",
  navigationOptions: {
    gesturesEnabled: false
  }
});
