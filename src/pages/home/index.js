import React, { Component } from "react";
import { Text, View, FlatList } from "react-native";

import styles from "./style";
import { Page, Button, Icon, ToggleButton, Input } from "src/components";

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
        <Text>12</Text>
        <ToggleButton />
      </Page>
    );
  }
  changeTab(tabActiveIndex) {
    this.setState({ tabActiveIndex });
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
            <Input style={styles.searchInput} placeholder="输入店铺/街道名称" />
          </View>
          <Button style={styles.search} textStyle={styles.searchLabel}>
            搜索
          </Button>
        </View>
      </View>
    );
  }
  renderItem(row) {
    const { icon, name, distance, lession, addr, evaluate } = row;
    return (
      <View style={styles.item}>
        <View style={styles.itemTop}>
          <Icon size={62} source={icon} />
          <View style={styles.itemDetail}>
            <Text style={styles.itemName}>{name}</Text>
            <Text style={styles.itemDistance}>{distance}</Text>
            <Text style={styles.itemAddr} numberOfLines={2}>
              {addr}
              {lession}
              {evaluate}
            </Text>
          </View>
        </View>
      </View>
    );
  }
  renderList() {
    const data = [
      {
        icon: require("./img/u42.png"),
        name: "优思健身工作室(前海店)",
        distance: "234m",
        lession: "瑜伽健身",
        addr: "深南大道与前海教会处振业星海商业广场3101A",
        evaluate: 4.3
      }
    ];
    return (
      <View style={styles.list}>
        <FlatList
          data={data}
          ListEmptyComponent={<Text>暂时没有数据哦</Text>}
          renderItem={({ item }) => this.renderItem(item)}
          keyExtractor={item => item.name}
        />
      </View>
    );
  }
  renderListPattern() {
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
            <Input />
          </Button>
        }
        RightComponent={<Text style={{ color: "#fff" }}>罗湖区</Text>}
      >
        {this.renderHeader()}
        {this.renderList()}
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
