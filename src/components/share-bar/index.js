import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";

import { Alert, Icon, Button } from "../";
import styles from "./style";
const ShareBar = ({ isVisible, share, close }) => {
  const data = [
    {
      icon: require("./img/u227.png"),
      label: "微信",
      platform: "WECHAT"
    },
    {
      icon: require("./img/u231.png"),
      label: "朋友圈",
      platform: "WECHATMOMENT"
    },
    {
      icon: require("./img/u229.png"),
      label: "QQ",
      platform: "QQ"
    },
    {
      icon: require("./img/u233.png"),
      label: "QQ空间",
      platform: "QQZONE"
    },
    {
      icon: require("./img/u235.png"),
      label: "新浪微博",
      platform: "SINA"
    }
  ];

  return (
    <Alert
      close={close}
      isVisible={isVisible}
      location="bottom"
      style={{ paddingLeft: 0, paddingRight: 0 }}
    >
      <View style={styles.shareBar}>
        {data.map(({ icon, label, platform }) => {
          return (
            <Button
              onPress={() => share(platform)}
              style={styles.shareBarItem}
              key={label}
            >
              <Icon size={40} source={icon} />
              <Text style={styles.shareBarItemLabel}>{label}</Text>
            </Button>
          );
        })}
      </View>
    </Alert>
  );
};
ShareBar.propTypes = {
  close: PropTypes.func,
  isVisible: PropTypes.bool,
  share: PropTypes.func
};
export default ShareBar;
