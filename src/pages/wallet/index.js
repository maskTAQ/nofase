import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";

import api from "src/api";
import { Page, Icon, Button } from "src/components";
import styles from "./style";
export default class Transacion extends Component {
  state = {
    tabActiveIndex: 0,

    data: {
      consume: {
        status: "init",
        data: []
      },
      recharge: {
        status: "init",
        data: []
      }
    }
  };
  componentWillMount() {
    const { tabActiveIndex } = this.state;
    this.changeTab(tabActiveIndex);
  }
  changeTab(tabActiveIndex) {
    this.setState({ tabActiveIndex });
    this.getData(tabActiveIndex);
    //getUserOrderList
  }
  getData(tabActiveIndex) {
    const { consume, recharge } = this.state.data;
    if (tabActiveIndex === 0 && ["init", "error"].includes(consume.status)) {
      api
        .getUserOrderList({
          PageIndex: 1,
          PageNum: 20
        })
        .then(res => {
          console.log(res);
        });
    }
    if (tabActiveIndex === 1 && ["init", "error"].includes(recharge.status)) {
      // api.getUserOrderList({
      //   PageIndex:1,
      //   PageNum:20
      // })
      // .then(res=>{
      //   console.log(res)
      // })
      console.log("获取充值记录");
    }
  }
  renderItem(row) {
    const { type, time, sum } = row;
    return (
      <View style={styles.item}>
        <Text
          style={{ height: "50%", justifyContent: "center", color: "#333" }}
        >
          {type}
        </Text>
        <View
          style={[styles.itemBottom, { height: "50%", alignItems: "center" }]}
        >
          <Text style={{ color: "#333" }}>{time}</Text>
          <Text style={styles.itemSum}>{sum}元</Text>
        </View>
      </View>
    );
  }
  renderList() {
    const { tabActiveIndex } = this.state;
    const data = [
      [
        {
          type: "消费",
          time: "2018-1-28",
          sum: -2000
        },
        {
          type: "消费",
          time: "2018-1-28",
          sum: -2000
        }
      ],
      [
        {
          type: "充值",
          time: "2018-1-28",
          sum: 2000
        },
        {
          type: "充值",
          time: "2018-1-28",
          sum: 3000
        }
      ]
    ];
    return (
      <FlatList
        style={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        keyExtractor={(item, index) => index}
        data={data[tabActiveIndex]}
        renderItem={({ item }) => this.renderItem(item)}
      />
    );
  }
  render() {
    const { tabActiveIndex } = this.state;
    const tabMap = [
      ["消费明细", require("./img/u20.png"), 0],
      "border",
      ["充值明细", require("./img/u14.png"), 1]
    ];
    return (
      <Page title="交易明细">
        <View style={styles.container}>
          <View style={styles.tabContainer}>
            {tabMap.map(tab => {
              if (tab === "border") {
                return <View style={styles.tabItemBorder} key="border" />;
              }
              const [label, iconSource, i] = tab;
              const isActive = tabActiveIndex === i;
              return (
                <Button
                  onPress={() => this.changeTab(i)}
                  style={styles.tabItem}
                  key={label}
                >
                  <Icon
                    size={25}
                    source={iconSource}
                    style={styles.tabItemICon}
                  />
                  <Text>{label}</Text>
                  {isActive ? (
                    <View style={styles.tabItemActiveBorder} />
                  ) : null}
                </Button>
              );
            })}
          </View>
          {this.renderList()}
        </View>
      </Page>
    );
  }
}
