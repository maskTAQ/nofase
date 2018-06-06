import React, { Component } from "react";
import { View, FlatList, Platform, WebView } from "react-native";
import PropTypes from "prop-types";

import { Page, LoadingImage } from "src/components";
import styles from "./style";
export default class StoreImg extends Component {
  static defaultProps = {};
  static propTypes = {
    navigation: PropTypes.object
  };
  state = {
    StoreImgList: []
  };
  componentWillMount() {
    const { StoreImgList } = this.props.navigation.state.params;
    //this.queueRender(StoreImgList)
    this.setState({
      StoreImgList: StoreImgList
    });
  }
  queueRender(StoreImgList) {
    this.setState({
      StoreImgList: [StoreImgList.pop()]
    });
  }
  renderItem({ item }) {
    return (
      <View style={styles.imgBox}>
        <LoadingImage
          style={styles.img}
          source={{ uri: item.ImgUrl }}
          resizeMode="stretch"
        />
      </View>
    );
  }
  render() {
    const { StoreImgList } = this.state;
    return (
      <Page title="店铺图库">
        <View style={styles.container}>
          {Platform.select({
            ios: (
              <FlatList
                data={StoreImgList}
                style={{ flex: 1 }}
                keyExtractor={(row, i) => row.Id}
                renderItem={this.renderItem}
              />
            ),
            android: (
              <WebView
                source={{
                  url: `https://vmslq.cn/webview/imgs/index.html?imgs=${JSON.stringify(
                    StoreImgList.map(item => item.ImgUrl)
                  )}`
                }}
              />
            )
          })}
        </View>
      </Page>
    );
  }
}
