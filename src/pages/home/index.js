import React, { Component } from "react";
import { Text, View, Platform, Linking, StatusBar, Image } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Swiper from "react-native-swiper";

import api from "src/api";
import action from "src/action";
import { version } from "src/config";
import { computeSize } from "src/common";
import { UpdateModal } from "src/components";
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
  CheckBox
} from "src/components";

const Height = () => <View style={{ height: 10 }} />;

const storeContentBg = (
  <Image style={{ flex: 1 }} source={require("./img/bg.png")} />
);
const freeIcon = (
  <Image style={styles.free} source={require("./img/free.png")} />
);
@connect(state => {
  const { auth: { UserId }, location } = state;
  return { UserId, location };
})
export default class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    UserId: PropTypes.number,
    location: PropTypes.object
  };
  state = {
    pattern: "list", //['map','list']
    searchTypeIndex: 0,
    chooseTabActiveIndex: NaN,
    chooseTypeValue: 1,
    cityValue: 0,
    distanceValue: 0,
    StoreName: "",

    startDay: 0,
    endDay: 4,

    isUpdateModalVisible: false,
    appUpdateInfo: {},

    bannerData: []
  };
  componentWillMount() {
    this.getNewApp();
    this.getBanner();
  }
  componentWillReceiveProps(nextProps) {
    const { location: nextLoadtion } = nextProps;
    const { location: preLoadtion } = this.props;

    if (!preLoadtion.longitude && nextLoadtion.longitude) {
      this.search(1);
    }
  }
  getNewApp() {
    api
      .getNewApp({
        VerType: Platform.select({
          ios: 2,
          android: 1
        })
      })
      .then(res => {
        const { appVersion, appUrl, appSize = 0 } = res;
        if (this.versionToNum(version) < this.versionToNum(appVersion)) {
          this.setState({
            isUpdateModalVisible: true,
            appUpdateInfo: { appVersion, appUrl, appSize }
          });
        }
      });
  }
  getBanner() {
    const { location } = this.props;
    api
      .getBanner({
        userLat: location.latitude || 0,
        userLng: location.longitude || 0
      })
      .then(res => {
        this.setState({
          bannerData: res
        });
        //console.log(res);
      });
  }
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
  update = () => {
    const { appUrl } = this.state.appUpdateInfo;
    let url = "";
    if (Platform.OS === "ios") {
      url = `https://itunes.apple.com/cn/app/%E6%B2%A1%E8%84%B8%E8%BF%90%E5%8A%A8-%E5%95%86%E5%AE%B6%E7%AB%AF/id${appUrl}`;
    } else {
      url = appUrl;
    }
    Linking.openURL(url);
  };
  versionToNum(a) {
    a = a.toString();
    //也可以这样写 const c=a.split(/\./);
    const c = a.split(".");
    const num_place = ["", "0", "00", "000", "0000"],
      r = num_place.reverse();
    for (let i = 0; i < c.length; i++) {
      const len = c[i].length;
      c[i] = r[len] + c[i];
    }
    const res = c.join("");
    return res;
  }

  search = PageIndex => {
    const { location } = this.props;
    const {
      distanceValue,
      searchTypeIndex,
      chooseTypeValue,
      StoreName,
      cityValue
    } = this.state;

    const params = {
      SeachValue: StoreName,
      Range: distanceValue,
      StoreOrder: chooseTypeValue,
      PageIndex,
      PageNum: 20,
      userLat: location.latitude,
      userLng: location.longitude
    };
    if (searchTypeIndex === 0) {
      Object.assign(params, {
        SeachType: 1, //按店铺搜索
        UserArea: cityValue === 0 ? "" : this.store.city[cityValue].label
      });
    } else {
      const { startDay, endDay } = this.store.daysInfo;
      Object.assign(params, {
        SeachType: 2, //按课程搜索
        SDay: startDay,
        EDay: endDay,
        UserArea: ""
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
    const { latitude: userLat, longitude: userLng } = this.props.location;

    this.props.navigation.dispatch(
      action.navigate.go({
        routeName: "Navigation",
        params: { Lat, Lng, userLat, userLng }
      })
    );
  };

  changeTab(NextTabActiveIndex) {
    const { searchTypeIndex } = this.state;
    if (NextTabActiveIndex !== searchTypeIndex) {
      this.setState({ searchTypeIndex: NextTabActiveIndex }, () => {
        this.storeListRef.triggerRefresh();
      });
    }
  }

  renderHeader() {
    const { searchTypeIndex, StoreName } = this.state;
    const searchType = ["店铺", "课程"];
    return (
      <View style={styles.header}>
        <Button
          style={styles.mapPatternButton}
          onPress={() => {
            this.props.navigation.dispatch(
              action.navigate.go({
                routeName: "MapPattern"
              })
            );
          }}
        />
        <View style={styles.searchContainer}>
          <Button style={styles.searchTypeBox}>
            <Text style={styles.searchTypeValue}>
              {searchType[searchTypeIndex]}
            </Text>
            <Image
              style={styles.searchTypeIcon}
              source={require("./img/dropdown.png")}
            />
          </Button>
          <View style={styles.searchInputWrapper}>
            <Input
              value={StoreName}
              onChangeText={v => this.setState({ StoreName: v })}
              style={styles.searchInput}
              placeholder="通过课程/店铺名称搜索"
            />
          </View>
          <Button
            onPress={() => {
              this.storeListRef.triggerRefresh();
            }}
            style={styles.searchButton}
          >
            <Icon
              size={computeSize(30)}
              source={require("./img/search.png")}
              style={[
                styles.searchInputIcon
                //Platform.OS === "android" && { paddingTop: 4 }
              ]}
            />
          </Button>
        </View>
      </View>
    );
  }
  renderSwiper() {
    const { bannerData } = this.state;
    //const data = ['https://www.baidu.com/img/bd_logo1.png', 'https://www.baidu.com/img/bd_logo1.png', 'https://www.baidu.com/img/baidu_jgylogo3.gif'];
    return (
      <View style={styles.swiperBox}>
        <Swiper autoplay>
          {bannerData.map((item, i) => {
            const { ImgUrl } = item;
            return (
              <Button
                onPress={() => {
                  this.props.navigation.dispatch(
                    action.navigate.go({
                      routeName: "Web",
                      params: item
                    })
                  );
                }}
                style={styles.swiperItemBox}
                key={ImgUrl}
              >
                <Image style={styles.swiperItemImg} source={{ uri: ImgUrl }} />
              </Button>
            );
          })}
        </Swiper>
      </View>
    );
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
      //"border",
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
              style={styles.chooseItemButton}
            >
              <Text style={styles.chooseItemText}>{label}</Text>
              <Icon
                size={computeSize(10)}
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
  renderChooseModal() {
    const {
      chooseTabActiveIndex,
      searchTypeIndex,
      chooseTypeValue,
      cityValue,
      distanceValue
    } = this.state;
    const { chooseType, city, distance } = this.store;

    if (isNaN(chooseTabActiveIndex)) {
      return null;
    }
    const { header, swiperBox, chooseWrapper } = styles;
    const TimeSlideChooseHeight = 44;
    const modalLocationTop = [
      header.height + swiperBox.height + chooseWrapper.height,
      header.height +
        swiperBox.height +
        chooseWrapper.height +
        TimeSlideChooseHeight
    ];

    switch (String(chooseTabActiveIndex)) {
      case "0":
        return (
          <View
            style={[
              styles.chooseModal,
              { top: modalLocationTop[searchTypeIndex], flexDirection: "row" }
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
                    size={computeSize(20)}
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
                    size={computeSize(20)}
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
              { top: modalLocationTop[searchTypeIndex] }
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
                  size={computeSize(20)}
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
  renderList() {
    return (
      <View style={styles.list}>
        <DataView
          ref={e => (this.storeListRef = e)}
          getData={this.search}
          ItemSeparatorComponent={Height}
          ListEmptyComponentText="更多目标商家正在洽谈合作中"
          renderItem={({ item, index }) => this.renderItem(item, index)}
        />
        <ToggleButton />
      </View>
    );
  }
  renderItem(row, i) {
    const {
      Contract,
      StoreName,
      NowCurriculum,
      NowPeopleNum,
      Distance,
      StoreScore,
      Address,
      storeAddrDes,
      Charge,
      Id,
      StoreImg,
      PeopleNum,
      IsFristFree
    } = row;
    return (
      <Button onPress={() => this.goStoreDetail(Id)} style={styles.item}>
        <View style={styles.itemBg}>
          <Image style={{ flex: 1 }} source={{ uri: Contract }} />
          <View style={styles.storeContentBg}>{storeContentBg}</View>
        </View>
        <View style={styles.itemContent}>
          <View style={[styles.capsule, styles.capsuleO]}>
            <Text style={styles.capsuleText}>{NowCurriculum}</Text>
          </View>
          <View style={[styles.capsule, styles.capsuleT]}>
            <Text style={styles.capsuleText}>
              当前可容纳{Number(PeopleNum) - NowPeopleNum}人
            </Text>
          </View>
          <View style={styles.storeDetail}>
            <View style={styles.storeImg}>
              <Image
                style={{ flex: 1 }}
                source={{
                  uri: StoreImg
                }}
              />
            </View>
            <View style={styles.storeContent}>
              <View style={styles.storeName}>
                <Text style={styles.storeNameText}>{StoreName}</Text>
                <Text style={styles.priceText}>{Charge || "0"}元/小时</Text>
              </View>
              <View style={styles.storeCenter}>
                <View style={styles.storeDistance}>
                  <Text style={styles.storeDistanceText}>
                    距离{Distance.toFixed(2)}Km
                  </Text>
                </View>
                <View style={styles.storeScoreBox}>
                  <StarScore operable={false} currentScore={StoreScore} />
                  <Text style={styles.storeScoreText}>{StoreScore}分</Text>
                </View>
              </View>
              <View style={styles.storeBottom}>
                <View style={styles.storeAddr}>
                  <Text style={styles.storeAddrText} numberOfLines={1}>
                    {String(Address || "") + String(storeAddrDes || "") ||
                      "暂无地址"}
                  </Text>
                </View>
                <Button
                  onPress={() => this.navgation(row)}
                  style={styles.navgationButton}
                >
                  <Icon
                    size={computeSize(16)}
                    source={require("./img/natvgation.png")}
                  />
                </Button>
              </View>
            </View>
          </View>
        </View>
        {IsFristFree && freeIcon}
      </Button>
    );
  }

  renderListPattern() {
    const { searchTypeIndex } = this.state;
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
            <Icon size={computeSize(20)} source={require("./img/map.png")} />
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
        {!!searchTypeIndex && (
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
      </Page>
    );
  }
  renderHome() {
    const { searchTypeIndex } = this.state;
    const { startDay, endDay } = this.store.daysInfo;
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={styles.header.backgroundColor}
          translucent={true}
          barStyle="light-content"
        />
        {this.renderHeader()}
        {this.renderSwiper()}
        {!!searchTypeIndex && (
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
        {this.renderChooseModal()}
        {this.renderList()}
      </View>
    );
  }
  render() {
    const { isUpdateModalVisible, appUpdateInfo } = this.state;
    return (
      <View style={{ flex: 1 }}>
        {this.renderHome()}
        <UpdateModal
          ok={this.update}
          appUpdateInfo={appUpdateInfo}
          close={() => {
            this.setState({
              isUpdateModalVisible: false
            });
          }}
          isVisible={isUpdateModalVisible}
        />
      </View>
    );
  }
}
