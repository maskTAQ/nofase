import React from "react";
import { View, Text, Image } from "react-native";
import PropTypes from "prop-types";

import { Alert, Icon, Button } from "src/components";
import styles from "./style";
const ShareModal = ({
  close,
  portraitSource = require("./img/u196.png"),
  username,
  time,
  sum,
  discount,
  storeName,
  onlinePeople,
  addr,
  isVisible,
  hasShareButton = true
}) => {
  return (
    <Alert isVisible={isVisible} close={close}>
      <View style={styles.layer}>
        <View style={styles.container}>
          <View style={styles.bg}>
            <Image
              style={styles.bg}
              source={require("./img/u42.png")}
              resizeMode="stretch"
            />
          </View>
          <View style={styles.content}>
            <View style={styles.headerWrapper}>
              <View style={{ width: styles.closeWrapper.width }} />
              <View style={styles.userInfoWrapper}>
                <Icon size={60} source={portraitSource} />
                <Text style={styles.username}>{username}</Text>
              </View>
              <Button onPress={close} style={styles.closeWrapper}>
                <Icon size={22} source={require("./img/u221.png")} />
              </Button>
            </View>
            <View style={styles.centerContainer}>
              <View style={styles.centerItem}>
                <Text style={styles.centerItemValue}>{time}</Text>
                <Text style={styles.centerItemLabel}>健身时间</Text>
              </View>
              <View style={styles.centerBorder} />
              <View style={styles.centerItem}>
                <View style={styles.centerItemValueWrapper}>
                  <Text style={styles.centerItemValue}>{time}</Text>
                  <Text style={styles.Discount}>折扣{discount}元</Text>
                </View>
                <Text style={styles.centerItemLabel}>消费金额</Text>
              </View>
            </View>
            <View style={styles.storeInfo}>
              <Icon size={50} source={require("./img/u209.png")} />
              <View style={styles.storeInfoWrapper}>
                <Text style={styles.storeName}>{storeName}</Text>
                <View style={styles.storeInfoCenter}>
                  <Text style={styles.onlinePeople}>
                    在线人数：{onlinePeople}人
                  </Text>
                  <Button style={styles.lession}>
                    <Text style={styles.lessionText}>课程：瑜伽健身</Text>
                    <Icon size={14} source={require("./img/u79.png")} />
                  </Button>
                </View>
                <Text style={styles.storeAddr}>{addr}</Text>
              </View>
            </View>
          </View>
        </View>
        {hasShareButton ? (
          <Button style={styles.share} textStyle={styles.shareText}>
            能量分享
          </Button>
        ) : null}
      </View>
    </Alert>
  );
};
ShareModal.propTypes = {
  close: PropTypes.func,
  portraitSource: PropTypes.number,
  username: PropTypes.string,
  time: PropTypes.string,
  sum: PropTypes.number,
  discount: PropTypes.number,
  storeName: PropTypes.string,
  onlinePeople: PropTypes.number,
  addr: PropTypes.string,
  hasShareButton: PropTypes.bool,
  isVisible: PropTypes.bool
};
export default ShareModal;
