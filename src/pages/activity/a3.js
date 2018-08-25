import React, { Component } from "react";
import { View, Image, TouchableWithoutFeedback } from "react-native";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import styles from "./a";
import { share } from "src/common";
import action from "src/action";
import { Button, Page, ShareBar } from "src/components";

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

  share = platform => {
    const { UserId } = this.props;
    share({
      title: "NoFace没脸运动 记录好身材！",
      content: "全城运动场所按时共享计费，不办卡最低4.9元/小时起参与。",
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
  };
  render() {
    const { isShareBarVisible } = this.state;
    return (
      <Page title="运动分享">
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
                  source={require("./img/a3.png")}
                />
                <Image
                  style={styles.descTextImg}
                  resizeMode="stretch"
                  source={require("./img/运动分享没脸长脸.png")}
                />
                <Button
                  onPress={() => {
                    this.setState({
                      isShareBarVisible: !this.state.isShareBarVisible
                    });
                  }}
                  disabled={true}
                  style={styles.button}
                  textStyle={styles.buttonText}
                >
                  每次运动后记得分享哦
                </Button>
              </View>
              <View style={styles.bottom}>
                <Image
                  resizeMode="stretch"
                  style={styles.text}
                  source={require("./img/fenxiang.png")}
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
