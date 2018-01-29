import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

import { Button, Icon } from "src/components";

import styles from "./style";

export default class StarScore extends Component {
  static defaultProps = {
    totalScore: 5,
    currentScore: 2.3,
    operable: true,
    iconSize: 14,
    onChangeScore() {}
  };
  static propTypes = {
    totalScore: PropTypes.number,
    currentScore: PropTypes.number,
    iconSize: PropTypes.number,
    operable: PropTypes.bool,
    onChangeScore: PropTypes.func,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
  };
  state = {};
  renderChildren(i) {
    const { currentScore, iconSize } = this.props;
    if (i <= currentScore) {
      return <Icon size={iconSize} source={require("./img/full.png")} />;
    }
    if (
      i === Math.floor(currentScore) + 1 &&
      currentScore.toString().indexOf(".") > -1
    ) {
      return <Icon size={iconSize} source={require("./img/half.png")} />;
    }

    return <Icon size={iconSize} source={require("./img/empty.png")} />;
  }
  renderBody() {
    const { totalScore, operable, onChangeScore } = this.props;
    const images = [];
    for (let i = 1; i <= totalScore; i++) {
      const commonProps = {
        key: i,
        children: this.renderChildren(i),
        style: styles.item
      };
      images.push(
        operable ? (
          <Button
            onPress={() => {
              onChangeScore(i);
            }}
            {...commonProps}
          />
        ) : (
          <View {...commonProps} />
        )
      );
    }
    return images;
  }
  render() {
    const { style } = this.props;
    return <View style={[styles.container, style]}>{this.renderBody()}</View>;
  }
}
