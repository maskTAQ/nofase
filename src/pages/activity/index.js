import React, { Component } from "react";
import { View, Image, Text } from "react-native";
import PropTypes from "prop-types";

import styles from "./style";
import { Tip, share } from "src/common";
import action from "src/action";
import { Button, Icon, Page } from "src/components";
export default class Activity extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };
  state = {
    isShareBarVisible: false
  };
  list = [
    {
      bg: require("./img/u8.png")
    },
    {
      bg: require("./img/u10.png")
    },
    {
      bg: require("./img/u12.png")
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
                    Tip.fail(e);
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
            {list.map(({ bg }) => {
              return (
                <Button
                  onPress={() => {
                    this.setState({
                      isShareBarVisible: !this.state.isShareBarVisible
                    });
                  }}
                  style={styles.item}
                  key={bg}
                >
                  <Image
                    source={bg}
                    style={styles.itemBg}
                    resizeMode="contain"
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
