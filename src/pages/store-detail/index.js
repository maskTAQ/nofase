import React, { Component } from "react";
import { View } from "react-native";
//import PropTypes from "prop-types";

import { Table } from "src/components";
export default class StoreDetail extends Component {
  state = {};
  store = {
    tableColumns: [
      { title: "时间", dataIndex: "a" },
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
      }
    ]
  };
  getTableData = () => {
    return Promise.resolve(this.store.data);
  };
  render() {
    const { tableColumns } = this.store;
    return (
      <View>
        <Table columns={tableColumns} getData={this.getTableData} />
      </View>
    );
  }
}
