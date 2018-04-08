import React, { Component } from "react";
import { WebView } from "react-native";
export default class FeedbackProblem extends Component {
  static defaultProps = {};
  static propTypes = {};
  state = {};
  render() {
    return (
      <WebView
        title="问题反馈"
        source={{ uri: "http://127.0.0.1:5500/feedback-problem/" }}
      />
    );
  }
}
