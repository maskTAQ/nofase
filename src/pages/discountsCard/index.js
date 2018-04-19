import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import PropTypes from "prop-types";

import { Page, Button, Icon, DataView } from "src/components";
import styles from "./style";
import api from "src/api";
import action from "src/action";

export default class Transacion extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };
  state = {};
  back = () => {
    this.props.navigation.dispatch(action.navigate.back());
  };
  getDiscountList = PageSize => {
    return api.getDiscountList({ PageSize, PageNum: 20 });
  };
  renderItem(row) {
    const { CardName, EDateTime } = row;
    return (
      <View style={styles.item}>
        <Image source={require("./img/u35.png")} style={styles.jeimgs} />
        <View style={styles.texts}>
          <Text style={{ color: "#000", fontSize: 16 }}>{CardName}</Text>
          <Text style={{ color: "#333", fontSize: 13 }}>
            有效期:{EDateTime}
          </Text>
        </View>
      </View>
    );
  }
  renderList() {
    return (
      <DataView
        style={styles.list}
        ref={e => (this.discountList = e)}
        ListEmptyComponent={<Text>没有优惠券哦~</Text>}
        getData={this.getDiscountList}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        renderItem={({ item }) => this.renderItem(item)}
      />
    );
  }
  render() {
    const cardNum = this.discountList
      ? this.discountList.state.dataSource.length
      : 0;
    const tabMap = [["打折卡", cardNum, 0], "border", ["抵现卷", cardNum, 1]];
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
              <Button style={styles.huize}>点击前往查看规则</Button>
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
