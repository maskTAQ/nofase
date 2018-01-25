import React, { Component } from "react";
import { Text, View } from "react-native";

import styles from "./style";
import { Page, Button, Icon, ToggleButton } from "src/components";
//import style from "../recharge/style";

export default class Home extends Component {
  state = {
    pattern: "list", //['map','list']
    tabActiveIndex: 0
  };
  togglePattern(pattern) {
    this.setState({
      pattern
    });
  }
  renderMap() {
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
        <Text>12</Text>
        <ToggleButton />
      </Page>
    );
  }
  renderHeader() {
    const { tabActiveIndex } = this.state;
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
              Text={[
                styles.tabLabel,
                tabActiveIndex === i ? styles.tabLabelActive : null
              ]}
              key={tab}
            >
              {tab}
            </Button>
          ))}
          <View style={styles.search} />
        </View>
      </View>
    );
  }
  renderList() {
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
        RightComponent={<Text style={{ color: "#fff" }}>罗湖区</Text>}
      >
        {this.renderHeader()}
      </Page>
    );
  }
  render() {
    const { pattern } = this.state;

    if (pattern === "map") {
      return this.renderMap();
    }
    return this.renderList();
  }
}
