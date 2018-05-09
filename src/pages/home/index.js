import React, { Component } from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import api from "src/api";
import { Alert } from "src/components";
import { WebSocket, Tip } from "src/common";

import action from "src/action";
import styles from "./style";

import {
  DataView,
  Page,
  Button,
  Icon,
  ToggleButton,
  Input,
  StarScore,
  TimeSlideChoose,
  CheckBox,
  Map
} from "src/components";
const Geolocation = require("Geolocation");
const Height = () => <View style={{ height: 10 }} />;

const LogoutModal = ({ logout, isVisible }) => {
  const styles = {
    container: {
      padding: 6,
      borderWidth: 1,
      borderColor: "#1a98e0",
      borderRadius: 6,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(255,255,255,0.4)"
    },
    detail: {
      lineHeight: 30,
      color: "#000"
    },
    button: {
      width: "100%",
      height: 40,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 6,
      backgroundColor: "#1a98e0"
    }
  };
  return (
    <Alert isVisible={isVisible}>
      <View style={styles.container}>
        <Icon size={30} source={require("./img/error.png")} />
        <Text style={styles.detail}>此账号在别处登录!</Text>
        <Button
          onPress={logout}
          style={styles.button}
          textStyle={{ color: "#fff" }}
        >
          退出登录
        </Button>
      </View>
    </Alert>
  );
};
LogoutModal.propTypes = {
  logout: PropTypes.func,
  isVisible: PropTypes.bool
};

