import React, { Component } from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import PropTypes from "prop-types";

import styles from "./style";
import api from "src/api";
import { Tip } from "src/common";
import { Page, Icon } from "src/components";

export default class PayResult extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    UserId: PropTypes.number
  };
  state = {
    isRefreshing: false
  };
  componentWillMount() {
    this.getData();
  }
  getData = () => {
    const { OrderNo } = this.props.navigation.state.params;
    this.setState({
      isRefreshing: true
    });
    api
      .getRecInfo(OrderNo)
      .then(res => {
        this.setState({ ...res, isRefreshing: false });
      })
      .catch(e => {
        this.setState({ isRefreshing: false });
        Tip.fail(e);
      });
  };
  render() {
    const { OrderNo, Flag, Amont, isRefreshing } = this.state;
    const flagMap = [
      "无效订单",
      "支付中",
      "支付完成",
      "支付失败",
      "支付完成但与订单信息不符合"
    ]; //0：无效订单，1：支付中，2：支付完成，3，支付失败，4：支付完成但与订单信息不符合）
    return (
      <Page title="充值">
        <ScrollView
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={this.getData}
              tintColor="#bbb"
              colors={["#ddd", "#0398ff"]}
              progressBackgroundColor="#fff"
            />
          }
        >
          <View style={styles.container}>
            <View style={styles.wrapper}>
              {Flag === 2 ? (
                <Icon size={60} source={require("./img/success.png")} />
              ) : (
                <Icon size={60} source={require("./img/error.png")} />
              )}
              <View style={styles.notTitlewrapper}>
                <Text style={styles.checklabel}>{flagMap[Flag]}</Text>
              </View>
              <View style={styles.itemWrapper}>
                <Text style={styles.itemLabel}>订单号:{OrderNo}</Text>
                <Text style={styles.itemValue}>{Amont}元</Text>
              </View>
            </View>
            <View />
            <View />
          </View>
        </ScrollView>
      </Page>
    );
  }
}
