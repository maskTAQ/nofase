import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  Linking
} from "react-native";
import PropTypes from "prop-types";
import moment from "moment";

import { WebSocket, Tip, share } from "src/common";
import api from "src/api";
import {
  Page,
  Button,
  Icon,
  StarScore,
  ShareModal,
  Picker
} from "src/components";
import action from "src/action";
import { connect } from "react-redux";
import styles from "./style";

const { width } = Dimensions.get("window");
@connect(state => {
  const { userInfo } = state;
  return { userInfo };
})
export default class Pay extends Component {
  static defaultProps = {};
  static propTypes = {
    SDate: PropTypes.string,
    EDate: PropTypes.string,
    OrderType: PropTypes.number,
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    userInfo: PropTypes.object
  };
  state = {
    currentScore: 5,
    SDate: "",
    STimeStamp: "",
    EDate: "",
    ETimeStamp: "",
    OrderType: 0, //0 未开始 1开始 2结束
    discountValue: NaN,
    discountLabel: "暂无优惠",
    isPickerVisible: false,
    //计时
    tickts: "",
    OrderId: "",
    isShareModalVisible: false,
    isShareBarVisible: false
  };
  componentWillMount() {
    api.getOrderStatus().then(res => {
      console.log(res);
    });
    const { hasData } = this.props.userInfo;
    if (!hasData) {
      this.props
        .dispatch({
          type: "userInfo",
          api: () => {
            return api.getUserInfo();
          },
          promise: true
        })
        .catch(e => {
          Tip.loading("获取用户信息失败");
        });
    }
    WebSocket.addEventListenter(data => {
      console.log(data);
      const { Money } = data;
      let { TimeStamp, ETimeStamp, STimeStamp } = data;
      TimeStamp = TimeStamp * 1000;
      ETimeStamp = ETimeStamp * 1000;
      STimeStamp = STimeStamp * 1000;
      if (typeof Money === "number") {
        this.tickts(true, STimeStamp);
        this.setState({
          ...data,
          ETimeStamp,
          EDate: moment(ETimeStamp).format("HH:mm"),
          STimeStamp,
          SDate: moment(STimeStamp).format("HH:mm")
        });
      } else {
        this.tickts(false, TimeStamp);
        this.setState({
          ...data,
          STimeStamp: TimeStamp,
          SDate: moment(TimeStamp).format("HH:mm"),
          EDate: "",
          ETimeStamp: ""
        });
      }
    });
  }
  componentWillUnmount() {
    clearInterval(this.ticktTimer);
  }
  ticktTimer = NaN;
  tickts = (isEnd, STimeStamp) => {
    const pad = s => String(s).padStart("2", "0");
    const m = () => {
      const t = (Date.now() - STimeStamp) / 1000;
      const d = Math.floor(t / (24 * 3600));
      const h = Math.floor((t - 24 * 3600 * d) / 3600);
      const m = Math.floor((t - 24 * 3600 * d - h * 3600) / 60);
      const s = Math.floor(t - 24 * 3600 * d - h * 3600 - m * 60);
      this.setState({
        tickts: pad(h) + ":" + pad(m) + ":" + pad(s)
      });
    };
    if (isEnd) {
      clearInterval(this.ticktTimer);
      m();
    } else {
      clearInterval(this.ticktTimer);
      m();
      this.ticktTimer = setInterval(() => {
        m();
      }, 1000);
    }
  };
  submit = () => {
    const { OrderId, currentScore } = this.state;
    api
      .completeOrder({ OrderId, Score: currentScore })
      .then(res => {
        this.setState({
          isShareModalVisible: true
        });
      })
      .catch(e => {
        Tip.fail("评价失败");
      });
  };
  renderHeader() {
    const { OrderType, SDate, EDate, tickts } = this.state;
    const noTimeStr = "--/--";
    const data = [[noTimeStr, noTimeStr], [SDate, noTimeStr], [SDate, EDate]];

    return (
      <View
        style={[styles.headerWrapper, OrderType === 1 && { paddingTop: 0 }]}
      >
        <View style={styles.header}>
          <View style={styles.headerItemWrapper}>
            <View style={styles.headerItem}>
              <Text style={styles.headerItemLabel}>开始时间</Text>
              <Text style={styles.headerItemValue}>{data[OrderType][0]}</Text>
            </View>
          </View>
          <Icon size={30} source={require("./img/u17.png")} />
          <View style={styles.headerItemWrapper}>
            <View style={styles.headerItem}>
              <Text style={styles.headerItemLabel}>结束时间</Text>
              <Text style={styles.headerItemValue}>{data[OrderType][1]}</Text>
            </View>
          </View>
        </View>
        {OrderType === 0 ? (
          <View style={{ height: styles.timeCount.height }} />
        ) : (
          <Text style={styles.timeCount}>使用时长:{tickts}</Text>
        )}
        <View style={styles.itemBorder}>
          <Image
            source={require("./img/u14_line.png")}
            style={styles.itemBorderIcon}
          />
        </View>
      </View>
    );
  }
  renderCommon(data) {
    return (
      <View style={styles.tWrapper}>
        <View style={styles.t}>
          <View style={styles.tItem}>
            <Text style={styles.tItemLabel}>{data[0][0]}</Text>
            <View style={styles.tItemValueWrapper}>
              <Text style={styles.tItemValue}>{data[0][1]}</Text>
            </View>
          </View>
          <View style={[styles.tItem, { alignItems: "flex-end" }]}>
            <Text style={styles.tItemLabel}>{data[1][0]}</Text>
            <View style={styles.tItemValueWrapper}>
              <Text style={styles.tItemValue}>{data[1][1]}</Text>
            </View>
          </View>
        </View>
        <View style={styles.itemBorder}>
          <Image
            source={require("./img/u14_line.png")}
            style={styles.itemBorderIcon}
          />
        </View>
      </View>
    );
  }
  renderDiscountsChunk(data) {
    return (
      <View style={styles.tWrapper}>
        <View style={styles.t}>
          <View style={styles.tItem}>
            <Text style={styles.tItemLabel}>{data[0][0]}</Text>
            <View style={styles.tItemValueWrapper}>
              <Text style={styles.tItemValue}>{data[0][1]}</Text>
            </View>
          </View>
          <View style={[styles.tItem, { alignItems: "flex-end" }]}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.tItemLabel}>{data[1][0]}</Text>
              <Icon size={20} source={require("./img/u328.png")} />
            </View>
            <Button
              onPress={() => {
                this.setState({
                  isPickerVisible: true
                });
              }}
              style={styles.tItemValueWrapper}
            >
              <Text style={styles.tItemValue}>{data[1][1]}</Text>
            </Button>
          </View>
        </View>
        <View style={styles.itemBorder}>
          <Image
            source={require("./img/u14_line.png")}
            style={styles.itemBorderIcon}
          />
        </View>
      </View>
    );
  }
  renderStoreInfo() {
    const { StoreName, StoreTel } = this.state;
    return (
      <View style={styles.storeInfo}>
        <Text style={styles.storeName}>{StoreName}</Text>
        <Button
          onPress={() => {
            Linking.openURL(`tel:${StoreTel}`);
          }}
        >
          <Icon size={15} source={require("./img/u204.png")} />
        </Button>
      </View>
    );
  }
  renderContent() {
    const {
      OrderType,
      currentScore,
      discountLabel,
      Charge,
      Money
    } = this.state;
    switch (String(OrderType)) {
      case "0":
        return (
          <ScrollView style={styles.content}>
            {this.renderHeader()}
            <View style={styles.QR}>
              <Icon
                source={{
                  uri: `http://qr.liantu.com/api.php?text=${JSON.stringify({
                    UserId: 1
                  })}`
                }}
                size={width - 30 * 2}
              />
            </View>
          </ScrollView>
        );
      case "1":
        return (
          <ScrollView style={styles.content}>
            {this.renderStoreInfo()}
            {this.renderHeader()}
            {this.renderCommon([
              ["Per hour", "每一小时"],
              ["Cost", `￥:${Charge}元`]
            ])}
            {this.renderDiscountsChunk([
              ["Discount", "优惠选择"],
              ["Choice", discountLabel]
            ])}
            <View style={styles.QR}>
              <Icon
                source={{
                  uri: `http://qr.liantu.com/api.php?text=${JSON.stringify({
                    UserId: 1
                  })}`
                }}
                size={width - 30 * 2}
              />
            </View>
          </ScrollView>
        );
      default:
        return (
          <ScrollView style={styles.content}>
            {this.renderHeader()}
            {this.renderCommon([
              ["Per hour", "每一小时"],
              ["Cost", `￥:${Charge}元`]
            ])}
            {this.renderCommon([
              ["Charge", "收费"],
              ["Price", `￥:${Money}元`]
            ])}
            {this.renderCommon([["Discount", "优惠"], ["Price", "￥:0元"]])}
            <View style={styles.starScore}>
              <Text style={styles.starScoreTitle}>Score 评分</Text>
              <View style={styles.starScoreBox}>
                <StarScore
                  currentScore={currentScore}
                  onChangeScore={currentScore => {
                    this.setState({ currentScore });
                  }}
                  iconSize={20}
                />
                <Button
                  onPress={this.submit}
                  style={styles.submit}
                  textStyle={styles.submitText}
                >
                  提交
                </Button>
              </View>
              <Text style={styles.starScoreEvaluate}>棒棒的</Text>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={styles.starScoreExpend}>支出:{Money}元</Text>
              </View>
            </View>
          </ScrollView>
        );
    }
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
                console.log(share);
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
    const {
      isPickerVisible,
      isShareModalVisible,
      Money,
      tickts,
      StoreName,
      StoreAddress,
      NowInPeople,
      CardList
    } = this.state;
    const { NickName } = this.props.userInfo;
    return (
      <Page
        title="扫码计时"
        RightComponent={
          <Button
            onPress={() => {
              this.props.navigation.dispatch(
                action.navigate.go({ routeName: "Fitnessrecord" })
              );
            }}
            textStyle={{ color: "#fff", fontSize: 14, fontWeight: "bold" }}
          >
            记录
          </Button>
        }
      >
        <View style={styles.container}>
          <View style={styles.box}>
            {this.renderContent()}
            <View style={styles.chunk} />
          </View>
          {this.renderShareBar()}
        </View>
        <Picker
          data={Object(
            [
              {
                value: NaN,
                label: "暂无优惠"
              }
            ],
            CardList
          )}
          visible={isPickerVisible}
          onRequestClose={() => {
            this.setState({
              isPickerVisible: false
            });
          }}
        />
        <ShareModal
          isVisible={isShareModalVisible}
          username={NickName}
          time={tickts}
          money={Money}
          discount={0}
          storeName={StoreName}
          onlinePeople={NowInPeople}
          addr={StoreAddress}
          close={() => {
            this.setState(
              {
                isShareModalVisible: false
              },
              () => {
                this.props.navigation.dispatch(action.navigate.back());
              }
            );
          }}
          share={() => {
            this.setState({
              isShareModalVisible: false,
              isShareBarVisible: true
            });
          }}
        />
      </Page>
    );
  }
}
