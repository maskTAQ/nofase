import React, { Component } from "react";
import { View, Image } from "react-native";

import styles from "./style";
import { Tip } from "src/common";
import { share } from "src/common/share";
import { Page, Button } from "src/components";
export default class Activity extends Component {
  state = {};
  list = [
    {
      bg: require("./img/u8.png"),
      onPress: () => {
        share({
          title: "激情马拉松",
          content: "分享内容",
          url: "http://baidu.com",
          imgSrc: "http://dev.umeng.com/images/tab2_1.png",
          platform: "QQ"
        })
          .then(res => {
            Tip.success(res);
          })
          .catch(e => {
            Tip.fail(e);
          });
      }
    },
    {
      bg: require("./img/u10.png"),
      onPress: () => {
        share({
          title: "揭健身低价",
          content: "分享内容",
          url: "http://baidu.com",
          imgSrc: "http://dev.umeng.com/images/tab2_1.png",
          platform: "QQ"
        })
          .then(res => {
            Tip.success(res);
          })
          .catch(e => {
            Tip.fail(e);
          });
      }
    },
    {
      bg: require("./img/u12.png"),
      onPress: () => {
        share({
          title: "全民健身",
          content: "分享内容",
          url: "http://baidu.com",
          imgSrc: "http://dev.umeng.com/images/tab2_1.png",
          platform: "QQ"
        })
          .then(res => {
            Tip.success(res);
          })
          .catch(e => {
            Tip.fail(e);
          });
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
