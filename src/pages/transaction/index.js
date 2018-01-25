import React, { Component } from "react";
import { View, Text } from "react-native";
import { Page, Icon } from "src/components";
import styles from "./style";
export default class Transacion extends Component {
  state = {};
  render() {
    return (
      <Page title="交易明细">
        <View style={styles.container}>
          <View style={styles.detailwrapper}>
            <View style={styles.consumptiondetail}>
              <View style={styles.detailBottom}>
                <Icon
                  size={25}
                  source={require("./img/u14.png")}
                  style={styles.logoImg}
                />
                <Text>消费明细</Text>
              </View>
            </View>
            <View style={styles.xian} />
            <View style={styles.rechargedetail}>
              <Icon
                size={25}
                source={require("./img/u20.png")}
                style={styles.logoImg}
              />
              <Text>充值明细</Text>
            </View>
          </View>
        </View>
      </Page>
    );
  }
}
