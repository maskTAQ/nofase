import React, { Component } from "react";
import { View, Text } from "react-native";

import styles from "./style";
import { Page, Icon } from "src/components";

export default class PayResult extends Component {
  state = {};
  render() {
    return (
      <Page title="充值">
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <Icon size={60} source={require("./img/success.png")} />
            <View style={styles.notTitlewrapper}>
              <Text style={styles.checklabel}>11</Text>
            </View>
            <View style={styles.itemWrapper}>
              <Text style={styles.itemLabel}>11</Text>
              <Text style={styles.itemValue}>11adad</Text>
            </View>
          </View>
          <View />
          <View />
        </View>
      </Page>
    );
  }
}
