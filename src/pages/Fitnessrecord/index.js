import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import PropTypes from "prop-types";
import moment from "moment";
import { connect } from "react-redux";

import { share } from "src/common";
import api from "src/api";
import action from "src/action";
import {
  Button,
  Icon,
  Page,
  ShareModal,
  DataView,
  ShareBar
} from "src/components";
import styles from "./style";
import { computeSize } from "src/common";

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

  getDateByMinute(minute) {
    // const pad = s => {
    //   if (String(s).length === 1) {
    //     return "0" + s;
    //   } else {
    //     return s;
    //   }
    // };
    const t = minute * 60;
    const d = Math.floor(t / (24 * 3600));
    const h = Math.floor((t - 24 * 3600 * d) / 3600);
    const m = Math.floor((t - 24 * 3600 * d - h * 3600) / 60);
    //const s = Math.floor(t - 24 * 3600 * d - h * 3600 - m * 60);
    return `${h}小时${m}分钟`;
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
            size={computeSize(20)}
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
        ListEmptyComponent={
          <View style={styles.noData}>
            <Text>您还没有运动记录</Text>
          </View>
        }
        ItemSeparatorComponent={() => (
          <View style={{ height: computeSize(10) }} />
        )}
        renderItem={({ item }) => this.renderItem(item)}
      />
    );
  }
  share(platform) {
    const { UserName } = this.state.currentOrder;
    const { StoreName, TimeLong, StoreImg } = this.state.currentOrder;
    share({
      title: "NoFace没脸运动 记录好身材！",
      content: `${UserName}在共享运动联盟店${StoreName}中锻炼了${this.getDateByMinute(
        TimeLong
      )}并爱上了流汗的滋味。`,
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
      Lng,
      PeopleNum
    } = currentOrder;
    return (
      <Page title="健身记录">
        <View style={styles.contianer}>
          <View style={styles.bg}>
            <View style={styles.bgTop} />
            <View style={styles.bgBottom} />
          </View>
          <View style={styles.content}>
            <Image
              source={require("./img/_运动记录.png")}
              style={styles.banner}
              resizeMode="stretch"
            />
            {this.renderList()}

            <View />
            <ShareModal
              isVisible={isShareModalVisible}
              Lat={Lat}
              Lng={Lng}
              username={NickName}
              people={String(Number(PeopleNum) - NowInPeopel)}
              portrait={
                UserPhoto ? { uri: UserPhoto } : require("./img/logo.png")
              }
              storeImg={
                StoreImg ? { uri: StoreImg } : require("./img/logo.png")
              }
              level={Level}
              time={this.getDateByMinute(TimeLong)}
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
            <ShareBar
              isVisible={this.state.isShareBarVisible}
              share={this.share}
              close={() => {
                this.setState({ isShareBarVisible: false });
              }}
            />
          </View>
        </View>
      </Page>
    );
  }
}
