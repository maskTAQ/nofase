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
  hasShareButton = true,
  money,
  share,
  portrait,
  storeImg,
  level,
  NowCurriculum,
  goStoreDetail
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
                <View
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 60,
                    overflow: "hidden"
                  }}
                >
                  <Icon size={60} source={portrait} />
                </View>
                <Text style={styles.username}>
                  {username} LV:{level}
                </Text>
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
                  <Text style={styles.centerItemValue}>{money}</Text>
                  <Text style={styles.Discount}>折扣{discount}元</Text>
                </View>
                <Text style={styles.centerItemLabel}>消费金额</Text>
              </View>
            </View>
            <View style={styles.storeInfo}>
              <Icon size={50} source={storeImg} />
              <View style={styles.storeInfoWrapper}>
                <Text style={styles.storeName}>{storeName}</Text>
                <View style={styles.storeInfoCenter}>
                  <Text style={styles.onlinePeople}>
                    在线人数：{onlinePeople}人
                  </Text>
                  <Button style={styles.lession} onPress={goStoreDetail}>
                    <Text style={styles.lessionText}>课程:{NowCurriculum}</Text>
                    <Icon size={14} source={require("./img/u79.png")} />
                  </Button>
                </View>
                <Text style={styles.storeAddr}>{addr}</Text>
              </View>
            </View>
          </View>
        </View>
        {hasShareButton ? (
          <Button
            onPress={share}
            style={styles.share}
            textStyle={styles.shareText}
          >
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
  isVisible: PropTypes.bool,
  money: PropTypes.number,
  share: PropTypes.func,
  portrait: PropTypes.any,
  storeImg: PropTypes.any,
  level: PropTypes.any,
  NowCurriculum: PropTypes.any,
  goStoreDetail: PropTypes.func
};
export default ShareModal;
