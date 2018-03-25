import React, { Component } from "react";
import { View, Text, Image, FlatList } from "react-native";
import PropTypes from "prop-types";

import { Button, Icon, Page, ShareModal } from "src/components";
import styles from "./style";

export default class Fitnessrecord extends Component {
  static propTypes = {
    demo: PropTypes.any
  };
  state = {
    isShareModalVisible: false
  };
  renderItem(row) {
    const { type, price, time } = row;
    return (
      <Button
        onPress={() => {
          this.setState({
            isShareModalVisible: true
          });
        }}
        style={styles.item}
      >
        <View style={styles.itemLeft}>
          <Text style={styles.itemTime}>{time}</Text>
          <Text style={styles.itemDetail}>
            {type} | {" " + price}
          </Text>
        </View>
        <View style={styles.itemRight}>
          <Icon
            size={20}
            source={require("./img/jiantou.png")}
            style={styles.rightimg}
          />
        </View>
      </Button>
    );
  }
  renderList() {
    const data = [
      {
        type: "1江南健身房（车公庙店）",
        time: "2017-9-10 23:25",
        price: "12.00元"
      },
      {
        type: "2江南健身房（车公庙店）",
        time: "2017-9-10 23:25",
        price: "12.00元"
      },
      {
        type: "3江南健身房（车公庙店）",
        time: "2017-9-10 23:25",
        price: "12.00元"
      },
      {
        type: "4江南健身房（车公庙店）",
        time: "2017-9-10 23:25",
        price: "12.00元"
      }
    ];
    return (
      <FlatList
        style={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        keyExtractor={(item, index) => index}
        data={data}
        renderItem={({ item }) => this.renderItem(item)}
      />
    );
  }
  render() {
    const { isShareModalVisible } = this.state;
    return (
      <Page title="健身记录">
        <View style={styles.contianer}>
          <View>
            <Image
              source={require("./img/banner.png")}
              style={styles.banner}
              resizeMode="stretch"
            />
          </View>
          {this.renderList()}
          <View />
          <ShareModal
            isVisible={isShareModalVisible}
            username="上都牧人"
            time="01:48:08"
            sum={32.0}
            discount={8}
            storeName="海里恩健身俱乐部"
            onlinePeople={20}
            addr="深南大道与前海教会处振业星海商业广场31"
            close={() => {
              this.setState({
                isShareModalVisible: false
              });
            }}
          >
            <Text>12</Text>
          </ShareModal>
        </View>
      </Page>
    );
  }
}
