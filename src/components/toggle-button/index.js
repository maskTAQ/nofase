import React, { Component } from "react";
import { View } from "react-native";

import styles from "./style";
//import { Page, Button, Icon } from "src/components";

export default class ToggleButton extends Component {
  state = {
    status: "unfold" //['unfold','packUp']
  };
  render() {
    return <View style={styles.container} />;
  }
}
