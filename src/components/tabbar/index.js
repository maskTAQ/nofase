import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";

import action from "src/action";
import styles from "./style";
import { Button, Icon } from "src/components";

export default class Tabbar extends Component {
  static propTypes = {
    navigationState: PropTypes.object,
    navigation: PropTypes.object
  };
  store = {
    routeInfo: {
      CurrentUser: {
        label: "当前用户",
        icon: require("./img/u8.png")
      },
      StoreManage: {
        label: "商家管理",
        icon: require("./img/u10.png")
      },
      AccountAdmin: {
        label: "账户管理",
        icon: require("./img/u12.png")
      },
      Setting: {
        label: "设置",
        icon: require("./img/u14.png")
      }
    }
  };
  go(routeName) {
    this.props.navigation.dispatch(action.navigate.tabGo({ routeName }));
  }
  scan = () => {
    console.log();
    this.props.navigation.dispatch(action.navigate.go({ routeName: "QRScan" }));
  };
  render() {
    const { routes } = this.props.navigationState;
    const verifyRoutes = Object.assign([], routes);
    verifyRoutes.splice(2, 0, "scanQR");
    const { routeInfo } = this.store;
    return (
      <View style={styles.tabBarWrapper}>
        <Button onPress={this.scan} style={styles.tabBarScanQR}>
          <Icon size={40} source={require("./img/u6.png")} />
        </Button>
        <View style={styles.tabBar}>
          {verifyRoutes.map(item => {
            if (item === "scanQR") {
              return <View style={styles.tabBarScanQRWrapper} key={item} />;
            }
            const { routeName } = item;
            return (
              <Button
                onPress={() => this.go(routeName)}
                style={styles.tabBarItem}
                key={routeName}
              >
                <Icon size={30} source={routeInfo[routeName].icon} />
                <Text style={styles.tabBarItemLabel}>
                  {routeInfo[routeName].label}
                </Text>
              </Button>
            );
          })}
        </View>
      </View>
    );
  }
}
