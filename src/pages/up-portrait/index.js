import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { baseURL } from "src/config";
import { WebView } from "src/components";

@connect(state => {
  const { auth: { UserId } } = state;
  return { UserId };
})
export default class UpPortrait extends Component {
  static defaultProps = {};
  static propTypes = {
    navigation: PropTypes.object,
    newStoreInfo: PropTypes.object,
    UserId: PropTypes.number
  };
  state = {};
  render() {
    const { UserId } = this.props;
    const params = {
      UserId,
      url: `${baseURL}/Store/EditStore`
    };
    return (
      <WebView
        title="上传头像"
        url={`https://vmslq.cn/webview/up-portrait?params=?params=${JSON.stringify(
          params
        )}&timestamp=${Date.now}`}
        ref={w => (this.webview = w)}
      />
    );
  }
}
