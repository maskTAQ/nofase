import React, { Component } from "react";
import { View, Image, Text } from "react-native";
import PropTypes from "prop-types";

import styles from "./style";
import { share } from "src/common";
import action from "src/action";
import { Button, Icon, Page } from "src/components";

import A1 from "./a1.js";
import A2 from "./a2.js";
import A3 from "./a3.js";
export default class Activity extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };
  state = {
    isShareBarVisible: false
  };
  list = [
    {
      bg: require("./img/a1.png"),
      routeName: "A1"
    },
    {
      bg: require("./img/a2.png"),
      routeName: "A2"
    },
    {
      bg: require("./img/a3.png"),
      routeName: "A3"
    },
    {
      bg: require("./img/a4.png"),
      routeName: "Web",
      web: {
        AdvUrl: "http://vmslq.com/499gmy/",
        AdvStoreName: "1对1线上vip私教"
      }
    }
  ];
  renderShareBar() {
    const { isShareBarVisible } = this.state;
    const data = [
      {
        icon: require("./img/u227.png"),
        label: "微信",
        platform: "WECHAT",
        onPress: () => {}
      },
      {
        icon: require("./img/u231.png"),
        label: "朋友圈",
        platform: "WECHATMOMENT",
        onPress: () => {}
      },
      {
        icon: require("./img/u229.png"),
        label: "QQ",
        platform: "QQ",
        onPress: () => {}
      },
      {
        icon: require("./img/u233.png"),
        label: "QQ空间",
        platform: "QQZONE",
        onPress: () => {}
      },
      {
        icon: require("./img/u235.png"),
        label: "新浪微博",
        platform: "SINA",
        onPress: () => {}
      }
    ];
    if (!isShareBarVisible) {
      return null;
    }
    return (
      <View style={styles.shareBar}>
        {data.map(({ icon, label, platform }) => {
          return (
            <Button
              onPress={() => {
                share({
                  title: "title",
                  content: "xx",
                  url: "https://www.baidu.com/img/bd_logo1.png",
                  imgSrc: "https://www.baidu.com/img/bd_logo1.png",
                  platform
                })
                  .then(res => {
                    this.setState({ isShareBarVisible: false });
                  })
                  .catch(e => {
                    this.setState({ isShareBarVisible: false }, () => {
                      this.props.navigation.dispatch(action.navigate.back());
                    });
                  });
              }}
              style={styles.shareBarItem}
              key={label}
            >
              <Icon size={40} source={icon} />
              <Text style={styles.shareBarItemLabel}>{label}</Text>
            </Button>
          );
        })}
      </View>
    );
  }
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
            {list.map(({ bg, routeName, web }) => {
              return (
                <Button
                  onPress={() => {
                    if (web) {
                      this.props.navigation.dispatch(
                        action.navigate.go({ routeName: "Web", params: web })
                      );
                    } else {
                      this.props.navigation.dispatch(
                        action.navigate.go({ routeName })
                      );
                    }
                  }}
                  style={styles.item}
                  key={bg}
                >
                  <Image
                    source={bg}
                    style={styles.itemBg}
                    resizeMode="stretch"
                  />
                </Button>
              );
            })}
          </View>
          {this.renderShareBar()}
        </View>
      </Page>
    );
  }
}

export { A1, A2, A3 };
