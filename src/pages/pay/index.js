import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  Linking,
  Alert,
  ActivityIndicator,
  TouchableWithoutFeedback
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
  const { userInfo, auth: { UserId } } = state;
  return { userInfo, UserId };
})
export default class Pay extends Component {
  static defaultProps = {};
  static propTypes = {
    SDate: PropTypes.string,
    EDate: PropTypes.string,
    OrderType: PropTypes.number,
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    userInfo: PropTypes.object,
    UserId: PropTypes.number
  };
  state = {
    currentScore: 5,
    SDate: "",
    STimeStamp: "",
    EDate: "",
    ETimeStamp: "",
    OrderType: 0, //0 未开始 1开始 2结束
    //优惠卡id
    CardId: 0,
    discountLabel: "暂无优惠",
    isPickerVisible: false,
    //计时
    tickts: "",
    isShareModalVisible: false,
    isShareBarVisible: false,
    //优惠列表
    discountList: [],
    //
    Qr: {
      status: "loading",
      src: ""
    }
  };
  componentWillMount() {
    this.getQrCodeUrl();
    this.getPrevOrder().then(() => {
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
      this.getDiscountList();
    });

    WebSocket.addEventListenter(data => {
      const { Type, MinMoney } = data;
      console.log(data, "data");
      if (Type === 3 && this.state.Type !== 3) {
        console.log(this.state);
        this.setState({
          isShareModalVisible: true
        });
      }
      let { TimeStamp, ETimeStamp, STimeStamp } = data;
      TimeStamp = TimeStamp * 1000;
      ETimeStamp = ETimeStamp * 1000;
      STimeStamp = STimeStamp * 1000;
      switch (Type) {
        //开始订单
        case 1:
          this.tickts(false, TimeStamp);
          this.setState({
            ...data,
            STimeStamp: TimeStamp,
            SDate: moment(TimeStamp).format("HH:mm"),
            EDate: "",
            ETimeStamp: ""
          });
          return;
        case 2:
          Alert.alert(
            "余额不足",
            `当前余额不足,不能享受服务,请先充值,最少充值${MinMoney}元`,
            [
              {
                text: "充值",
                onPress: () =>
                  this.props.navigation.dispatch(
                    action.navigate.go({ routeName: "Recharge" })
                  )
              },
              {
                text: "取消",
                onPress: () =>
                  this.props.navigation.dispatch(action.navigate.back())
              }
            ],
            { cancelable: false }
          );
          return;
        case 3:
          this.tickts(true, STimeStamp);
          this.setState({
            ...data,
            ETimeStamp,
            EDate: moment(ETimeStamp).format("HH:mm"),
            STimeStamp,
            SDate: moment(STimeStamp).format("HH:mm")
          });
          //更新用户余额
          this.props.dispatch({
            type: "userInfo",
            api: () => {
              return api.getUserInfo();
            },
            promise: true
          });
          return;
        case 4:
          Alert.alert(
            "余额不足",
            `当前余额不足,不能结束,请先充值，最少充值${MinMoney}元`,
            [
              {
                text: "充值",
                onPress: () =>
                  this.props.navigation.dispatch(
                    action.navigate.go({ routeName: "Recharge" })
                  )
              }
            ],
            { cancelable: false }
          );
          return;
      }
      return;
      // const { Money } = data;
      // let { TimeStamp, ETimeStamp, STimeStamp } = data;
      // TimeStamp = TimeStamp * 1000;
      // ETimeStamp = ETimeStamp * 1000;
      // STimeStamp = STimeStamp * 1000;
      // if (typeof Money === "number") {
      //   this.tickts(true, STimeStamp);
      //   this.setState({
      //     ...data,
      //     ETimeStamp,
      //     EDate: moment(ETimeStamp).format("HH:mm"),
      //     STimeStamp,
      //     SDate: moment(STimeStamp).format("HH:mm")
      //   });
      // } else {
      //   this.tickts(false, TimeStamp);
      //   this.setState({
      //     ...data,
      //     STimeStamp: TimeStamp,
      //     SDate: moment(TimeStamp).format("HH:mm"),
      //     EDate: "",
      //     ETimeStamp: ""
      //   });
      // }
    });
  }
  componentWillUnmount() {
    clearInterval(this.ticktTimer);
  }
  getQrCodeUrl() {
    this.setState({
      Qr: {
        status: "loading",
        src: ""
      }
    });
    api
      .getQrCodeUrl(this.props.UserId, this.state.CardId)
      .then(res => {
        console.log(res);
        this.setState({
          Qr: {
            status: "success",
            src: res.data
          }
        });
      })
      .catch(e => {
        console.log(e);
        this.setState({
          Qr: {
            status: "error",
            src: ""
          }
        });
      });
  }
  getPrevOrder() {
    return api
      .getOrderStatus()
      .then(data => {
        console.log(data);
        const TimeStamp = data.TimeStamp * 1000;
        this.tickts(false, TimeStamp);
        this.setState({
          ...data,
          STimeStamp: TimeStamp,
          SDate: moment(TimeStamp).format("HH:mm"),
          EDate: "",
          ETimeStamp: ""
        });
        return Promise.resolve();
      })
      .catch(e => {
        return Promise.resolve();
      });
  }
  getDiscountList() {
    api
      .getDiscountList()
      .then(res => {
        const discountList = res.filter(({ isUse }) => isUse).map(item => {
          const { CardName, Id } = item;
          return {
            value: Id,
            label: CardName
          };
        });
        this.setState({
          discountList
        });
      })
      .catch(e => {
        console.log(e);
      });
  }
  ticktTimer = NaN;
  tickts = (isEnd, STimeStamp) => {
    const pad = s => {
      if (String(s).length === 1) {
        return "0" + s;
      } else {
        return s;
      }
    };
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
        Tip.fail("评价成功");
        setTimeout(() => {
          this.props.dispatch(action.navigate.back());
        }, 1500);
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
          <View style={styles.rightIconWrapepr}>
            <Icon size={30} source={require("./img/u17.png")} />
          </View>
          <View style={styles.headerItemWrapper}>
            <View style={[styles.headerItem, styles.headerItemRight]}>
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
            </View>
            <Button
              onPress={() => {
                this.setState({
                  isPickerVisible: true
                });
              }}
              style={styles.tItemValueWrapper}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.tItemValue}>{data[1][1]}</Text>
                <Image
                  style={{ width: 16, height: 9, marginLeft: 4 }}
                  source={require("./img/arrow-bottom.png")}
                />
              </View>
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
    const { StoreName, StoreCsTel } = this.state;
    return (
      <View style={styles.storeInfoWrapper}>
        <View style={styles.storeInfo}>
          <Text style={styles.storeName}>当前所在位置:{StoreName}</Text>
          <Button
            onPress={() => {
              Linking.openURL(`tel:${StoreCsTel}`);
            }}
          >
            <Icon size={15} source={require("./img/u204.png")} />
          </Button>
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
  renderQr() {
    const { status, src } = this.state.Qr;
    switch (status) {
      case "loading":
        return (
          <View style={styles.QR}>
            <ActivityIndicator color="#333" size="large" />
          </View>
        );
      case "success":
        return (
          <View style={styles.QR}>
            <Icon
              source={{
                uri: src
              }}
              size={width - 50 * 2}
            />
          </View>
        );
      case "error":
        return (
          <View style={styles.QR}>
            <Button onPress={this.getQrCodeUrl} style={{}}>
              二维码加载失败！点我重新加载
            </Button>
          </View>
        );
      default:
        return null;
    }
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
            {this.renderDiscountsChunk([
              ["Discount", "优惠选择"],
              ["Choice", discountLabel]
            ])}
            {this.renderQr()}
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
            {this.renderCommon([
              ["Discount", "优惠选择"],
              ["Choice", discountLabel]
            ])}
            {this.renderQr()}
          </ScrollView>
        );
      default:
        return (
          <ScrollView style={styles.content}>
            <TouchableWithoutFeedback
              onPress={() => {
                this.setState({
                  isShareBarVisible: false
                });
              }}
            >
              <View>
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
                  <Text style={styles.starScoreEvaluate}>
                    {["", "很差", "差", "一般", "良好", "棒棒哒"][currentScore]}
                  </Text>
                  <View style={{ alignItems: "flex-end" }}>
                    <Text style={styles.starScoreExpend}>支出:{Money}元</Text>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
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
  renderNotif() {
    const { OrderType } = this.state;
    switch (true) {
      case OrderType === 0:
        return (
          <View style={styles.notif}>
            <Text style={styles.notifText} numberOfLines={1}>
              提示:开始运动/商家扫码前,余额要多于计费单价的两倍
            </Text>
          </View>
        );
      case OrderType === 1:
        return (
          <View style={styles.notif}>
            <Text style={styles.notifText} numberOfLines={1}>
              一定要记得:运动结束是再次出示页面扫码后才可结束运动
            </Text>
          </View>
        );
      default:
        return null;
    }
  }
  render() {
    const {
      isPickerVisible,
      isShareModalVisible,
      Money,
      tickts,
      StoreName,
      StoreAddress,
      NowInPeopel,
      PeopleNum,
      discountList,
      discountLabel,
      CardId,
      SaleAmont,
      UserPhoto,
      StorePhoto,
      Level,
      NowCurriculum,
      StoreId
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
          {this.renderNotif()}

          <View style={styles.box}>
            {this.renderContent()}
            <View style={styles.chunk} />
          </View>
          {this.renderShareBar()}
        </View>

        <Picker
          data={Object.assign(
            [
              {
                value: CardId,
                label: discountLabel
              }
            ],
            discountList
          )}
          visible={isPickerVisible}
          onRequestClose={() => {
            this.setState({
              isPickerVisible: false
            });
          }}
          onValueSelect={(v, item) => {
            this.setState(
              {
                discountLabel: item.label,
                CardId: item.value,
                isPickerVisible: false
              },
              () => {
                this.getQrCodeUrl();
              }
            );
          }}
        />
        <ShareModal
          isVisible={isShareModalVisible}
          portrait={UserPhoto ? { uri: UserPhoto } : require("./img/logo.png")}
          people={Number(PeopleNum) - NowInPeopel}
          storeImg={
            StorePhoto ? { uri: StorePhoto } : require("./img/logo.png")
          }
          username={NickName}
          level={Level}
          time={tickts}
          money={Money}
          discount={Money - SaleAmont}
          storeName={StoreName}
          onlinePeople={NowInPeopel}
          NowCurriculum={NowCurriculum}
          addr={StoreAddress}
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
        />
      </Page>
    );
  }
}