const StoreImgIcon = <Icon size={82} source={require("./img/logo.png")} />;
@connect(state => {
  const { auth: { UserId } } = state;
  return { UserId };
})
export default class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    UserId: PropTypes.number
  };
  state = {
    pattern: "list", //['map','list']
    tabActiveIndex: 0,
    chooseTabActiveIndex: NaN,
    chooseTypeValue: 1,
    cityValue: 0,
    distanceValue: 0,
    StoreName: "",

    startDay: 0,
    endDay: 4,

    logoutModalVisible: false
  };
  componentWillMount() {
    this.linkSocket();
    this.getLocation();
    //this.configPush();
  }
  getLocation = async () => {
    const location = await this.getCurrentPosition();
    this.location = location;
  };
  store = {
    chooseType: [
      //{ label: "默认", value: 0 },
      { label: "离我最近", value: 1 },
      { label: "价格最低", value: 2 },
      { label: "人气最高", value: 3 },
      { label: "评分最高", value: 4 },
      { label: "可容纳最多", value: 5 }
    ],
    city: [
      { label: "全部", value: 0 },
      { label: "福田", value: 1 },
      { label: "罗湖", value: 2 },
      { label: "南山", value: 3 },
      { label: "宝安", value: 4 },
      { label: "龙岗", value: 5 },
      { label: "龙岗新区", value: 6 },
      { label: "盐田", value: 7 },
      { label: "南澳大鹏新区", value: 8 },
      { label: "坪山新区", value: 9 }
    ],
    distance: [
      { label: "1km", value: 1 },
      { label: "3km", value: 3 },
      { label: "5km", value: 5 },
      { label: "10km", value: 10 },
      { label: "全城", value: 0 }
    ],
    daysInfo: {
      startDay: 0,
      endDay: 5
    }
  };
  linkSocket = () => {
    const { UserId } = this.props;
    WebSocket.uniqueLoginWebsocket({
      UserId,
      logout: () => {
        this.setState({
          logoutModalVisible: true
        });
      },
      paySuccess: () => {
        Tip.success("充值成功");
        this.props.navigation.dispatch({
          type: "userInfo",
          api: () => {
            return api.getUserInfo();
          },
          promise: true
        });
      },
      payError: () => {
        Tip.fail("充值失败");
      }
    }).catch(e => {});
    WebSocket.QRWebsocket(UserId)
      .then(res => {
        // this.props.navigation.dispatch(
        //   action.navigate.go({ routeName: "Pay" })
        // );
      })
      .catch(e => {
        Tip.fail("连接商家失败");
      });
  };
  logout = () => {
    this.setState(
      {
        logoutModalVisible: false
      },
      () => {
        this.props.navigation.dispatch(action.logout());
        this.props.navigation.dispatch({
          type: "userInfo_result"
        });
      }
    );
  };
  search = async PageIndex => {
    const location = await this.getCurrentPosition();
    this.location = location;
    const {
      distanceValue,
      tabActiveIndex,
      chooseTypeValue,
      StoreName,
      cityValue
    } = this.state;
    const params = {};
    if (tabActiveIndex === 0) {
      Object.assign(params, {
        SeachType: 1, //按店铺搜索
        SeachValue: StoreName,
        UserArea: cityValue === 0 ? "" : this.store.city[cityValue].label,
        Range: distanceValue,
        PageIndex,
        PageNum: 20,
        StoreOrder: chooseTypeValue,
        ...location
      });
    } else {
      const { startDay, endDay } = this.store.daysInfo;
      Object.assign(params, {
        SeachType: 2, //按课程搜索
        SeachValue: StoreName,
        SDay: startDay,
        EDay: endDay,
        UserArea: "",
        Range: distanceValue,
        PageIndex: 1,
        PageNum: 20,
        StoreOrder: chooseTypeValue,
        ...location
      });
    }

    return api.getStoreList(params).then(res => {
      return res.sort((prev, next) => {
        switch (this.state.chooseTypeValue) {
          case 1:
            return prev.Distance - next.Distance;
          case 2:
            return prev.Charge - next.Charge;
          case 3:
            return next.NowPeopleNum - prev.NowPeopleNum;
          case 4:
            return next.StoreScore - prev.StoreScore;
          case 5:
            return next.PeopleNum - prev.PeopleNum;
          default:
            return 0;
        }
      });
    });
  };
  getCurrentPosition() {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        location => {
          resolve({
            userLng: location.coords.longitude,
            userLat: location.coords.latitude
          });
        },
        error => {
          resolve({
            userLng: "",
            userLat: ""
          });
        }
      );
    });
  }
  togglePattern(nextPattern) {
    const { pattern } = this.state;
    if (pattern !== nextPattern) {
      this.setState({
        pattern: nextPattern
      });
    }
  }
  goStoreDetail = Id => {
    this.props.navigation.dispatch(
      action.navigate.go({
        routeName: "StoreDetail",
        params: {
          Id
        }
      })
    );
  };
  navgation = data => {
    const { Lat, Lng } = data;
    this.props.navigation.dispatch(
      action.navigate.go({
        routeName: "Navigation",
        params: { Lat, Lng }
      })
    );
  };
  renderMapPattern = () => {
    return (
      <Page
        title="地图模式"
        LeftComponent={
          <Button
            onPress={() => {
              this.togglePattern("list");
            }}
          >
            <Icon size={20} source={require("./img/list.png")} />
          </Button>
        }
        RightComponent={
          <Button
            onPress={() => {
              this.togglePattern("list");
            }}
          >
            <Icon size={16} source={require("./img/search.png")} />
          </Button>
        }
      >
        <Map
          onStoreTap={id => {
            this.goStoreDetail(id);
          }}
          location={this.location}
        />
        <ToggleButton />
      </Page>
    );
  };
  changeTab(NextTabActiveIndex) {
    const { tabActiveIndex } = this.state;
    if (NextTabActiveIndex !== tabActiveIndex) {
      this.setState({ tabActiveIndex: NextTabActiveIndex });
    }
  }
  renderChooseModal() {
    const {
      chooseTabActiveIndex,
      tabActiveIndex,
      chooseTypeValue,
      cityValue,
      distanceValue
    } = this.state;
    const { chooseType, city, distance } = this.store;

    if (isNaN(chooseTabActiveIndex)) {
      return null;
    }
    const { header, chooseWrapper } = styles;
    const TimeSlideChooseHeight = 44;
    const modalLocationTop = [
      header.height + chooseWrapper.height,
      header.height + chooseWrapper.height + TimeSlideChooseHeight
    ];

    switch (String(chooseTabActiveIndex)) {
      case "0":
        return (
          <View
            style={[
              styles.chooseModal,
              { top: modalLocationTop[tabActiveIndex], flexDirection: "row" }
            ]}
          >
            <View
              style={{ flex: 1, borderRightWidth: 1, borderRightColor: "#ccc" }}
            >
              <CheckBox
                data={city}
                selected={cityValue}
                itemStyle={styles.checkboxItem}
                itemActiveStyle={styles.checkboxActiveItem}
                labelStyle={styles.checkboxItemLabel}
                selectedComponent={
                  <Icon
                    size={20}
                    source={require("./img/selected.png")}
                    style={styles.checkboxItemIcon}
                  />
                }
                onChangeValue={v => {
                  this.setState(
                    {
                      distanceValue: v !== 0 ? "全城" : 0,
                      cityValue: v,
                      chooseTabActiveIndex: NaN
                    },
                    () => {
                      this.storeListRef.triggerRefresh();
                    }
                  );
                }}
              />
            </View>
            <View style={{ flex: 1 }}>
              {/*
              在除附近外 都默认为全城
            */}
              <CheckBox
                data={
                  cityValue === 0
                    ? distance
                    : [{ label: "全城", value: "全城" }]
                }
                selected={distanceValue}
                itemStyle={styles.checkboxItem}
                itemActiveStyle={styles.checkboxActiveItem}
                labelStyle={styles.checkboxItemLabel}
                selectedComponent={
                  <Icon
                    size={20}
                    source={require("./img/selected.png")}
                    style={styles.checkboxItemIcon}
                  />
                }
                onChangeValue={v => {
                  this.setState({
                    distanceValue: v,
                    chooseTabActiveIndex: NaN
                  });
                }}
              />
            </View>
          </View>
        );
      case "1":
      default:
        return (
          <View
            style={[
              styles.chooseModal,
              { top: modalLocationTop[tabActiveIndex] }
            ]}
          >
            <CheckBox
              data={chooseType}
              selected={chooseTypeValue}
              itemStyle={styles.checkboxItem}
              itemActiveStyle={styles.checkboxActiveItem}
              labelStyle={styles.checkboxItemLabel}
              selectedComponent={
                <Icon
                  size={20}
                  source={require("./img/selected.png")}
                  style={styles.checkboxItemIcon}
                />
              }
              onChangeValue={v => {
                this.setState(
                  {
                    chooseTypeValue: v,
                    chooseTabActiveIndex: NaN
                  },
                  () => {
                    this.storeListRef.triggerRefresh();
                  }
                );
              }}
            />
          </View>
        );
    }
  }
  renderChoose() {
    const { chooseTabActiveIndex, cityValue, chooseTypeValue } = this.state;
    const { city, chooseType } = this.store;

    const changeChooseTabActiveIndex = i => {
      if (i === chooseTabActiveIndex) {
        return this.setState({
          chooseTabActiveIndex: NaN
        });
      }
      return this.setState({
        chooseTabActiveIndex: i
      });
    };
    const buttonMap = [
      {
        label: city[cityValue].label,
        onPress: changeChooseTabActiveIndex
      },
      "border",
      {
        label: chooseType[chooseTypeValue - 1].label,
        onPress: changeChooseTabActiveIndex
      }
    ];
    const iconSource = require("./img/arrow_bottom.png");
    return (
      <View style={styles.chooseWrapper}>
        {buttonMap.map((item, i) => {
          if (item === "border") {
            return <View style={styles.chooseItemBorder} key="border" />;
          }
          const { label, onPress } = item;
          i = i ? 1 : 0;
          const isActive = chooseTabActiveIndex === i;
          return (
            <Button
              onPress={() => {
                onPress(i);
              }}
              key={label}
              style={[
                styles.chooseItemButton,
                isActive
                  ? { borderBottomWidth: 1, borderColor: "#2fc2d9" }
                  : null
              ]}
            >
              <Text style={styles.chooseItemText}>{label}</Text>
              <Icon
                size={10}
                source={iconSource}
                iconStyle={{
                  transform: [{ rotate: isActive ? "90deg" : "270deg" }]
                }}
              />
            </Button>
          );
        })}
      </View>
    );
  }
  renderHeader() {
    const { tabActiveIndex, StoreName } = this.state;
    const tabMap = ["按店铺搜索", "按课程搜索"];
    return (
      <View style={styles.header}>
        <View style={styles.tabContainer}>
          {tabMap.map((tab, i) => (
            <Button
              onPress={() => {
                this.changeTab(i);
              }}
              style={[
                styles.tab,
                tabActiveIndex === i ? styles.tabActive : null
              ]}
              textStyle={[
                styles.tabLabel,
                tabActiveIndex === i ? styles.tabLabelActive : null
              ]}
              key={tab}
            >
              {tab}
            </Button>
          ))}
          <View style={{ width: styles.search.width }} />
        </View>
        <View style={styles.searchContainer}>
          <View style={styles.searchInputWrapper}>
            <Icon
              size={20}
              source={require("./img/search_list.png")}
              style={styles.searchInputIcon}
            />
            <Input
              value={StoreName}
              onChangeText={v => this.setState({ StoreName: v })}
              style={styles.searchInput}
              placeholder="输入店铺/街道名称"
            />
          </View>
          <Button
            onPress={() => {
              this.storeListRef.triggerRefresh();
            }}
            style={styles.search}
            textStyle={styles.searchLabel}
          >
            搜索
          </Button>
        </View>
      </View>
    );
  }
  renderItem(row, i) {
    const {
      StoreName,
      NowPeopleNum,
      Distance,
      StoreScore,
      NowCurriculum,
      Address,
      storeAddrDes,
      Charge,
      Id,
      StoreImg,
      PeopleNum
    } = row;
    const icon = (StoreImg || "").includes("https") ? (
      <Icon size={82} source={{ uri: StoreImg }} />
    ) : (
      StoreImgIcon
    );

    return (
      <View style={styles.item}>
        <Button onPress={() => this.goStoreDetail(Id)} style={styles.itemTop}>
          {icon}

          <View style={styles.itemDetail}>
            <Text style={styles.itemName}>{StoreName || "暂无店铺名"}</Text>
            <View style={styles.itemDetailCenter}>
              <Text style={styles.itemDistance}>
                距离{Distance.toFixed(2)}Km
              </Text>
              <View style={styles.lessionButton}>
                <Text style={styles.lessionText}>
                  课程:{NowCurriculum || "暂无"}
                </Text>
                <Icon size={20} source={require("./img/right.png")} />
              </View>
            </View>
            <View style={styles.itemDetailBottom}>
              <Text style={styles.itemAddr} numberOfLines={2}>
                {String(Address || "") + String(storeAddrDes || "") ||
                  "暂无地址"}
              </Text>
              <Button
                onPress={() => this.navgation(row)}
                style={styles.navgationButton}
              >
                <Icon size={16} source={require("./img/natvgation.png")} />
                <Text style={styles.navgationText}>导航</Text>
              </Button>
            </View>
          </View>
        </Button>
        <View style={styles.itemBottom}>
          <Text style={styles.evaluateLabel}>评价:</Text>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <StarScore operable={false} currentScore={StoreScore} />
            <Text style={styles.evaluateValue}>{StoreScore.toFixed(2)}</Text>
          </View>
          <Text style={styles.price}>{Charge || "0"}元/小时</Text>
        </View>
        <View style={styles.tagWrapper}>
          <Text style={styles.tagText}>
            {Number(PeopleNum) - NowPeopleNum}人
          </Text>
        </View>
      </View>
    );
  }
  renderList() {
    return (
      <View style={styles.list}>
        <DataView
          ref={e => (this.storeListRef = e)}
          getData={this.search}
          ItemSeparatorComponent={Height}
          renderItem={({ item, index }) => this.renderItem(item, index)}
        />
        <ToggleButton />
      </View>
    );
  }
  renderListPattern() {
    const { tabActiveIndex, logoutModalVisible } = this.state;
    const { startDay, endDay } = this.store.daysInfo;
    return (
      <Page
        title="列表模式"
        LeftComponent={
          <Button
            onPress={() => {
              this.togglePattern("map");
            }}
          >
            <Icon size={20} source={require("./img/map.png")} />
          </Button>
        }
        // RightComponent={
        //   <Button
        //     style={{ flexDirection: "row", alignItems: "center" }}
        //   >
        //     <Text style={{ color: "#fff" }}>{city[cityValue].label}</Text>
        //     <Icon size={20} source={require("./img/u305.png")} />
        //   </Button>
        // }
      >
        {this.renderHeader()}
        {!!tabActiveIndex && (
          <TimeSlideChoose
            startIndex={startDay}
            endIndex={endDay}
            onDayChange={({ startIndex, endIndex }) => {
              Object.assign(this.store.daysInfo, {
                startDay: startIndex,
                endDay: endIndex
              });
            }}
          />
        )}
        {this.renderChoose()}
        {this.renderList()}
        {this.renderChooseModal()}
        <LogoutModal logout={this.logout} isVisible={logoutModalVisible} />
      </Page>
    );
  }
  render() {
    const { pattern } = this.state;

    if (pattern === "map") {
      return this.renderMapPattern();
    }
    return this.renderListPattern();
  }
}
