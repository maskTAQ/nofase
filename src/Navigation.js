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
  Navigation,
  StoreImg,
  A1,
  A2,
  A3,
  PayResult,
  WxBind,
  MapPattern
} from "src/pages";

import { Map, Web } from "src/components";

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
  },
  StoreImg: {
    screen: StoreImg
  },
  A1: {
    screen: A1
  },
  A2: {
    screen: A2
  },
  A3: {
    screen: A3
  },
  PayResult: {
    screen: PayResult
  },
  WxBind: {
    screen: WxBind
  },
  Web: {
    screen: Web
  },
  MapPattern: {
    screen: MapPattern
  }
};

export default StackNavigator(RouteConfigs, {
  headerMode: "none",
  navigationOptions: {
    gesturesEnabled: false
  }
});
