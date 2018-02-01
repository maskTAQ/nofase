import React from "react";
import { Modal } from "react-native";
import PropTypes from "prop-types";

//import { } from "src/components";
//import styles from "./style"
//import action from "src/action"
const Alert = ({ close, isVisible, children }) => {
  return (
    <Modal
      animationType="fade"
      onRequestClose={() => {}}
      transparent={true}
      visible={isVisible}
    >
      {children}
    </Modal>
  );
};
Alert.propTypes = {
  close: PropTypes.func,
  isVisible: PropTypes.bool,
  children: PropTypes.any
};
export default Alert;
