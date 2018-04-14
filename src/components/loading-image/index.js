import React, { Component } from "react";
import { View, Image, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";

import styles from "./style";

export default class LoadingImage extends Component {
  static propTypes = {
    style: PropTypes.object,
    source: PropTypes.object
  };
  state = {
    //当图片资源为网络资源时的state
    pending: true,
    status: "" //emua {'success','error'}
  };
  renderImageIcon() {
    const { style, source } = this.props;
    const { pending, status } = this.state;
    console.log(style, source, "asdad");
    return (
      <View style={[styles.imageIconBox, style]}>
        {pending && (
          <ActivityIndicator
            style={styles.imgPeningIndicator}
            color="#000"
            size="large"
          />
        )}
        <Image
          source={status === "error" ? require("./img/error.png") : source}
          style={[styles.imageIcon, style]}
          resizeMode="contain"
          onError={() => {
            this.setState({
              pending: false,
              status: "error"
            });
          }}
          onLoad={() => {
            this.setState({
              pending: false,
              status: "success"
            });
          }}
        />
      </View>
    );
  }
  render() {
    return <View style={styles.iconWrapper}>{this.renderImageIcon()}</View>;
  }
}
