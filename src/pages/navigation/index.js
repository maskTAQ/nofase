import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { WebView } from "src/components";

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
    const { Lat, Lng } = this.props.navigation.state.params;
    return (
      <WebView
        title="导航"
        url={`https://vmslq.cn/webview/navigation?params=?params=${JSON.stringify(
          { Lat, Lng }
        )}&timestamp=${Date.now}`}
        ref={w => (this.webview = w)}
      />
    );
  }
}
