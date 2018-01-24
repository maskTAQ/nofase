import React, { Component } from "react";
import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

import { Icon } from "src/components";
import styles from "./style";

const Left = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Icon size={20} source={require("./img/return.png")} />
  </TouchableOpacity>
);
Left.propTypes = {
  onPress: PropTypes.func
};
const renderTitle = (title, style) => {
  if (typeof label !== "object") {
    return <Text style={styles.titleText}>{title}</Text>;
  } else {
    return title;
  }
};
export default class Header extends Component {
  static defaultProps = {
    RightComponent: <View />
  };
  static propTypes = {
    LeftComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    RightComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    style: PropTypes.object,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
      .isRequired,
    onLeftPress: PropTypes.func
  };
  state = {};
  render() {
    const {
      onLeftPress,
      LeftComponent,
      RightComponent,
      title,
      style
    } = this.props;
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
          <View style={styles.item}>{LeftComponent || Left(onLeftPress)}</View>
          <View style={styles.title}>{renderTitle(title)}</View>
          <View style={styles.item}>{RightComponent}</View>
        </View>
      </View>
    );
  }
}
