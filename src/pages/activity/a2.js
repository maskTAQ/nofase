import React, { Component } from "react";
import { View, Image, TouchableWithoutFeedback } from "react-native";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import styles from "./a";
import { share } from "src/common";
import action from "src/action";
import { Button, Icon, Page, ShareBar } from "src/components";

@connect(state => {
  const { auth: { UserId } } = state;
  return { UserId };
})
export default class A2 extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    UserId: PropTypes.number
  };
  state = {
    isShareBarVisible: false
  };

  share(platform) {
    const { UserId } = this.props;
    share({
      title: "好友邀请你一起来深圳百余家共享运动场所！",
      content:
        "免办卡按小时计费 用零钱健身9.9/小时起，更有首免1小时打折优惠券等你探索。",
      url: `https://vmslq.cn/Share/Guide?UserId=${UserId}`,
      imgSrc: "http://vmslq.com/wxicon/2.jpg",
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
  }
  render() {
    const { isShareBarVisible } = this.state;
    return (
      <Page
        title="邀请好友"
        RightComponent={
          <Button
            onPress={() => {
              this.setState({
                isShareBarVisible: !this.state.isShareBarVisible
              });
            }}
          >
            <Icon size={20} source={require("./img/share.png")} />
          </Button>
        }
      >
        <TouchableWithoutFeedback
          onPress={() => {
            this.setState({
              isShareBarVisible: false
            });
          }}
        >
          <View style={styles.container}>
            <View style={styles.container}>
              <View style={styles.top}>
                <Image
                  style={styles.topImg}
                  resizeMode="stretch"
                  source={require("./img/t.png")}
                />
                <Image
                  style={styles.descTextImg}
                  resizeMode="stretch"
                  source={require("./img/没脸邀请共享健康.png")}
                />
                <Button
                  onPress={() => {
                    this.setState({
                      isShareBarVisible: !this.state.isShareBarVisible
                    });
                  }}
                  style={styles.button}
                  textStyle={styles.buttonText}
                >
                  立即邀请
                </Button>
              </View>
              <View style={styles.bottom}>
                <Image
                  resizeMode="stretch"
                  style={styles.text}
                  source={require("./img/组6.png")}
                />
              </View>
            </View>
            <ShareBar
              isVisible={isShareBarVisible}
              share={this.share}
              close={() => {
                this.setState({ isShareBarVisible: false });
              }}
            />
          </View>
        </TouchableWithoutFeedback>
      </Page>
    );
  }
}
