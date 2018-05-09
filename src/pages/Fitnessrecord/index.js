import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import PropTypes from "prop-types";
import moment from "moment";
import { connect } from "react-redux";

import { share } from "src/common";
import api from "src/api";
import action from "src/action";
import { Button, Icon, Page, ShareModal, DataView } from "src/components";
import styles from "./style";
("");
@connect()
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
  getTimeByMinutes(minutes) {
    const pad = s => {
      if (String(s).length === 1) {
        return "0" + s;
      } else {
        return s;
      }
    };
    const t = minutes * 60 / 1000;
    const d = Math.floor(t / (24 * 3600));
    const h = Math.floor((t - 24 * 3600 * d) / 3600);
    const m = Math.floor((t - 24 * 3600 * d - h * 3600) / 60);
    //const s = Math.floor(t - 24 * 3600 * d - h * 3600 - m * 60);
    return `${pad(h)}:${pad(m)}`;
  }
  renderItem(row) {
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
                const {
                  StoreName,
                  TimeLong,
                  StoreImg
                } = this.state.currentOrder;
                share({
                  title: "健身记录",
                  content: `我在${StoreName}中锻炼了${this.getTimeByMinutes(
                    TimeLong
                  )}`,
                  url: "https://vmslq.cn/",
                  imgSrc: StoreImg,
                  platform
                })
                  .then(res => {
                    this.setState({ isShareBarVisible: false });
                  })
                  .catch(e => {
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
      NickName,
      StoreName,
      TimeLong,
      Amont,
      StoreAddress,
      storeAddrDes,
      SaleAmont,
      UserPhoto,
      Level,
      StoreImg,
      NowCurriculum,
      NowInPeopel,
      StoreId,
      Lat,
      Lng
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
              Lat={Lat}
              Lng={Lng}
              username={NickName}
              portrait={
                UserPhoto ? { uri: UserPhoto } : require("./img/logo.png")
              }
              storeImg={
                StoreImg ? { uri: StoreImg } : require("./img/logo.png")
              }
              level={Level}
              time={this.getTimeByMinutes(TimeLong)}
              money={Amont}
              discount={Amont - SaleAmont}
              storeName={StoreName}
              onlinePeople={NowInPeopel}
              NowCurriculum={NowCurriculum}
              addr={
                String(StoreAddress || "") + String(storeAddrDes || "") ||
                "暂无"
              }
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
              goStoreDetail={() => {
                this.setState(
                  {
                    isShareModalVisible: false
                  },
                  () => {
                    this.props.navigation.dispatch(
                      action.navigate.go({
                        routeName: "StoreDetail",
                        params: {
                          Id: StoreId
                        }
                      })
                    );
                  }
                );
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
