import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  Linking,
  ActivityIndicator,
  TouchableWithoutFeedback
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import styles from "./style";
import { Table, Header, Button, Icon, StarScore } from "src/components";
import api from "src/api";
import action from "src/action";
import { Tip, share } from "src/common";

@connect(state => {
  const { auth: { UserId } } = state;
  return { UserId };
})
export default class StoreDetail extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    UserId: PropTypes.number
  };
  state = {
    isLoadingStoreImg: true,
    StoreName: "-",
    Address: "-",
    PeopleNum: "-",
    Charge: "-",
    StoreTel: "0",
    StoreImg: "",

    Bath: 0,
    Storage: 0,
    Aerobic: 0,
    IsAerobic: 0,
    Power: 0,
    IsPower: 0,
    HealthCare: 0,
    IsHealthCare: 0,

    BusinessWeeks: "0,0",
    BusinessTimes: "",

    timetable: [],

    isShareBarVisible: false
  };
  componentWillMount() {
    Tip.loading();
    const { Id } = this.props.navigation.state.params;
    Promise.all([
      this.getStoreInfo(Id),
      this.getStoreImg(Id),
      this.getScoreUserPortrait(Id),
      this.getStoreScore(Id),
      this.getStoreNowPeople(Id),
      this.getDeviceInfo(Id),
      this.getCurriculum(Id)
    ])
      .then(res => {
        res.forEach((item, i) => {
          this.setState({ ...item });
        });
        Tip.dismiss();
      })
      .catch(e => {
        Tip.dismiss();
      });
  }
  store = {
    tableColumns: [
      {
        title: "时间",
        dataIndex: "STime",
        render: (row, value, fiedIndex, index) => {
          const { STime, ETime } = row;
          let label = "";

          switch (true) {
            case !!STime && !!ETime:
              label = STime + "-" + ETime;
              break;
            case !!STime:
              label = STime + "-" + "?";
              break;
            case !!ETime:
              label = "?" + "-" + ETime;
              break;
            default:
              label = "?-?";
              break;
          }
          return (
            <Text style={{ fontSize: 12, color: "#1a97df" }}>{label}</Text>
          );
        }
      },
      { title: "周一", dataIndex: "Week0" },
      { title: "周二", dataIndex: "Week1" },
      { title: "周三", dataIndex: "Week2" },
      { title: "周四", dataIndex: "Week3" },
      { title: "周五", dataIndex: "Week4" },
      { title: "周六", dataIndex: "Week5" },
      { title: "周日", dataIndex: "Week6" }
    ]
  };

  getStoreInfo(Id) {
    return api
      .getStoreInfo({
        StoreId: Id,
        AdminId: 2
      })
      .then(res => {
        return res;
      })
      .catch(e => {
        console.log(e);
        return {};
      });
  }
  getScoreUserPortrait(Id) {
    return api
      .getScoreUserPortrait(Id)
      .then(res => {
        console.log(res);
        return {
          portrait: res
        };
      })
      .catch(e => {
        console.log(e);
        return {
          portrait: []
        };
      });
  }
  getStoreScore(Id) {
    return api
      .getStoreScore(Id)
      .then(res => {
        return {
          StoreScore: +res.StoreScore
        };
      })
      .catch(e => {
        console.log(e);
        return {};
      });
  }
  getStoreNowPeople(id) {
    return api
      .getStoreNowPeople(id)
      .then(res => {
        return { NowPeopleNum: res.nowPeopleNum };
      })
      .catch(e => {
        return { NowPeopleNum: 0 };
      });
  }
  getStoreImg(id) {
    return api
      .getStoreImg(id)
      .then(res => {
        return {
          StoreImg: res[0] ? res[0].ImgUrl : "",
          StoreImgList: res
        };
      })
      .catch(e => {
        return {
          StoreImg: ""
        };
      });
  }
  getDeviceInfo(Id) {
    return api
      .getStoreEquip({
        StoreId: Id,
        AdminId: 2
      })
      .then(res => {
        return res || {};
      })
      .catch(e => {
        console.log(e);
        return {};
      });
  }
  getCurriculum(Id) {
    return api
      .getCurriculum({
        StoreId: Id
      })
      .then(res => {
        return { timetable: res };
      })
      .catch(e => {
        console.log(e);
        return {};
      });
  }
  getTableData = () => {
    return Promise.resolve(this.store.data);
  };
  navgation = () => {
    const { Lat, Lng } = this.state;
    this.props.navigation.dispatch(
      action.navigate.go({
        routeName: "Navigation",
        params: { Lat, Lng }
      })
    );
  };
  renderShareBar() {
    const { isShareBarVisible } = this.state;
    const { UserId } = this.props;
    const data = [
      {
        icon: require("./img/u227.png"),
        label: "微信",
        platform: "WECHAT"
      },
      {
        icon: require("./img/u231.png"),
        label: "朋友圈",
        platform: "WECHATMOMENT"
      },
      {
        icon: require("./img/u229.png"),
        label: "QQ",
        platform: "QQ"
      },
      {
        icon: require("./img/u233.png"),
        label: "QQ空间",
        platform: "QQZONE"
      },
      {
        icon: require("./img/u235.png"),
        label: "新浪微博",
        platform: "SINA"
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
                  title: "好友邀请你来一起没脸共享运动吧！",
                  content:
                    "全城运动场所按时共享计费，不办卡最低4.9元/小时起参与。",
                  url: `https://vmslq.cn/Share/Guide?UserId=${UserId}`,
                  imgSrc: "http://vmslq.com/wxicon/2.jpg",
                  platform
                })
                  .then(res => {
                    this.setState({ isShareBarVisible: false });
                  })
                  .catch(e => {
                    this.setState({ isShareBarVisible: false });
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
  renderHeader() {
    const {
      StoreName,
      Address,
      PeopleNum,
      Charge,
      StoreImg,
      NowPeopleNum,
      isLoadingStoreImg,
      StoreImgList = [],
      storeAddrDes
    } = this.state;
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          if (StoreImgList.length === 0) {
            Tip.fail("图库中暂无图片");
          } else {
            this.props.navigation.dispatch(
              action.navigate.go({
                routeName: "StoreImg",
                params: {
                  StoreImgList
                }
              })
            );
          }
        }}
      >
        <View style={styles.header}>
          {StoreImg ? (
            <Image
              onLoad={() => {
                console.log("load");
                this.setState({
                  isLoadingStoreImg: false
                });
              }}
              onError={() => {
                this.setState({
                  isLoadingStoreImg: false,
                  StoreImg: ""
                });
                Tip.fail("商铺图片加载失败");
              }}
              source={{ uri: StoreImg }}
              style={styles.headerBg}
            />
          ) : (
            <Image source={require("./img/u0.png")} style={styles.headerBg} />
          )}

          {isLoadingStoreImg && StoreImg ? (
            <ActivityIndicator size="large" color="#000" />
          ) : null}
          <View style={styles.storeIntro}>
            <View style={styles.introTitleWrapper}>
              <View style={styles.introTitleBox}>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{ fontSize: 20, color: "#fff", fontWeight: "bold" }}
                  >
                    {StoreName}
                  </Text>
                  <Text
                    style={{
                      marginTop: 4,
                      fontSize: 14,
                      color: "#fff",
                      fontWeight: "bold"
                    }}
                  >
                    {Address}
                    {storeAddrDes}
                  </Text>
                </View>
                <Button
                  onPress={this.navgation}
                  style={{ justifyContent: "center" }}
                >
                  <Icon
                    size={20}
                    source={require("./img/u101.png")}
                    style={{ alignItems: "center" }}
                  />
                  <Text
                    style={{ fontSize: 12, color: "#fff", fontWeight: "bold" }}
                  >
                    每一小时
                  </Text>
                  <Text
                    style={{ fontSize: 12, color: "#fff", fontWeight: "bold" }}
                  >
                    计费一次
                  </Text>
                </Button>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                padding: 6,
                backgroundColor: "#666",
                alignContent: "center"
              }}
            >
              <Icon
                size={26}
                source={require("./img/u177.png")}
                style={{ paddingLeft: 10, paddingRight: 10 }}
              />
              <View style={{ flex: 1 }}>
                <Text
                  style={{ fontSize: 12, color: "#fff", fontWeight: "bold" }}
                >
                  可容纳线上{PeopleNum}人位
                </Text>
                <Text
                  style={{ fontSize: 12, color: "#fff", fontWeight: "bold" }}
                >
                  当前剩余{PeopleNum - NowPeopleNum}人位
                </Text>
              </View>
              <View
                style={{
                  paddingLeft: 20,
                  paddingRight: 20,
                  height: 30,
                  justifyContent: "center",
                  backgroundColor: "#1a97df",
                  borderRadius: 4
                }}
              >
                <Text
                  style={{ fontSize: 16, color: "#fff", fontWeight: "bold" }}
                >
                  {Charge}元 / 小时
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  renderStarScore() {
    //const people = [1, 1, 1, 1, 1, 1, 1];
    const { portrait = [], StoreScore = 5 } = this.state;
    return (
      <View
        style={{
          flexDirection: "row",
          height: 40,
          alignItems: "center",
          paddingLeft: 6,
          paddingRight: 6,
          borderBottomWidth: 1,
          borderBottomColor: "#e4e4e4"
        }}
      >
        <Text style={{ fontSize: 14, color: "#1a97df", fontWeight: "bold" }}>
          {StoreScore.toFixed(2)}
        </Text>
        <StarScore
          operable={false}
          currentScore={StoreScore}
          style={{ flex: 1, paddingLeft: 6 }}
        />
        {portrait.map((item, i) => (
          <Icon
            size={20}
            source={{ uri: item.UserPhoto }}
            key={i}
            style={{ marginLeft: 4 }}
          />
        ))}
      </View>
    );
  }
  renderProps() {
    const {
      Bath,
      Storage,
      IsAerobic,
      Aerobic,
      IsPower,
      Power,
      IsHealthCare,
      HealthCare
    } = this.state;
    const data = [
      { label: "淋浴", hasKey: Bath },
      { label: "储物", hasKey: Storage },
      { label: "有氧器", hasKey: IsAerobic, valueKey: Aerobic },
      { label: "力量器", hasKey: IsPower, valueKey: Power },
      { label: "康体设备", hasKey: IsHealthCare, valueKey: HealthCare }
    ];
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          height: 40,
          alignItems: "center",
          paddingLeft: 6,
          paddingRight: 6,
          borderBottomWidth: 1,
          borderBottomColor: "#e4e4e4"
        }}
      >
        {data.map(({ label, hasKey, valueKey }) => {
          return (
            <View
              style={[
                {
                  paddingLeft: 4,
                  paddingRight: 4,
                  height: 24,
                  justifyContent: "center",
                  borderWidth: 1,
                  borderColor: "#a1a1a1",
                  borderRadius: 4
                },
                hasKey && { borderColor: "#1a97df" }
              ]}
              key={label}
            >
              <Text
                style={[
                  { fontSize: 14, color: "#a1a1a1" },
                  hasKey && { color: "#1a97df" }
                ]}
              >
                {label}
                {valueKey}
              </Text>
            </View>
          );
        })}
      </View>
    );
  }
  render() {
    const { tableColumns } = this.store;
    const {
      BusinessTimes,
      BusinessWeeks,
      Charge,
      CsTel,
      StoreRemarks,
      StoreImgList = []
    } = this.state;
    const weeks = [
      "星期日",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六"
    ];
    const startWeek = BusinessWeeks ? weeks[BusinessWeeks[0]] : "暂无";
    const endWeek = BusinessWeeks
      ? weeks[BusinessWeeks[BusinessWeeks.length - 1]]
      : "暂无";
    const { timetable } = this.state;
    return (
      <View style={styles.container}>
        <Header
          style={styles.statusBar}
          title={`${StoreImgList.length === 0 ? 0 : 1}/${StoreImgList.length}`}
          RightComponent={
            <Button
              onPress={() => {
                this.setState({
                  isShareBarVisible: true
                });
              }}
            >
              <Icon size={22} source={require("./img/u141.png")} />
            </Button>
          }
          onLeftPress={() => {
            this.props.navigation.dispatch(action.navigate.back());
          }}
        />
        {this.renderHeader()}
        <ScrollView>
          <View style={{ marginTop: 6, flex: 1, backgroundColor: "#f2f2f2" }}>
            {this.renderStarScore()}
            {this.renderProps()}
            <View
              style={{
                flexDirection: "row",
                height: 40,
                alignItems: "center",
                paddingLeft: 6,
                paddingRight: 6,
                borderBottomWidth: 1,
                borderBottomColor: "#e4e4e4"
              }}
            >
              <Text
                style={{ fontSize: 14, color: "#1a97df", fontWeight: "bold" }}
              >
                营业时间：
              </Text>
              <Text style={{ color: "#a1a1a1" }}>
                {startWeek}至{endWeek} {BusinessTimes}
              </Text>
            </View>
            <View style={{ padding: 6 }}>
              <Text
                style={{
                  marginBottom: 6,
                  fontSize: 14,
                  color: "#1a97df",
                  fontWeight: "bold"
                }}
              >
                商家留言：
              </Text>
              <Text style={{ lineHeight: 20 }}> {StoreRemarks}</Text>
            </View>
          </View>
          <Table columns={tableColumns} dataSource={timetable} />
        </ScrollView>

        <View
          style={{
            flexDirection: "row",
            height: 40,
            backgroundColor: "#c6c6c6",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Button
            onPress={() => {
              Linking.openURL(`tel:${CsTel}`);
            }}
            style={{ paddingLeft: 6, alignItems: "center" }}
          >
            <Icon size={16} source={require("./img/u204.png")} />
            <Text
              style={{ fontSize: 14, color: "#1a97df", fontWeight: "bold" }}
            >
              电话咨询
            </Text>
          </Button>
          <Button
            style={{
              backgroundColor: "#1a97df",
              height: "100%",
              justifyContent: "center",
              paddingLeft: 15,
              paddingRight: 15
            }}
            onPress={() => {
              this.props.navigation.dispatch(
                action.navigate.go({ routeName: "Pay" })
              );
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              <Text style={{ fontSize: 16 }}>开始健身</Text>
              <Text style={{ fontSize: 12, marginLeft: 4 }}>
                {Charge}元/小时
              </Text>
            </Text>
          </Button>
        </View>
        {this.renderShareBar()}
      </View>
    );
  }
}
