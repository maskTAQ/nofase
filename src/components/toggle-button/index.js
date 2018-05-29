import React, { Component } from "react";
import { View, Image } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import styles from "./style";
import { computeSize } from "src/common";
import { Button, Icon } from "src/components";
import action from "src/action";

@connect()
export default class ToggleButton extends Component {
  static propTypes = {
    dispatch: PropTypes.func
  };
  state = {
    status: "unfold" //['unfold','packUp']
  };
  toggle = () => {
    this.setState({
      status: this.state.status === "unfold" ? "packUp" : "unfold"
    });
  };
  go = routeName => {
    this.props.dispatch(action.navigate.go({ routeName }));
  };
  render() {
    const arrow = {
      unfold: "0deg",
      packUp: "180deg"
    };
    const bottom = {
      unfold: 0,
      packUp: computeSize(-58)
    };
    const { status } = this.state;
    return (
      <View style={[styles.container, { bottom: bottom[status] }]}>
        <Image
          source={require("./img/bg.png")}
          style={styles.bg}
          resizeMode="stretch"
        />
        <View style={styles.wrapper}>
          <Button onPress={this.toggle} style={styles.toggleButton}>
            <Icon
              size={computeSize(30)}
              source={require("./img/arrow.png")}
              style={{ transform: [{ rotate: arrow[status] }] }}
            />
          </Button>
          <View style={styles.buttonGroup}>
            <Button style={styles.buttonLeft} onPress={() => this.go("User")}>
              <Icon size={computeSize(36)} source={require("./img/user.png")} />
            </Button>
            <Button style={styles.buttonCenter} onPress={() => this.go("Pay")}>
              <Icon size={computeSize(50)} source={require("./img/code.png")} />
            </Button>
            <Button
              style={styles.buttonRight}
              onPress={() => this.go("Activity")}
            >
              <Icon size={computeSize(36)} source={require("./img/run.png")} />
            </Button>
          </View>
        </View>
      </View>
    );
  }
}
