import React, { Component } from "react";
import { View, Image } from "react-native";

import styles from "./style";
import { Button, Icon } from "src/components";

export default class ToggleButton extends Component {
  state = {
    status: "unfold" //['unfold','packUp']
  };
  toggle = () => {
    this.setState({
      status: this.state.status === "unfold" ? "packUp" : "unfold"
    });
  };
  render() {
    const arrow = {
      unfold: "90deg",
      packUp: "270deg"
    };
    const bottom = {
      unfold: 0,
      packUp: -80
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
              size={20}
              source={require("./img/arrow.png")}
              style={{ transform: [{ rotate: arrow[status] }] }}
            />
          </Button>
          <View style={styles.buttonGroup}>
            <Button>
              <Icon size={36} source={require("./img/user.png")} />
            </Button>
            <Button>
              <Icon size={60} source={require("./img/code.png")} />
            </Button>
            <Button>
              <Icon size={36} source={require("./img/run.png")} />
            </Button>
          </View>
        </View>
      </View>
    );
  }
}
