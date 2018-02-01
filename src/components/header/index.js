import React, { Component } from "react";
import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import action from "src/action";
import { Icon } from "src/components";
import styles from "./style";

const Left = onPress => (
  <TouchableOpacity onPress={onPress}>
    <Icon size={20} source={require("./img/return.png")} />
  </TouchableOpacity>
);
Left.propTypes = {
  onPress: PropTypes.func
};
const renderTitle = (title, style) => {
  if (typeof label !== "object") {
    return <Text style={[styles.titleText, style]}>{title}</Text>;
  } else {
    return title;
  }
};
@connect()
export default class Header extends Component {
  static defaultProps = {
    RightComponent: <View />,
    onLeftPress() {}
  };
  static propTypes = {
    LeftComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    RightComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    style: PropTypes.object,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
      .isRequired,
    onLeftPress: PropTypes.func,
    titleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    dispatch: PropTypes.func
  };
  state = {};
  render() {
    const {
      //onLeftPress,
      LeftComponent,
      RightComponent,
      title,
      style = {},
      titleStyle,
      dispatch
    } = this.props;
    const barStyle = {
      backgroundColor:
        style.backgroundColor || styles.container.backgroundColor,
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
            {LeftComponent ||
              Left(function() {
                dispatch(action.navigate.back());
              })}
          </View>
          <View style={styles.title}>{renderTitle(title, titleStyle)}</View>
          <View style={styles.item}>{RightComponent}</View>
        </View>
      </View>
    );
  }
}
