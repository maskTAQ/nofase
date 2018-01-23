import React, { Component } from "react";
import { View, StatusBar } from "react-native";
import PropTypes from "prop-types";

import styles from "./style";

const Left = () => <View />;
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
    title: PropTypes.string
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
          <LeftComponent />
          {title}
          <RightComponent />
        </View>
      </View>
    );
  }
}
