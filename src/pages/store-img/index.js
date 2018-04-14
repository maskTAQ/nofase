import React, { Component } from "react";
import { View, FlatList } from "react-native";
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
    console.log(item.ImgUrl);
    return (
      <View style={styles.imgBox}>
        <LoadingImage style={styles.imgBox} source={{ uri: item.ImgUrl }} />
      </View>
    );
  }
  render() {
    const { StoreImgList } = this.state;
    console.log(StoreImgList);
    return (
      <Page title="店铺图库">
        <View style={styles.container}>
          <FlatList
            data={StoreImgList}
            style={{ flex: 1 }}
            keyExtractor={(row, i) => row.Id}
            renderItem={this.renderItem}
          />
        </View>
      </Page>
    );
  }
}
