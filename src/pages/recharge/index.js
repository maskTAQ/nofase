import React, { Component } from "react";
import { View, Text, RefreshControl, ScrollView, Alert } from "react-native";
import PropTypes from "prop-types";

import styles from "./style";
import { Tip, Wxpay } from "src/common";
import { Input, Icon, CheckBox, Page, Button } from "src/components";
import { Alipay } from "src/common/pay";
import { connect } from "react-redux";
import api from "src/api";
@connect(state => {
  const { userInfo, auth: { UserId } } = state;
  return { userInfo, UserId };
})
export default class Recharge extends Component {
  static defaultProps = {
    balance: -45.5,
    payStatus: "not" //['not','success','error']
  };
  static propTypes = {
    balance: PropTypes.number,
    payStatus: PropTypes.string,
    userInfo: PropTypes.object,
    UserId: PropTypes.number,
    dispatch: PropTypes.func
  };
  state = {
    payWay: 0,
    recharge: 0,
    isRefreshing: false
  };
  recharge = () => {
    const { payWay, recharge } = this.state;
    const { UserId } = this.props;
    if (payWay === 0) {
      this.Wxpay();
    } else {
      api.pay(recharge, UserId).then(res => {
        Alipay(res.signValue);
      });
    }
  };
  Wxpay = async () => {
    const { recharge } = this.state;
    const { UserId } = this.props;
    const isSupported = await Wxpay.isSupported();
    if (!isSupported) {
      // 判断是否支持微信支付
      Alert.alert("提示", "旧手机验证成功，请输入新手机号", [
        { text: "确定", onPress: () => {} }
      ]);
      return;
    }
    api.wxPay(recharge, UserId).then(res => {
      const {
        appid,
        mch_id: partnerid,
        prepay_id: prepayid,
        nonce_str: noncestr,
        sign
      } = res.result.m_values;
      Wxpay.pay({
        appid,
        partnerid,
        prepayid,
        package: "Sign=WXPay",
        noncestr,
        sign,
        timestamp: +(Date.now() / 1000).toFixed(0)
      });
    });
  };
  _onRefresh = () => {
    this.setState({
      isRefreshing: true
    });
    this.props
      .dispatch({
        type: "userInfo",
        api: () => {
          return api.getUserInfo(false);
        },
        promise: true
      })
      .then(res => {
        this.setState({
          isRefreshing: false
        });
      })
      .catch(e => {
        this.setState({
          isRefreshing: false
        });
        Tip.loading("刷新失败失败");
      });
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
    const { isRefreshing } = this.state;
    return (
      <Page title="充值">
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={this._onRefresh}
              tintColor="#bbb"
              colors={["#ddd", "#0398ff"]}
              progressBackgroundColor="#fff"
            />
          }
        >
          {this.renderConent()}
        </ScrollView>
      </Page>
    );
  }
}
