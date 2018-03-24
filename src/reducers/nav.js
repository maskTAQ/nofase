import { NavigationActions } from "react-navigation";

import AppNavigator from "src/Navigation";
import actionMap from "src/action";
const nav = (state, action) => {
  const { type } = action;
  switch (type) {
    case actionMap.NAVIGATE_GO: {
      const { payload: { routeName: nextRouteName, params } } = action;

      //解决路由栈中存在相同路由 依旧push的问题
      const { routes } = state;
      for (let i = 0; i < routes.length; i++) {
        const { routeName } = routes[i];
        if (routeName === nextRouteName) {
          const { key: nextRouteKey } = routes[i + 1];
          routes[i].params = params; // 带上路由的参数
          return AppNavigator.router.getStateForAction(
            NavigationActions.back({
              key: nextRouteKey //从指定的key的路由返回到上一级
            }),
            state //传入路由栈
          );
        }
      }
      return AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: nextRouteName, params }),
        state
      );
    }
    case actionMap.NAVIGATE_BACK: {
      return AppNavigator.router.getStateForAction(
        NavigationActions.back(),
        state
      );
    }
    default:
      return state || {};
  }
};

export default nav;
