import React, { Component } from "react";
import { WebView } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Page } from "src/components";

@connect(state => {
  const { userInfo, auth: { UserId } } = state;
  return { userInfo, UserId };
})
export default class FeedbackProblem extends Component {
  static defaultProps = {};
  static propTypes = {
    UserId: PropTypes.number
  };
  state = {};
  render() {
    const { UserId } = this.props;
    return (
      <Page title="问题反馈">
        <WebView
          source={{
            uri: `https://vmslq.cn/webview/feedback/index.html?OpinionType=1&UserId=${UserId}`
          }}
        />
      </Page>
    );
  }
}
