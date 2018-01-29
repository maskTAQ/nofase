import React, { Component } from "react";
import { View, Text, FlatList, Image } from "react-native";
import PropTypes from "prop-types";
import { Page, Button } from "src/components";
import styles from "./style";
import action from "src/action";

export default class Transacion extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };
  state = {};

  changeSrc(src) {
    this.props.navigation.dispatch(action.go(src));
  }
  renderItem(row) {
    const { type, src } = row;
    return (
      <Button onPress={() => this.changeSrc(src)}>
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
        src: "Recharge"
      },
      {
        type: "退押金/提现 (秒到)",
        src: ""
      },
      {
        type: " 钱包明细",
        src: "Wallet"
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
      <View style={{ backgroundColor: "#0399e7" }}>
        <Image source={require("./img/u3.png")} style={styles.bjImg} />
        <Page title="交易管理">
          <Text style={styles.Balance}>123</Text>
          <Text style={styles.titBalance}>当前余额</Text>
          <View style={styles.container}>
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
