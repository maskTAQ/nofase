import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import PropTypes from "prop-types";
import moment from "moment";

import { Page, Button, Icon, DataView } from "src/components";
import styles from "./style";
import api from "src/api";
import action from "src/action";

export default class Transacion extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };
  state = {
    discountList: []
  };
  back = () => {
    this.props.navigation.dispatch(action.navigate.back());
  };
  go = () => {
    this.props.navigation.dispatch(
      action.navigate.go({ routeName: "Activity" })
    );
  };
  getDiscountList = PageSize => {
    return api.getDiscountList({ PageSize, PageNum: 20 }).then(res => {
      console.log(res);
      this.setState({
        discountList: res
      });
      return res;
    });
  };
  renderItem(row) {
    const { CardName, EDateTime } = row;
    return (
      <View style={styles.item}>
        <Image source={require("./img/u35.png")} style={styles.jeimgs} />
        <View style={styles.texts}>
          <Text style={{ color: "#000", fontSize: 16 }}>{CardName}</Text>
          <Text style={{ color: "#333", fontSize: 13 }}>
            有效期:{EDateTime
              ? moment(
                  new Date(+/\/Date\(([0-9]+)\)/.exec(EDateTime)[1])
                ).format("YYYY/MM/DD HH:mm")
              : "永不过期"}
          </Text>
        </View>
      </View>
    );
  }
  renderList() {
    return (
      <View style={styles.listContainer}>
        <DataView
          style={styles.list}
          ref={e => (this.discountList = e)}
          isPulldownLoadMore={false}
          ListEmptyComponent={<Text>没有优惠券哦~</Text>}
          getData={this.getDiscountList}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          renderItem={({ item }) => this.renderItem(item)}
        />
      </View>
    );
  }
  render() {
    const { discountList } = this.state;
    const tabMap = [
      [
        "打折卡",
        discountList.filter(item => item.CardName.includes("折")).length,
        0
      ],
      "border",
      [
        "抵现卷",
        discountList.filter(item => item.CardName.includes("优惠")).length,
        1
      ]
    ];
    return (
      <View style={styles.container}>
        <View style={styles.bgContainer}>
          <Image source={require("./img/u3.png")} style={styles.bjimgs} />
        </View>
        <Page
          title="优惠卡包"
          LeftComponent={
            <Button onPress={this.back}>
              <Icon size={20} source={require("./img/u6.png")} />
            </Button>
          }
          headerStyle={{ backgroundColor: "#039deb" }}
          titleStyle={{ color: "#fff" }}
        >
          <View style={styles.discountit}>
            <View style={styles.discountitleft}>
              <Text style={styles.Balance}>比比享优惠</Text>
              <Text style={styles.titBalance}>没脸靠身材</Text>
            </View>
            <View style={styles.discountitright}>
              <Text style={styles.titBalance}>即点即送</Text>
              <Button onPress={this.go} style={styles.huize}>
                点击前往查看规则
              </Button>
            </View>
          </View>

          <View style={styles.containers}>
            <View style={[styles.tabContainer]}>
              {tabMap.map(tab => {
                if (tab === "border") {
                  return <View style={styles.tabItemBorder} key="border" />;
                }
                const [label, money] = tab;
                return (
                  <View style={styles.tabItem} key={label}>
                    <Text style={styles.Itemmoney}>{money}</Text>
                    <Text style={{ color: "#0399e7" }}>{label}</Text>
                  </View>
                );
              })}
            </View>
            {this.renderList()}
          </View>
        </Page>
      </View>
    );
  }
}
