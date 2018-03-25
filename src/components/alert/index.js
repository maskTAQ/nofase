import React from "react";
import { Modal, TouchableWithoutFeedback, View } from "react-native";
import PropTypes from "prop-types";

//import { } from "src/components";
import styles from "./style";
//import action from "src/action"

const Alert = ({ close, isVisible, children, style, location = "middle" }) => {
  switch (location) {
    case "top":
      location = "flex-start";
      break;
    case "middle":
      location = "center";
      break;
    case "bottom":
      location = "flex-end";
      break;
    default:
      break;
  }
  return (
    <Modal
      animationType="fade"
      onRequestClose={() => {}}
      transparent={true}
      visible={isVisible}
    >
      <TouchableWithoutFeedback onPress={close}>
        <View style={[styles.container, style, { justifyContent: location }]}>
          <TouchableWithoutFeedback>{children}</TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
Alert.propTypes = {
  close: PropTypes.func,
  isVisible: PropTypes.bool,
  children: PropTypes.any,
  location: PropTypes.string,
  style: PropTypes.object
};
export default Alert;
