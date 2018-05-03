import React, { Component } from "react";
import {
  View,
  Text,
  RefreshControl,
  ScrollView,
  AppState,
  Alert
} from "react-native";
import PropTypes from "prop-types";

import styles from "./style";
import { Tip, Wxpay, Alipay } from "src/common";
import { Input, Icon, CheckBox, Page, Button } from "src/components";
import { connect } from "react-redux";
import action from "src/action";

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
    dispatch: PropTypes.func,
    navigation: PropTypes.object
  };
  state = {
    payWay: 0,
    recharge: 0,
    isRefreshing: false
  };

  componentWillMount() {
    AppState.addEventListener("change", this._handleAppStateChange);
  }
  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
  }
  _handleAppStateChange = state => {
    this.appStatusQueue.push(state);
    const currentStatus = this.appStatusQueue[this.appStatusQueue.length - 1];
    const prevStatus = this.appStatusQueue[this.appStatusQueue.length - 2];
    if (prevStatus === "background" && currentStatus === "active") {
      this.props.navigation.dispatch(
        action.navigate.go({
          routeName: "PayResult",
          params: {
            type: this.state.payWay ? "Alipay" : "Wxpay",
            OrderNo: this.OrderNo
          }
        })
      );
    }
  };
  appStatusQueue = [];
  recharge = () => {
    const { payWay } = this.state;
    if (payWay === 0) {
      this.Wxpay();
    } else {
      this.Alipay();
    }
  };
  Alipay = () => {
    const { recharge } = this.state;
    const { UserId } = this.props;
    api
      .pay(recharge, UserId)
      .then(async res => {
        this.OrderNo = res.OrderNo;
        Alipay.pay(res.signValue);
      })
      .catch(e => {
        Tip.fail(e);
      });
  };
  Wxpay = async () => {
    const { recharge } = this.state;
    const { UserId } = this.props;
    const isSupported = await Wxpay.isSupported();
    if (!isSupported) {
      // 判断是否支持微信支付
      Alert.alert("你的手机不支持微信充值哦");
      return;
    }
    api
      .wxPay(recharge, UserId)
      .then(async res => {
        const {
          appid,
          partnerid,
          prepayid,
          noncestr,
          sign,
          timestamp,
          OrderNo
        } = res;
        this.OrderNo = OrderNo;
        Wxpay.pay({
          appid,
          partnerid,
          prepayid,
          package: "Sign=WXPay",
          noncestr,
          sign,
          timestamp
        });
      })
      .catch(res => {
        Tip.fail(res);
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
  renderConent() {
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
              keyboardType="numeric"
              onChangeText={v => {
                this.setState({ recharge: v });
              }}
            />
            <View style={styles.inputLabelWrapper}>
              <Text style={styles.inputLabel}>元</Text>
            </View>
          </View>
          <View style={styles.balanceWrapper}>
            <Text style={{ color: "#1e89e4" }}>
              当前余额：{Number(Money).toFixed(2)}
            </Text>
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
