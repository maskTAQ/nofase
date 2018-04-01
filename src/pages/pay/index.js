import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import PropTypes from "prop-types";

import { Page, Button, Icon, StarScore } from "src/components";
import action from "src/action";
import { connect } from "react-redux";
import styles from "./style";

@connect()
export default class Pay extends Component {
  static defaultProps = {
    startTime: "08:27",
    endTime: "10:21",
    step: 0 //0 未开始 1开始 2结束
  };
  static propTypes = {
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    step: PropTypes.number,
    navigation: PropTypes.object
  };
  state = {
    currentScore: 1
  };
  renderHeader() {
    const { step, startTime, endTime } = this.props;
    const noTimeStr = "--/--";
    const data = [
      [noTimeStr, noTimeStr],
      [startTime, noTimeStr],
      [startTime, endTime]
    ];

    return (
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <View style={styles.headerItemWrapper}>
            <View style={styles.headerItem}>
              <Text style={styles.headerItemLabel}>开始时间</Text>
              <Text style={styles.headerItemValue}>{data[step][0]}</Text>
            </View>
          </View>
          <Icon size={30} source={require("./img/u17.png")} />
          <View style={styles.headerItemWrapper}>
            <View style={styles.headerItem}>
              <Text style={styles.headerItemLabel}>结束时间</Text>
              <Text style={styles.headerItemValue}>{data[step][0]}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.timeCount}>使用时长:01:51</Text>
        <View style={styles.itemBorder}>
          <Image
            source={require("./img/u14_line.png")}
            style={styles.itemBorderIcon}
          />
        </View>
      </View>
    );
  }
  renderCommon(data) {
    return (
      <View style={styles.tWrapper}>
        <View style={styles.t}>
          <View style={styles.tItem}>
            <Text style={styles.tItemLabel}>{data[0][0]}</Text>
            <View style={styles.tItemValueWrapper}>
              <Text style={styles.tItemValue}>{data[0][1]}</Text>
            </View>
          </View>
          <View style={[styles.tItem, { alignItems: "flex-end" }]}>
            <Text style={styles.tItemLabel}>{data[1][0]}</Text>
            <View style={styles.tItemValueWrapper}>
              <Text style={styles.tItemValue}>{data[1][1]}</Text>
            </View>
          </View>
        </View>
        <View style={styles.itemBorder}>
          <Image
            source={require("./img/u14_line.png")}
            style={styles.itemBorderIcon}
          />
        </View>
      </View>
    );
  }
  renderContent() {
    const { step } = this.props;
    const { currentScore } = this.state;
    switch (String(step)) {
      case "0":
        return (
          <View style={styles.content}>
            {this.renderHeader()}
            {this.renderCommon([
              ["Per hour", "每一小时"],
              ["Cost", "￥:10.00元"]
            ])}

            <View style={styles.QR}>
              <Icon
                source={{
                  uri: `http://qr.liantu.com/api.php?text=${JSON.stringify({
                    UserId: 1
                  })}`
                }}
                size={300}
              />
            </View>
          </View>
        );
      case "1":
        return (
          <View style={styles.content}>
            {this.renderHeader()}
            {this.renderCommon([
              ["Per hour", "每一小时"],
              ["Cost", "￥:10.00元"]
            ])}
            {this.renderCommon([
              ["Discount", "优惠选择"],
              ["Choice", "单次抵现1.2元"]
            ])}
            <View style={styles.QR}>
              <Image source={require("./img/u12.png")} style={styles.QRImg} />
            </View>
          </View>
        );
      default:
        return (
          <View style={styles.content}>
            {this.renderHeader()}
            {this.renderCommon([
              ["Per hour", "每一小时"],
              ["Cost", "￥:10.00元"]
            ])}
            {this.renderCommon([["Charge", "收费"], ["Price", "￥:20.00元"]])}
            {this.renderCommon([["Discount", "优惠"], ["Price", "￥:8.00元"]])}
            <View style={styles.starScore}>
              <Text style={styles.starScoreTitle}>Score 评分</Text>
              <View style={styles.starScoreBox}>
                <StarScore
                  currentScore={currentScore}
                  onChangeScore={currentScore => {
                    this.setState({ currentScore });
                  }}
                  iconSize={20}
                />
                <Button style={styles.submit} textStyle={styles.submitText}>
                  提交
                </Button>
              </View>
              <Text style={styles.starScoreEvaluate}>棒棒的</Text>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={styles.starScoreExpend}>支出:12.00元</Text>
              </View>
            </View>
          </View>
        );
    }
  }
  render() {
    return (
      <Page
        title="扫码计时"
        RightComponent={
          <Button
            onPress={() => {
              this.props.navigation.dispatch(
                action.navigate.go({ routeName: "Fitnessrecord" })
              );
            }}
            textStyle={{ color: "#fff", fontSize: 14, fontWeight: "bold" }}
          >
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
