import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";

import { Page, Button } from "src/components";
import styles from "./style";
export default class Pay extends Component {
  static defaultProps = {
    startTime: "08:27",
    endTime: "10:21",
    step: 0 //0 未开始 1开始 2结束
  };
  static propTypes = {
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    step: PropTypes.number
  };
  state = {};
  renderHeader() {
    const { step, startTime, endTime } = this.props;
    const noTimeStr = "--/--";
    const data = [
      [noTimeStr, noTimeStr],
      [startTime, noTimeStr],
      [startTime, endTime]
    ];

    return (
      <View style={styles.header}>
        <View style={styles.headerItem}>
          <Text style={styles.headerItemLabel}>开始时间</Text>
          <Text style={styles.headerItemValue}>{data[step][0]}</Text>
        </View>

        <View style={styles.headerItem}>
          <Text style={styles.headerItemLabel}>开始时间</Text>
          <Text style={styles.headerItemValue}>{data[step][0]}</Text>
        </View>
      </View>
    );
  }
  renderContent() {
    // const { step, startTime, endTime } = this.props;
    return <View style={styles.content}>{this.renderHeader()}</View>;
  }
  render() {
    return (
      <Page
        title="扫码计时"
        RightComponent={
          <Button textStyle={{ color: "#fff", fontWeight: "bold" }}>
            记录
          </Button>
        }
      >
        <View style={styles.container}>
          {this.renderContent()}
          <View style={styles.chunk} />
        </View>
      </Page>
    );
  }
}
