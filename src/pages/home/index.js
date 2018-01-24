import React, { Component } from "react";
//import { View, Text, Image } from "react-native";

//import styles from './style';
import { Page, Button, Icon } from "src/components";

export default class Home extends Component {
  state = {
    pattern: "map" //['map','list']
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
      />
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
      />
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
