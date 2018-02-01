import React, { Component } from "react";
import { View, Text, FlatList, Image } from "react-native";
import PropTypes from "prop-types";

import { Page, Button, Icon } from "src/components";
import styles from "./style";
import action from "src/action";

export default class Transacion extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };
  state = {};
  back = () => {
    this.props.navigation.dispatch(action.navigate.back());
  };
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
      {
        type: "退押金/提现 (秒到)",
        onPress: () => {
          //this.props.navigation.dispatch(action.go('Recharge'));
        }
      },
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
    const tabMap = [
      ["今日消费", "25.5", 0],
      "border",
      ["当前押金", "60.00", 1]
    ];
    return (
      <View style={styles.container}>
        <View style={styles.bgContainer}>
          <Image source={require("./img/u3.png")} style={styles.bjimgs} />
        </View>
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
          <Text style={styles.Balance}>123</Text>
          <Text style={styles.titBalance}>(余额)</Text>
          <View style={styles.containers}>
            <View style={styles.tabContainer}>
              {tabMap.map(tab => {
                if (tab === "border") {
                  return <View style={styles.tabItemBorder} key="border" />;
                }
                const [label, money] = tab;
                return (
                  <View style={styles.tabItem} key={label}>
                    <Text style={styles.Itemmoney}>{money}</Text>

                    <Text style={{ color: "#0399e7" }}>{label}</Text>
                  </View>
                );
              })}
            </View>
            {this.renderList()}
          </View>
        </Page>
      </View>
    );
  }
}
