import React, { Component } from "react";
import { View, Clipboard, Image } from "react-native";

import styles from "./style";
import { Tip } from "src/common";
import { Page, Button } from "src/components";
export default class Activity extends Component {
  state = {};
  list = [
    {
      bg: require("./img/u8.png"),
      onPress: () => {
        Clipboard.setString("https://www.baidu.com");
        Tip.success("已复制到剪切板去分享吧");
      }
    },
    {
      bg: require("./img/u10.png"),
      onPress: () => {
        Clipboard.setString("https://www.baidu.com");
        Tip.success("已复制到剪切板去分享吧");
      }
    },
    {
      bg: require("./img/u12.png"),
      onPress: () => {
        Clipboard.setString("https://www.baidu.com");
        Tip.success("已复制到剪切板去分享吧");
      }
    }
  ];
  render() {
    const { list } = this;
    return (
      <Page title="活动中心">
        <View style={styles.container}>
          <View style={styles.bg}>
            <View style={styles.bgTop} />
            <View style={styles.bgBottom} />
          </View>
          <View style={styles.content}>
            {list.map(({ bg, onPress }) => {
              return (
                <Button onPress={onPress} style={styles.item} key={bg}>
                  <Image
                    source={bg}
                    style={styles.itemBg}
                    resizeMode="contain"
                  />
                </Button>
              );
            })}
          </View>
        </View>
      </Page>
    );
  }
}
