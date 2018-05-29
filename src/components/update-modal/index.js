import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import { connect } from "react-redux";

import { computeSize } from "src/common";
import { Alert, Icon, Button } from "../index";

const UpdateModal = ({ close, isVisible, appUpdateInfo, ok }) => {
  const styles = {
    container: {
      padding: computeSize(10),
      borderWidth: 1,
      borderColor: "#1a98e0",
      borderRadius: computeSize(6),
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff"
    },
    version: {
      lineHeight: computeSize(30),
      color: "#737373"
    },
    fileSize: {
      lineHeight: computeSize(30),
      color: "#737373"
    },
    buttonGroup: {
      width: "100%",
      paddingLeft: computeSize(20),
      paddingRight: computeSize(20),
      flexDirection: "row",
      justifyContent: "space-between"
    },
    button: {
      width: computeSize(110),
      height: computeSize(35),
      justifyContent: "center",
      alignItems: "center",
      borderRadius: computeSize(10),
      borderWidth: 1,
      borderColor: "#1a98e0",
      backgroundColor: "#1a98e0"
    },
    buttonText: {
      fontSize: computeSize(14),
      color: "#fff"
    },
    cancelButtonText: {
      fontSize: computeSize(14),
      color: "#1a98e0"
    }
  };
  const { appVersion, appSize } = appUpdateInfo;
  return (
    <Alert isVisible={isVisible} close={close}>
      <View style={styles.container}>
        <Icon size={computeSize(45)} source={require("./img/hint.png")} />
        <Text style={styles.version}>软件版本: {appVersion}</Text>
        <Text style={styles.fileSize}>文件大小:{appSize}M</Text>
        <View style={styles.buttonGroup}>
          <Button
            onPress={ok}
            style={styles.button}
            textStyle={styles.buttonText}
          >
            升级
          </Button>
          <Button
            onPress={close}
            style={[styles.button, { backgroundColor: "#fff" }]}
            textStyle={styles.cancelButtonText}
          >
            稍后再说
          </Button>
        </View>
      </View>
    </Alert>
  );
};
UpdateModal.propTypes = {
  close: PropTypes.func,
  ok: PropTypes.func,
  appUpdateInfo: PropTypes.object,
  isVisible: PropTypes.bool
};

export default connect()(UpdateModal);
