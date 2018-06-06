import React, { Component } from "react";
import { View, Text } from "react-native";
import moment from "moment";

import { computeSize } from "src/common";
import api from "src/api";
import { Page, Icon, Button, DataView } from "src/components";
import styles from "./style";
export default class Wallet extends Component {
  state = {
    activeIndex: 0
  };
  getUserOrderList(PageIndex) {
    return api.getUserOrderList({ PageIndex, PageNum: 20 });
  }
  getRechargeList(PageIndex) {
    return api.getGetRechargeList({ PageIndex, PageNum: 20 });
  }
  changeTab(i) {
    const { activeIndex } = this.state;
    if (activeIndex !== i) {
      this.setState(
        {
          activeIndex: i
        },
        () => {
          //更改tab重新渲染数据 否则显示的是另一个tab的数据
          if (i === 0) {
            this.userOrderList && this.userOrderList.triggerRefresh();
          } else {
            this.rechargeList && this.rechargeList.triggerRefresh();
          }
        }
      );
    }
  }
  renderItem(row) {
    const { activeIndex } = this.state;
    const { SaleAmont, RechargeValue, ApplyDate, SDate } = row;
    const getTimestamp = s => {
      if (s) {
        return +/\/Date\(([0-9]+)\)/.exec(s)[1];
      } else {
        return 0;
      }
    };
    const time = moment(
      getTimestamp(activeIndex === 0 ? SDate : ApplyDate)
    ).format("YYYY/MM/DD HH:mm");
    return (
      <View style={styles.item}>
        <Text
          style={{ height: "50%", justifyContent: "center", color: "#333" }}
        >
          {activeIndex === 0 ? "消费" : "充值"}
        </Text>
        <View
          style={[styles.itemBottom, { height: "50%", alignItems: "center" }]}
        >
          <Text style={{ color: "#333" }}>{time}</Text>
          <Text style={styles.itemSum}>
            {activeIndex === 0 ? SaleAmont : RechargeValue}元
          </Text>
        </View>
      </View>
    );
  }
  renderList() {
    const { activeIndex } = this.state;
    if (activeIndex === 0) {
      return (
        <View style={styles.listContainer}>
          <DataView
            ref={e => (this.userOrderList = e)}
            style={styles.list}
            getData={this.getUserOrderList}
            ListEmptyComponent={<Text>暂时没有数据哦</Text>}
            ItemSeparatorComponent={() => (
              <View style={{ height: computeSize(10) }} />
            )}
            renderItem={({ item }) => this.renderItem(item)}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.listContainer}>
          <DataView
            ref={e => (this.rechargeList = e)}
            style={styles.list}
            getData={this.getRechargeList}
            ListEmptyComponent={<Text>暂时没有数据哦</Text>}
            ItemSeparatorComponent={() => (
              <View style={{ height: computeSize(10) }} />
            )}
            renderItem={({ item }) => this.renderItem(item)}
          />
        </View>
      );
    }
  }
  render() {
    const { activeIndex } = this.state;
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
              const isActive = activeIndex === i;
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
