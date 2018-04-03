import React, { Component } from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import api from "src/api";
import { WebSocket, Tip } from "src/common";
import { DataView } from "src/components";
import action from "src/action";
import styles from "./style";

const Geolocation = require("Geolocation");
import {
  Page,
  Button,
  Icon,
  ToggleButton,
  Input,
  StarScore,
  TimeSlideChoose,
  CheckBox,
  Map,
  Picker
} from "src/components";

const Height = () => <View style={{ height: 10 }} />;

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

    isPickerVisible: false,

    startDay: 0,
    endDay: 4
  };
  componentWillMount() {
    this.linkSocket();
  }
  store = {
    chooseType: [
      { label: "离我最近", value: 1 },
      { label: "价格最低", value: 2 },
      { label: "人气最高", value: 3 },
      { label: "评分最高", value: 4 },
      { label: "可容纳最多", value: 5 }
    ],
    city: [
      { label: "附近", value: 0 },
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
    WebSocket.result(UserId)
      .then(res => {
        // this.props.navigation.dispatch(
        //   action.navigate.go({ routeName: "Pay" })
        // );
      })
      .catch(e => {
        Tip.fail("连接商家失败");
      });
  };
  search = async PageIndex => {
    const location = await this.getCurrentPosition();
    const {
      distanceValue,
      tabActiveIndex,
      chooseTypeValue,
      StoreName
    } = this.state;
    const params = {};
    if (tabActiveIndex === 0) {
      Object.assign(params, {
        SeachType: 1, //按店铺搜索
        SeachValue: StoreName,
        UserArea: "",
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
      return res;
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
  goStoreDetail = (Id, i) => {
    const { dataSource } = this.storeListRef.state;
    this.props.navigation.dispatch(
      action.navigate.go({
        routeName: "StoreDetail",
        params: { Id, storeNum: dataSource.length, currentIndex: i }
      })
    );
  };
  renderMapPattern() {
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
            <Icon size={20} source={require("./img/search.png")} />
          </Button>
        }
      >
        <Map />
        <ToggleButton />
      </Page>
    );
  }
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
                  if (v !== 0) {
                    this.setState({
                      distanceValue: "全城"
                    });
                  } else {
                    this.setState({
                      distanceValue: 0
                    });
                  }
                  this.setState({ cityValue: v, chooseTabActiveIndex: NaN });
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
                  this.setState({ distanceValue: v });
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
                this.setState({
                  chooseTypeValue: v,
                  chooseTabActiveIndex: NaN
                });
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
        label: chooseType[chooseTypeValue].label,
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
    const icon = require("./img/u42.png");
    const {
      StoreName,
      Distance,
      NowCurriculum,
      Address,
      evaluate = 4.3,
      Charge,
      Id
    } = row;
    return (
      <View style={styles.item}>
        <View style={styles.itemTop}>
          <Icon size={82} source={icon} />
          <View style={styles.itemDetail}>
            <Text style={styles.itemName}>{StoreName || "暂无店铺名"}</Text>
            <View style={styles.itemDetailCenter}>
              <Text style={styles.itemDistance}>
                距离：{Distance.toFixed(0)}
              </Text>
              <Button
                style={styles.lessionButton}
                onPress={() => this.goStoreDetail(Id, i)}
              >
                <Text style={styles.lessionText}>
                  课程：{NowCurriculum || "暂无课程"}
                </Text>
                <Icon size={20} source={require("./img/right.png")} />
              </Button>
            </View>
            <View style={styles.itemDetailBottom}>
              <Text style={styles.itemAddr} numberOfLines={2}>
                {Address || "暂无地址"}
              </Text>
              <Button style={styles.navgationButton}>
                <Icon size={16} source={require("./img/natvgation.png")} />
                <Text style={styles.navgationText}>导航</Text>
              </Button>
            </View>
          </View>
        </View>
        <View style={styles.itemBottom}>
          <Text style={styles.evaluateLabel}>评价:</Text>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <StarScore operable={false} currentScore={evaluate} />
            <Text style={styles.evaluateValue}>{evaluate}</Text>
          </View>
          <Text style={styles.price}>{Charge || "0"}元/小时</Text>
        </View>
        <View style={styles.tagWrapper}>
          <Text style={styles.tagText}>20人</Text>
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
          ListEmptyComponent={<Text>暂时没有数据哦</Text>}
          ItemSeparatorComponent={Height}
          renderItem={({ item, index }) => this.renderItem(item, index)}
        />
        <ToggleButton />
      </View>
    );
  }
  renderListPattern() {
    const { tabActiveIndex, cityValue, isPickerVisible } = this.state;
    const { city } = this.store;
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
        RightComponent={
          <Button
            onPress={() => {
              this.setState({
                isPickerVisible: !isPickerVisible
              });
            }}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Text style={{ color: "#fff" }}>{city[cityValue].label}</Text>
            <Icon size={20} source={require("./img/u305.png")} />
          </Button>
        }
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
        <Picker
          visible={isPickerVisible}
          data={city}
          onValueSelect={v => {
            if (v !== 0) {
              this.setState({
                distanceValue: "全城"
              });
            } else {
              this.setState({
                distanceValue: 0
              });
            }
            this.setState({ cityValue: v, isPickerVisible: false });
          }}
          onRequestClose={() => {
            this.setState({
              isPickerVisible: false
            });
          }}
        />
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
