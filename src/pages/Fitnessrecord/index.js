import React, { Component } from "react";
import { View, Text, Image, FlatList } from "react-native";
import PropTypes from "prop-types";

import { Button, Icon } from "src/components";
import styles from "./style";
export default class Fitnessrecord extends Component {
  static propTypes = {
    demo: PropTypes.any
  };
  state = {};
  renderItem(row) {
    const { type, price, time } = row;
    return (
      <Button onPress={() => this.changeSrc()} style={styles.container}>
        <View style={styles.item}>
          <Text style={{ color: "#666666", fontSize: 12, lineHeight: 30 }}>
            {time}
          </Text>
          <Text style={{ color: "#666666", fontSize: 12, lineHeight: 30 }}>
            {type}|{price}
          </Text>
        </View>
        <Icon
          size={20}
          source={require("./img/jiantou.png")}
          style={styles.rightimg}
        />
      </Button>
    );
  }
  renderList() {
    const data = [
      {
        type: "1江南健身房（车公庙店）",
        time: "2017-9-10 23:25",
        price: "12.00元"
      },
      {
        type: "2江南健身房（车公庙店）",
        time: "2017-9-10 23:25",
        price: "12.00元"
      },
      {
        type: "3江南健身房（车公庙店）",
        time: "2017-9-10 23:25",
        price: "12.00元"
      },
      {
        type: "4江南健身房（车公庙店）",
        time: "2017-9-10 23:25",
        price: "12.00元"
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
    return (
      <View style={styles.contianer}>
        <View>
          <Image
            source={require("./img/banner.png")}
            style={styles.banner}
            resizeMode="stretch"
          />
        </View>
        {this.renderList()}
        <View />
      </View>
    );
  }
}
