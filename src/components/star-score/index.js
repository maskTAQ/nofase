import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

import { Button, Icon } from "src/components";

import styles from "./style";

export default class StarScore extends Component {
  static defaultProps = {
    totalScore: 5,
    operable: true
  };
  static propTypes = {
    totalScore: PropTypes.number,
    currentScore: PropTypes.number,
    operable: PropTypes.bool
  };
  state = {
    totalScore: 5, // 总分值
    currentScore: 3 // 分值
  };
  renderChildren(i) {
    const { currentScore } = this.props;
    if (i < currentScore) {
      return <Icon size={14} source={require("./img/full.png")} />;
    }
    if (Math.ceil(i) === Math.floor(currentScore) + 1 && !/^-?\d+$/.test(i)) {
      return <Icon size={14} source={require("./img/full.png")} />;
    }

    return <Icon size={14} source={require("./img/empty.png")} />;
  }
  renderBody() {
    const { totalScore, operable } = this.props;
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
              this.onChangeScore(i);
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
    return <View style={styles.container}>{this.renderBody()}</View>;
  }
}
