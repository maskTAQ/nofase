import React, { Component } from "react";
import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

import { Icon } from "src/components";
import styles from "./style";

const Left = onPress => (
  <TouchableOpacity onPress={onPress}>
    <Icon size={20} source={require("./img/return.png")} />
  </TouchableOpacity>
);
const Right = () => <View />;
export default class Header extends Component {
  static defaultProps = {
    LeftComponent: Left,
    RightComponent: Right
  };
  static propTypes = {
    LeftComponent: PropTypes.element,
    RightComponent: PropTypes.element,
    style: PropTypes.object,
    title: PropTypes.string.isRequired
  };
  state = {};
  render() {
    const { LeftComponent, RightComponent, title, style } = this.props;
    const barStyle = {
      backgroundColor: "transparent",
      barStyle: "light-content"
    };
    return (
      <View style={[styles.container, style]}>
        <StatusBar
          backgroundColor={barStyle.backgroundColor}
          translucent={true}
          barStyle={barStyle.barStyle}
        />
        <View style={styles.navigationContainer}>
          <View style={styles.item}>
            <LeftComponent
              onPress={() => {
                console.log("返回上个路由");
              }}
            />
          </View>
          <View style={styles.title}>
            <Text style={styles.titleText}>{title}</Text>
          </View>
          <View style={styles.item}>
            <RightComponent />
          </View>
        </View>
      </View>
    );
  }
}
