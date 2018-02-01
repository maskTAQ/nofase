import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";

import {} from "src/components";
import styles from "./style";
export default class Fitnessrecord extends Component {
  static propTypes = {
    demo: PropTypes.any
  };
  state = {};

  render() {
    return (
      <View style={styles.contianer}>
        <Text>12123</Text>
      </View>
    );
  }
}
