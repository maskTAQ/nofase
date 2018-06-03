import React, { Component } from "react";
import { View, WebView, Platform, Button, Linking } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { computeSize, Tip } from "src/common";
import { Page } from "src/components";

@connect(state => {
  const { auth: { UserId } } = state;
  return { UserId };
})
export default class Navigation extends Component {
  static defaultProps = {};
  static propTypes = {
    navigation: PropTypes.object,
    newStoreInfo: PropTypes.object,
    UserId: PropTypes.number
  };
  state = {};
  goNative() {
    const { Lat, Lng, userLat, userLng } = this.props.navigation.state.params;
    Linking.openURL(
      `baidumap://map/direction?origin=${userLat},${userLng}&destination=${Lat},${Lng}&mode=driving`
    ).catch(e => {
      Tip.fail("未安装百度地图");
    });
  }
  render() {
    const { Lat, Lng, userLat, userLng } = this.props.navigation.state.params;
    return (
      <Page
        title="导航"
        RightComponent={
          <Button
            onPress={this.goNative}
            textStyle={{ fontSize: computeSize(12) }}
          >
            本地导航
          </Button>
        }
      >
        <View style={{ flex: 1 }}>
          <WebView
            source={{
              uri: `https://vmslq.cn/webview/navigation?params=${JSON.stringify(
                {
                  Lat,
                  Lng,
                  userLat,
                  userLng,
                  platform: Platform.OS
                }
              )}&timestamp=${Date.now}`
            }}
          />
        </View>
      </Page>
    );
  }
}
