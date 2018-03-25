import React from "react";
import { Text, View, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";
import styles from "./style";
import { Icon } from "src/components";
import { EventHub } from "src/common";

const defaultProps = {
  pointerEvents: false,
  timeout: 0
};

const propTypes = {
  //要显示的文本
  text: PropTypes.string,
  //消失的时间
  timeout: PropTypes.number
};

const DEFAULT_TIMEOUT = 2000;

class Loading extends React.Component {
  state = {
    text: null,
    loading: false,
    isShown: false,
    tipSuccess: false
  };

  componentDidMount() {
    EventHub.on("tip.success", this.success);
    EventHub.on("tip.loading", this.loading);
    EventHub.on("tip.fail", this.fail);
    EventHub.on("tip.dismiss", this.dismiss);
  }

  componentWillUnmount() {
    EventHub.removeListener("tip.success", this.success);
    EventHub.removeListener("tip.loading", this.loading);
    EventHub.removeListener("tip.fail", this.fail);
    EventHub.removeListener("tip.dismiss", this.dismiss);
  }

  /**
   * 操作成功
   * @param text 提示文本
   * @param timeout 关闭时间，默认3秒
   */
  success = (text, timeout = DEFAULT_TIMEOUT) => {
    this.setState({
      loading: false,
      isShown: true,
      tipSuccess: true,
      text: text
    });
    this.timeoutEvent = setTimeout(() => {
      this.dismiss();
    }, timeout);
  };

  /**
   * 加载中
   * @param text 显示内容
   */
  loading = text => {
    this.setState({
      loading: true,
      isShown: true,
      text: text
    });
  };

  /**
   * 操作失败
   * @param text 提示文本
   * @param timeout 关闭时间，默认3秒
   */
  fail = (text, timeout = DEFAULT_TIMEOUT) => {
    this.setState({
      loading: false,
      isShown: true,
      tipSuccess: false,
      text: text
    });
    this.timeoutEvent = setTimeout(() => {
      this.dismiss();
    }, timeout);
  };

  dismiss = () => {
    if (this.state.isShown) {
      this.setState({
        isShown: false
      });
      this.timeoutEvent && clearInterval(this.timeoutEvent);
    }
  };

  render() {
    if (!this.state.isShown) {
      return <View />;
    }

    let statusComponent = null;
    if (this.state.loading) {
      statusComponent = (
        <ActivityIndicator animating={true} color="white" size="small" />
      );
    } else {
      statusComponent = (
        <Icon
          size={30}
          source={
            this.state.tipSuccess
              ? require("./img/success.png")
              : require("./img/error.png")
          }
        />
      );
    }

    //要显示的文字
    const text = this.state.text ? (
      <Text style={styles.loadingText}>{this.state.text}</Text>
    ) : null;

    return (
      <View style={styles.container}>
        <View pointerEvents={"none"} style={styles.loadingBg} />
        <View style={styles.loadingBody}>
          <View style={styles.tipWrap}>
            {statusComponent}
            {text}
          </View>
        </View>
      </View>
    );
  }
}

Loading.propTypes = propTypes;
Loading.defaultProps = defaultProps;

export default Loading;
