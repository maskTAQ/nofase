import React from "react";
import { View, Text } from "react-native";
import { Alert, Icon, Button } from "src/components";
import PropTypes from "prop-types";

const LogoutModal = ({ logout, isVisible }) => {
  const styles = {
    container: {
      padding: 6,
      borderWidth: 1,
      borderColor: "#1a98e0",
      borderRadius: 6,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgb(255,255,255)"
    },
    detail: {
      lineHeight: 30,
      color: "#000"
    },
    button: {
      width: "100%",
      height: 40,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 6,
      backgroundColor: "#1a98e0"
    }
  };
  return (
    <Alert isVisible={isVisible}>
      <View style={styles.container}>
        <Icon size={30} source={require("./img/error.png")} />
        <Text style={styles.detail}>此账号在别处登录!</Text>
        <Button
          onPress={logout}
          style={styles.button}
          textStyle={{ color: "#fff" }}
        >
          退出登录
        </Button>
      </View>
    </Alert>
  );
};
LogoutModal.propTypes = {
  logout: PropTypes.func,
  isVisible: PropTypes.bool
};

export default LogoutModal;
