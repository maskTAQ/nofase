import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import PropTypes from "prop-types";
import moment from "moment";

import { Tip, share } from "src/common";
import api from "src/api";
import action from "src/action";
import { Button, Icon, Page, ShareModal, DataView } from "src/components";
import styles from "./style";

export default class Fitnessrecord extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };
  state = {
    isShareModalVisible: false,
    //当前选中的订单
    currentOrder: {},
    isShareBarVisible: false
  };

  getUserOrderList(PageIndex) {
    return api.getUserOrderList({ PageIndex, PageNum: 20 });
  }
  renderItem(row) {
    console.log(row);
    const { StoreName, Amont = 0, SDate } = row;
    const timestamp = +/\/Date\(([0-9]+)\)/.exec(SDate)[1];
    return (
      <Button
        onPress={() => {
          this.setState({
            isShareModalVisible: true,
            currentOrder: row
          });
        }}
        style={styles.item}
      >
        <View style={styles.itemLeft}>
          <Text style={styles.itemTime}>
            {moment(new Date(timestamp)).format("YYYY/MM/DD HH:mm")}
          </Text>
          <Text style={styles.itemDetail}>
            {StoreName} | {" " + Amont}元
          </Text>
        </View>
        <View style={styles.itemRight}>
          <Icon
            size={20}
            source={require("./img/jiantou.png")}
            style={styles.rightimg}
          />
        </View>
      </Button>
    );
  }
  renderList() {
    return (
      <DataView
        style={styles.list}
        getData={this.getUserOrderList}
        ListEmptyComponent={<Text>暂时没有数据哦</Text>}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => this.renderItem(item)}
      />
    );
  }
  renderShareBar() {
    const { isShareBarVisible } = this.state;
    const data = [
      {
        icon: require("./img/u227.png"),
        label: "微信",
        platform: "WECHAT",
        onPress: () => {}
      },
      {
        icon: require("./img/u231.png"),
        label: "朋友圈",
        platform: "WECHATMOMENT",
        onPress: () => {}
      },
      {
        icon: require("./img/u229.png"),
        label: "QQ",
        platform: "QQ",
        onPress: () => {}
      },
      {
        icon: require("./img/u233.png"),
        label: "QQ空间",
        platform: "QQZONE",
        onPress: () => {}
      },
      {
        icon: require("./img/u235.png"),
        label: "新浪微博",
        platform: "SINA",
        onPress: () => {}
      }
    ];
    if (!isShareBarVisible) {
      return null;
    }
    return (
      <View style={styles.shareBar}>
        {data.map(({ icon, label, platform }) => {
          return (
            <Button
              onPress={() => {
                share({
                  title: "title",
                  content: "xx",
                  url: "https://www.baidu.com/img/bd_logo1.png",
                  imgSrc: "https://www.baidu.com/img/bd_logo1.png",
                  platform
                })
                  .then(res => {
                    this.setState({ isShareBarVisible: false });
                  })
                  .catch(e => {
                    Tip.fail(e);
                    this.setState({ isShareBarVisible: false }, () => {
                      this.props.navigation.dispatch(action.navigate.back());
                    });
                  });
              }}
              style={styles.shareBarItem}
              key={label}
            >
              <Icon size={40} source={icon} />
              <Text style={styles.shareBarItemLabel}>{label}</Text>
            </Button>
          );
        })}
      </View>
    );
  }
  render() {
    const { isShareModalVisible, currentOrder } = this.state;
    const {
      UserName,
      StoreName,
      TimeLong,
      Amont,
      StoreAddr = "暂无地址信息",
      SaleAmont
    } = currentOrder;
    return (
      <Page title="健身记录">
        <View style={styles.contianer}>
          <View style={styles.box}>
            <View>
              <Image
                source={require("./img/banner.png")}
                style={styles.banner}
                resizeMode="stretch"
              />
            </View>
            {this.renderList()}
            {this.renderShareBar()}
            <View />
            <ShareModal
              isVisible={isShareModalVisible}
              username={UserName}
              time={String(TimeLong)}
              money={Amont}
              discount={Amont - SaleAmont}
              storeName={StoreName}
              onlinePeople={0}
              addr={StoreAddr}
              close={() => {
                this.setState({
                  isShareModalVisible: false
                });
              }}
              share={() => {
                this.setState({
                  isShareModalVisible: false,
                  isShareBarVisible: true
                });
              }}
            >
              <Text>12</Text>
            </ShareModal>
          </View>
        </View>
      </Page>
    );
  }
}
