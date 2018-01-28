import React, { Component } from "react";
import { View, Image, Text, ScrollView } from "react-native";
//import PropTypes from "prop-types";

import styles from "./style";
import { Table, Header, Button, Icon, StarScore } from "src/components";
export default class StoreDetail extends Component {
  state = {};
  store = {
    tableColumns: [
      { title: "时间", dataIndex: "a", style: { flex: 2 } },
      { title: "周一", dataIndex: "b" },
      { title: "周二", dataIndex: "c" },
      { title: "周三", dataIndex: "d" },
      { title: "周四", dataIndex: "e" },
      { title: "周五", dataIndex: "f" },
      { title: "周六", dataIndex: "i" },
      { title: "周日", dataIndex: "j" }
    ],
    data: [
      {
        a: "15:00-18:00",
        b: "自助训练",
        c: "民族舞",
        d: "自助训练",
        e: "民族舞",
        f: "自助训练",
        i: "民族舞",
        j: "自助训练"
      },
      {
        a: "15:00-18:00",
        b: "自助训练",
        c: "民族舞",
        d: "自助训练",
        e: "民族舞",
        f: "自助训练",
        i: "民族舞",
        j: "自助训练"
      },
      {
        a: "15:00-18:00",
        b: "自助训练",
        c: "民族舞",
        d: "自助训练",
        e: "民族舞",
        f: "自助训练",
        i: "民族舞",
        j: "自助训练"
      },
      {
        a: "15:00-18:00",
        b: "自助训练",
        c: "民族舞",
        d: "自助训练",
        e: "民族舞",
        f: "自助训练",
        i: "民族舞",
        j: "自助训练"
      }
    ]
  };
  getTableData = () => {
    return Promise.resolve(this.store.data);
  };
  renderHeader() {
    return (
      <View style={styles.header}>
        <Image source={require("./img/u0.png")} style={styles.headerBg} />
        <View style={styles.storeIntro}>
          <View style={styles.introTitleWrapper}>
            <View style={styles.introTitleBox}>
              <View style={{ flex: 1 }}>
                <Text
                  style={{ fontSize: 20, color: "#fff", fontWeight: "bold" }}
                >
                  优思健身工作室（前海店）
                </Text>
                <Text
                  style={{
                    marginTop: 4,
                    fontSize: 14,
                    color: "#fff",
                    fontWeight: "bold"
                  }}
                >
                  深圳市龙岗区南湾街道龙岗大厦北栋22楼
                </Text>
              </View>
              <View style={{ justifyContent: "center" }}>
                <Icon
                  size={20}
                  source={require("./img/u101.png")}
                  style={{ alignItems: "center" }}
                />
                <Text
                  style={{ fontSize: 12, color: "#fff", fontWeight: "bold" }}
                >
                  每20分钟
                </Text>
                <Text
                  style={{ fontSize: 12, color: "#fff", fontWeight: "bold" }}
                >
                  计费一次
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              padding: 6,
              backgroundColor: "#666",
              alignContent: "center"
            }}
          >
            <Icon
              size={26}
              source={require("./img/u177.png")}
              style={{ paddingLeft: 10, paddingRight: 10 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 12, color: "#fff", fontWeight: "bold" }}>
                可容纳线上20人位
              </Text>
              <Text style={{ fontSize: 12, color: "#fff", fontWeight: "bold" }}>
                当前剩余5人位
              </Text>
            </View>
            <View
              style={{
                paddingLeft: 20,
                paddingRight: 20,
                height: 30,
                justifyContent: "center",
                backgroundColor: "#1a97df",
                borderRadius: 4
              }}
            >
              <Text style={{ fontSize: 16, color: "#fff", fontWeight: "bold" }}>
                15元 / 小时
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
  renderStarScore() {
    const people = [1, 1, 1, 1, 1, 1, 1];
    return (
      <View
        style={{
          flexDirection: "row",
          height: 40,
          alignItems: "center",
          paddingLeft: 6,
          paddingRight: 6,
          borderBottomWidth: 1,
          borderBottomColor: "#e4e4e4"
        }}
      >
        <Text style={{ fontSize: 14, color: "#1a97df", fontWeight: "bold" }}>
          4.3
        </Text>
        <StarScore
          operable={false}
          currentScore={4.3}
          style={{ flex: 1, paddingLeft: 6 }}
        />
        {people.map((item, i) => (
          <Icon
            size={20}
            source={require("./img/u171.png")}
            key={i}
            style={{ marginLeft: 4 }}
          />
        ))}
      </View>
    );
  }
  renderProps() {
    const data = ["淋浴", "储物", "有氧器", "力量器", "康体设备"];
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          height: 40,
          alignItems: "center",
          paddingLeft: 6,
          paddingRight: 6,
          borderBottomWidth: 1,
          borderBottomColor: "#e4e4e4"
        }}
      >
        {data.map(item => {
          return (
            <View
              style={{
                paddingLeft: 4,
                paddingRight: 4,
                height: 24,
                justifyContent: "center",
                borderWidth: 1,
                borderColor: "#a1a1a1",
                borderRadius: 4
              }}
              key={item}
            >
              <Text style={{ fontSize: 14, color: "#a1a1a1" }}>{item}</Text>
            </View>
          );
        })}
      </View>
    );
  }
  render() {
    const { tableColumns } = this.store;
    return (
      <View style={styles.container}>
        <Header
          style={styles.statusBar}
          title="1/31"
          RightComponent={
            <Button>
              <Icon size={22} source={require("./img/u141.png")} />
            </Button>
          }
        />
        {this.renderHeader()}
        <ScrollView>
          <View style={{ marginTop: 6, flex: 1, backgroundColor: "#f2f2f2" }}>
            {this.renderStarScore()}
            {this.renderProps()}
            <View
              style={{
                flexDirection: "row",
                height: 40,
                alignItems: "center",
                paddingLeft: 6,
                paddingRight: 6,
                borderBottomWidth: 1,
                borderBottomColor: "#e4e4e4"
              }}
            >
              <Text
                style={{ fontSize: 14, color: "#1a97df", fontWeight: "bold" }}
              >
                营业时间：
              </Text>
              <Text style={{ color: "#a1a1a1" }}>周一至周日 09:00 — 22:30</Text>
            </View>
            <View style={{ padding: 6 }}>
              <Text
                style={{
                  marginBottom: 6,
                  fontSize: 14,
                  color: "#1a97df",
                  fontWeight: "bold"
                }}
              >
                商家留言：
              </Text>
              <Text style={{ lineHeight: 20 }}>
                {" "}
                自幼曾攻经史，长成亦有权谋。恰如猛虎卧荒丘，潜伏爪牙忍受不幸刺文双颊，那堪配在江州。他年若得报冤仇，血染浔阳江口自幼曾攻经史，长成亦
              </Text>
            </View>
          </View>
          <Table columns={tableColumns} getData={this.getTableData} />
        </ScrollView>

        <View
          style={{
            flexDirection: "row",
            height: 40,
            backgroundColor: "#c6c6c6",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Button style={{ paddingLeft: 6, alignItems: "center" }}>
            <Icon size={16} source={require("./img/u204.png")} />
            <Text
              style={{ fontSize: 14, color: "#1a97df", fontWeight: "bold" }}
            >
              电话咨询
            </Text>
          </Button>
          <Button
            style={{
              backgroundColor: "#1a97df",
              height: "100%",
              justifyContent: "center",
              paddingLeft: 15,
              paddingRight: 15
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              <Text style={{ fontSize: 16 }}>开始健身</Text>
              <Text style={{ fontSize: 12, marginLeft: 4 }}>15元/小时</Text>
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}
