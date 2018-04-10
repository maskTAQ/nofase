import React, { Component } from "react";
import { View, WebView, Platform } from "react-native";
import PropTypes from "prop-types";

import WebViewAndroid from "react-native-webview-android";
import { Page } from "src/components";
//import styles from "./style";
export default class Wv extends Component {
  static defaultProps = {};
  static propTypes = {
    url: PropTypes.string,
    title: PropTypes.string,
    onPress: PropTypes.func
  };
  state = {};
  onNavigationStateChange(event) {}
  onMessage(event) {
    console.log(event, 1);
  }
  javascriptToInject() {
    return `
      $(document).ready(function() {
       window.webView.postMessage('hello world');
      })
    `;
  }
  render() {
    const { url, title, onPress, ...others } = this.props;
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

    const patchPostMessageJsCode =
      "(" + String(patchPostMessageFunction) + ")();";

    const javascriptToInject = function() {
      return `
    $(document).ready(function() {
     // alert(window.webView.postMessage);
      window.webView.postMessage('Link tapped: ' + href);
    })
  `;
    };
    if (Platform.OS === "ios") {
      return (
        <Page title={title} onPress={onPress}>
          <View style={{ flex: 1 }}>
            <WebView
              source={{ uri: url }}
              injectedJavaScript={patchPostMessageJsCode}
              {...others}
            />
          </View>
        </Page>
      );
    } else {
      return (
        <Page title={title} onPress={onPress}>
          <View style={{ flex: 1 }}>
            <WebViewAndroid
              javaScriptEnabled={true}
              url={url}
              style={{ flex: 1 }}
              geolocationEnabled={false}
              builtInZoomControls={false}
              injectedJavaScript={patchPostMessageJsCode}
              injectedJavaScript={javascriptToInject()}
              onMessage={e => {
                console.log(e);
              }}
              {...others}
            />
          </View>
        </Page>
      );
    }
  }
}
