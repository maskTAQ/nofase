import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Header } from "src/components";
import action from "src/action";

@connect()
export default class Page extends Component {
  static propTypes = {
    LeftComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    RightComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    headerStyle: PropTypes.object,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
      .isRequired,
    onPress: PropTypes.func,
    children: PropTypes.any,
    dispatch: PropTypes.func
  };
  state = {};
  render() {
    const {
      title,
      LeftComponent,
      RightComponent,
      children,
      headerStyle,
      dispatch,
      onPress
    } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Header
          onLeftPress={() => {
            onPress() || dispatch(action.navigate.back());
          }}
          title={title}
          LeftComponent={LeftComponent}
          RightComponent={RightComponent}
          style={headerStyle}
        />
        <View style={{ flex: 1 }}>{children}</View>
      </View>
    );
  }
}
