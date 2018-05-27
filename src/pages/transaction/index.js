import React, { Component } from "react";
import { View, Text, FlatList, Image, Platform } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import JPushModule from "jpush-react-native";

import { Page, Button, Icon } from "src/components";
import styles from "./style";
import api from "src/api";
import action from "src/action";

@connect(state => {
  console.log(state);
  const { userInfo: { Money, PayMoney }, auth: { UserId } } = state;
  return { Money, PayMoney, UserId };
})
export default class Transacion extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    Money: PropTypes.number,
    PayMoney: PropTypes.number,
    UserId: PropTypes.number
  };
  state = {
    PaysMoney: 0
  };
  componentWillMount() {
    if (Platform.OS === "ios") {
      JPushModule.setBadge(0, success => {});
    }

    this.getUserPaysToday();
    this.props.navigation.dispatch({
      type: "userInfo",
      api: () => {
        return api.getUserInfo();
      },
      promise: true
    });
  }
  back = () => {
    this.props.navigation.dispatch(action.navigate.back());
  };
  getUserPaysToday() {
    const { UserId } = this.props;
    api.getUserPaysToday(UserId).then(res => {
      this.setState({ ...res });
    });
  }
  renderItem(row) {
    const { type, onPress } = row;
    return (
      <Button onPress={onPress}>
        <View style={styles.item}>
          <Text style={{ color: "#0399e7", fontSize: 15 }}>{type}</Text>
        </View>
      </Button>
    );
  }
  renderList() {
    const data = [
      {
        type: "充值",
        onPress: () => {
          this.props.navigation.dispatch(
            action.navigate.go({ routeName: "Recharge" })
          );
        }
      },
      // {
      //   type: "退押金/提现 (秒到)",
      //   onPress: () => {
      //     //this.props.navigation.dispatch(action.go('Recharge'));
      //   }
      // },
      {
        type: " 钱包明细",
        onPress: () => {
          this.props.navigation.dispatch(
            action.navigate.go({ routeName: "Wallet" })
          );
        }
      }
    ];
    return (
      <FlatList
        style={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        keyExtractor={(item, index) => index}
        data={data}
        renderItem={({ item }) => this.renderItem(item)}
      />
    );
  }
  render() {
    const { Money = "-" } = this.props;
    const { PaysMoney } = this.state;

    return (
      <Page
        title="交易管理"
        LeftComponent={
          <Button onPress={this.back}>
            <Icon size={20} source={require("./img/u326.png")} />
          </Button>
        }
        headerStyle={{ backgroundColor: "#fff" }}
        titleStyle={{ color: "#1ba0ea" }}
      >
        <View style={styles.container}>
          <View style={styles.bgContainer}>
            <Image
              source={require("./img/u3.png")}
              style={styles.bgImg}
              resizeMode="stretch"
            />
          </View>

          <View style={styles.content}>
            <View style={styles.BalanceWrapper}>
              <Text style={styles.balanceLabel}>
                {Number(Money).toFixed(2)}
              </Text>
              <Text style={styles.balanceValue}>(余额)</Text>
            </View>
            <View style={styles.list}>
              <View style={styles.consume}>
                <Text style={styles.consumeLabel}>今日消费</Text>
                <Text style={styles.consumeValue}>{PaysMoney}元</Text>
              </View>
              {this.renderList()}
            </View>
          </View>
        </View>
      </Page>
    );
  }
}
