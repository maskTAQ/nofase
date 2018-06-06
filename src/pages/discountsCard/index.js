import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import PropTypes from "prop-types";
import moment from "moment";

import { computeSize } from "src/common";
import { Page, Button, Icon, DataView } from "src/components";
import styles from "./style";
import api from "src/api";
import action from "src/action";
const itemIcon = (
  <Icon source={require("./img/u35.png")} size={computeSize(24)} />
);
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
        <View style={styles.itemIconWrapper}>{itemIcon}</View>
        <View style={styles.itemSeparator} />
        <View style={styles.itemContent}>
          <Text style={styles.itemContentText}>{CardName}</Text>
          <Text style={styles.itemContentText}>
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
          ListEmptyComponent={
            <View style={styles.noData}>
              <Text>没有优惠券哦~</Text>
            </View>
          }
          getData={this.getDiscountList}
          ItemSeparatorComponent={() => (
            <View style={{ height: computeSize(10) }} />
          )}
          renderItem={({ item }) => this.renderItem(item)}
        />
      </View>
    );
  }
  renderHeader() {
    return (
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerLeftText}>比比享优惠</Text>
          <Text style={styles.headerLeftText}>没脸靠身材</Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.headerRightText}>即点即送</Text>
          {/*
            <Button style={styles.lookButton}>立即查看</Button>
            */}
        </View>
      </View>
    );
  }
  renderCenter() {
    const { discountList } = this.state;
    const map = [
      {
        label: "打折卡",
        value: discountList.filter(item => item.CardName.includes("折")).length
      },
      "separator",
      {
        label: "抵现卷",
        value: discountList.filter(item => !item.CardName.includes("折")).length
      }
    ];
    return (
      <View style={styles.centerWrapper}>
        <View style={styles.center}>
          {map.map(item => {
            if (item === "separator") {
              return <View style={styles.centerSeparator} key="separator" />;
            } else {
              const { label, value } = item;
              return (
                <View style={styles.centerItem} key={label}>
                  <Text style={styles.centerItemValue}>{value}张</Text>
                  <Text style={styles.centerItemLabel}>{label}</Text>
                </View>
              );
            }
          })}
        </View>
      </View>
    );
  }
  render() {
    return (
      <Page
        title="优惠卡包"
        LeftComponent={
          <Button onPress={this.back}>
            <Icon size={computeSize(20)} source={require("./img/u6.png")} />
          </Button>
        }
        headerStyle={{ backgroundColor: "#039deb" }}
        titleStyle={{ color: "#fff" }}
      >
        <View style={styles.container}>
          <View style={styles.bg}>
            <View style={styles.bgImgBox}>
              <Image
                source={require("./img/u3.png")}
                resizeMode="stretch"
                style={styles.bgImg}
              />
            </View>
            <View style={styles.bgContent} />
          </View>
          <View style={styles.content}>
            {this.renderHeader()}
            {this.renderCenter()}
            {this.renderList()}
          </View>
        </View>
      </Page>
    );
  }
}
