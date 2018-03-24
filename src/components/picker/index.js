import React, { Component } from "react";
import { View, Modal, TouchableWithoutFeedback } from "react-native";
import PropTypes from "prop-types";

import { Button } from "src/components";
import styles from "./style";

export default class Picker extends Component {
  static defaultProps = {
    data: [],
    onValueSelect() {},
    onRequestClose() {}
  };
  static propTypes = {
    data: PropTypes.array,
    onValueSelect: PropTypes.func,
    visible: PropTypes.bool,
    onRequestClose: PropTypes.func
  };
  cancel = () => {
    this.props.onRequestClose();
  };
  formatData(data) {
    const nextData = Object.assign([], data);
    data.forEach((item, i) => {
      if (i % 2 === 0 && i === data.length - 1) {
        return;
      }
      nextData.splice(i + (i + 1), 0, "border");
    });
    return nextData;
  }
  render() {
    const { visible, onValueSelect, data } = this.props;
    return (
      <Modal
        transparent={true}
        onRequestClose={() => {}}
        visible={visible}
        animationType="fade"
      >
        <TouchableWithoutFeedback onPress={this.cancel}>
          <View style={styles.container}>
            <View style={styles.content}>
              <View style={styles.list}>
                {this.formatData(data).map((item, i) => {
                  if (item === "border") {
                    return <View style={styles.itemBorder} key={i} />;
                  }
                  const { label, value } = item;
                  return (
                    <Button
                      onPress={() => onValueSelect(value, item)}
                      style={styles.item}
                      textStyle={styles.itemLabel}
                      key={label}
                    >
                      {label}
                    </Button>
                  );
                })}
              </View>
              <Button
                onPress={this.cancel}
                style={styles.cancel}
                textStyle={styles.itemLabel}
              >
                取消
              </Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}
