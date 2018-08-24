import React, { Component } from "react";
import { WebView, Platform, Dimensions } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const { width } = Dimensions.get("window");

@connect(state => {
  const { location } = state;
  return { location };
})
export default class Map extends Component {
  static propTypes = {
    location: PropTypes.object
  };
  state = {};
  shouldComponentUpdate(nextProps) {
    return nextProps.location.latitude && !this.props.location.latitude;
  }
  render() {
    //发送消息给 html
    // setTimeout(()=>{
    //   this.webview.postMessage('1333')
    // },10000)

    /* eslint-disable */
    const patchPostMessageFunction = function() {
      var originalPostMessage = window.postMessage;

      var patchedPostMessage = function(message, targetOrigin, transfer) {
        originalPostMessage(message, targetOrigin, transfer);
      };

      patchedPostMessage.toString = function() {
        return String(Object.hasOwnProperty).replace(
          "hasOwnProperty",
          "postMessage"
        );
      };

      window.postMessage = patchedPostMessage;
    };
    const { latitude: userLat, longitude: userLng } = this.props.location;

    const patchPostMessageJsCode =
      "(" + String(patchPostMessageFunction) + ")();";

    return (
      <WebView
        source={{
          uri: `https://vmslq.cn/webview/map/index.html?userLng=${userLng}&userLat=${userLat}&platform=${
            Platform.OS
          }&right=${(42 - 16 - 12) / width * 100}%`
        }}
        ref={w => (this.webview = w)}
        style={{ flex: 1 }}
        injectedJavaScript={patchPostMessageJsCode}
        onMessage={e => {
          const storeId = e.nativeEvent.data;
          this.props.onStoreTap(storeId);
          console.log(e.nativeEvent.data, "这是html发送过来的消息");
        }}
      />
    );
  }
}
