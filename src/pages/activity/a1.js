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
export default class A1 extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    UserId: PropTypes.number
  };
  state = {
    isShareBarVisible: false
  };

  share = platform => {
    const { UserId } = this.props;
    share({
      title: "没脸拼团运动—没脸在一起 拼团好身材",
      content: "好友发起拼团运动，2人以上当日参与运动随机赠送6-9折卡",
      url: `https://vmslq.cn/Share/Spell?UserId=${UserId}`,
      imgSrc: "http://vmslq.com/wxicon/1.jpg",
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
  };
  render() {
    const { isShareBarVisible } = this.state;
    return (
      <Page
        title="拼团运动"
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
                  source={require("./img/a1.png")}
                />
                <Image
                  style={styles.descTextImg}
                  resizeMode="stretch"
                  source={require("./img/没脸在一起火拼好身材.png")}
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
                  source={require("./img/组7.png")}
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
