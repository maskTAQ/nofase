import React, { Component } from "react";
import { View, WebView, Platform } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

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
  render() {
    const { Lat, Lng, userLat, userLng } = this.props.navigation.state.params;
    return (
      <Page title="导航">
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
