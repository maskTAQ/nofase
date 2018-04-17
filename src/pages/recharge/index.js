import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";

import styles from "./style";
import { Tip } from "src/common";
import { Input, Icon, CheckBox, Page, Button } from "src/components";
import { Alipay } from "src/common/pay";
import { connect } from "react-redux";

@connect(state => {
  const { userInfo } = state;
  return { userInfo };
})
export default class Recharge extends Component {
  static defaultProps = {
    balance: -45.5,
    payStatus: "not" //['not','success','error']
  };
  static propTypes = {
    balance: PropTypes.number,
    payStatus: PropTypes.string,
    userInfo: PropTypes.object
  };
  state = {
    payWay: 0,
    recharge: ""
  };
  recharge = () => {
    const { payWay } = this.state;
    if (payWay === 0) {
      Tip.fail("暂不支持微信充值");
    } else {
      Alipay();
    }
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
    const { Money } = this.props.userInfo;
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
              onChangeText={v => {
                this.setState({ recharge: v });
                if (v === 1) {
                  Alipay();
                }
              }}
            />
            <View style={styles.inputLabelWrapper}>
              <Text style={styles.inputLabel}>元</Text>
            </View>
          </View>
          <View style={styles.balanceWrapper}>
            <Text style={{ color: "#1e89e4" }}>当前余额：{Money}</Text>
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
        <Button onPress={this.recharge} style={styles.rechargeButton}>
          充值
        </Button>
      </View>
    );
  }

  renderCommon(source, title) {
    const data = [
      {
        label: "订单号：",
        value: "123456"
      },
      {
        label: "订单金额：",
        value: "1234"
      }
    ];
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Icon size={50} source={source} />
          <View style={styles.notTitlewrapper}>
            <Text style={styles.checklabel}>{title}</Text>
          </View>
          {data.map(item => {
            const { label, value } = item;
            return (
              <View style={styles.itemWrapper} key={value}>
                <Text style={styles.itemLabel}>{label}</Text>
                <Text style={styles.itemValue}>{value}</Text>
              </View>
            );
          })}
        </View>
        <View />
        <View />
      </View>
    );
  }
  renderConent() {
    const { payStatus } = this.props;
    switch (payStatus) {
      case "not":
        return this.renderNot();
      case "success":
        return this.renderCommon(require("./img/success.png"), "支付成功");
      case "error":
      default:
        return this.renderCommon(require("./img/error.png"), "支付失败");
    }
  }
  render() {
    console.log(this.props);
    return <Page title="充值">{this.renderConent()}</Page>;
  }
}
