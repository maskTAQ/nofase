import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import api from "src/api";
import action from "src/action";
import { Tip } from "src/common";
import { WebView } from "src/components";

@connect(state => {
  const { auth: { UserId } } = state;
  return { UserId };
})
export default class UpPortrait extends Component {
  static defaultProps = {};
  static propTypes = {
    navigation: PropTypes.object,
    UserId: PropTypes.number
  };
  state = {};
  render() {
    const { UserId } = this.props;
    const params = {
      UserId
    };
    return (
      <WebView
        onPress={() => {
          this.props.navigation.dispatch(action.navigate.back());
          this.props.navigation
            .dispatch({
              type: "userInfo",
              api: () => {
                return api.getUserInfo();
              },
              promise: true
            })
            .catch(e => {
              Tip.loading("更新用户信息失败");
              console.log("e:reject", e);
            });
        }}
        title="上传头像"
        url={`https://vmslq.cn/webview/up-portrait?params=${JSON.stringify(
          params
        )}&timestamp=${Date.now}`}
        ref={w => (this.webview = w)}
      />
    );
  }
}
