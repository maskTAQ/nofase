import { StackNavigator } from "react-navigation";

import {Login,BindUser,Register} from 'src/pages';

export const RouteConfigs = {
    Login:{
        screen: Login
    },
    Register:{
        screen: Register
    },
    BindUser:{
        screen:BindUser
    }
}

export default StackNavigator(RouteConfigs, {
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: false
    }
});