import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";

import styles from "../recharge/style";
import { Input, Icon, CheckBox } from "src/components";
export default class Recharge extends Component {
  static defaultProps = {
    balance: -45.5,
    payStatus: "not" //['not','success','error']
  };
  static propTypes = {
    balance: PropTypes.number,
    payStatus: PropTypes.string
  };
  state = {
    payWay: 0,
    recharge: ""
  };
  renderLabel(source, title, subtitle) {
    return (
      <View style={styles.itemLabelWraper}>
        <Icon size={30} source={source} style={styles.itemIcon} />
        <View style={styles.titleWrapper}>
          <Text style={styles.itemTitle}>{title}</Text>
          <Text style={styles.itemSubtitle}>{subtitle}</Text>
        </View>
      </View>
    );
  }
  renderBorder() {
    return <View style={styles.itemBorder} />;
  }
  renderNot() {
    const { payWay, recharge } = this.state;
    const { balance } = this.props;
    const payWayMap = [
      {
        label: this.renderLabel(
          require("./img/wechat.png"),
          "微信支付",
          "需要安装微信5.0以上版本"
        ),
        value: 0
      },
      {
        label: this.renderLabel(
          require("./img/zfb.png"),
          "支付宝支付",
          "笔笔抽奖，最高88元红包。"
        ),
        value: 1
      }
    ];
    return (
      <View style={styles.container}>
        <View style={styles.paddingContainer}>
          <Text style={styles.rechargeLabel}>充值金额：</Text>
          <View style={styles.inputContainer}>
            <Input
              style={styles.input}
              value={String(recharge)}
              onChangeText={v => this.setState({ recharge: v })}
            />
            <View style={styles.inputLabelWrapper}>
              <Text style={styles.inputLabel}>元</Text>
            </View>
          </View>
          <View style={styles.balanceWrapper}>
            <Text style={{ color: "#1e89e4" }}>当前余额：{balance}</Text>
          </View>
          <Text style={styles.checklabel}>选择支付方式：</Text>
        </View>
        <CheckBox
          data={payWayMap}
          selected={payWay}
          onChangeValue={v => this.setState({ payWay: v })}
          ItemSeparatorComponent={this.renderBorder()}
          style={styles.checkbox}
        />
      </View>
    );
  }
  renderSuccess() {
    return <Text>renderSuccess</Text>;
  }
  renderError() {
    return <Text>renderError</Text>;
  }
  render() {
    const { payStatus } = this.props;
    switch (payStatus) {
      case "not":
        return this.renderNot();
      case "success":
        return this.renderSuccess();
      case "error":
      default:
        return this.renderError();
    }
  }
}
