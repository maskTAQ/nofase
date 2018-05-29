import React from "react";
import { View, Text, Image } from "react-native";
import PropTypes from "prop-types";

import { computeSize } from "src/common";
import { Alert, Icon, Button } from "src/components";
import action from "src/action";
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
  goStoreDetail,
  Lat,
  Lng,
  people
}) => {
  return (
    <Alert style={{ flex: 1 }} isVisible={isVisible} close={close}>
      <View style={styles.layer}>
        <View style={styles.container}>
          <View style={styles.bg}>
            <Image
              style={styles.bg}
              source={require("./img/bg.png")}
              resizeMode="stretch"
            />
          </View>
          <View style={styles.content}>
            <View style={styles.headerWrapper}>
              <View style={{ width: styles.closeWrapper.width }} />
              <View style={styles.userInfoWrapper}>
                <View
                  style={{
                    width: computeSize(60),
                    height: computeSize(60),
                    borderRadius: computeSize(60),
                    overflow: "hidden"
                  }}
                >
                  <Icon size={computeSize(60)} source={portrait} />
                </View>
                <View style={styles.usernameWrapper}>
                  <Text style={styles.username}>{username}</Text>
                  <Image
                    style={styles.lvImg}
                    source={require("./img/lv.png")}
                  />
                  <View style={styles.userLvWrapper}>
                    <Text style={styles.userLv}> {level}</Text>
                  </View>
                </View>
              </View>
              <Button onPress={close} style={styles.closeWrapper}>
                <Icon
                  size={computeSize(28)}
                  source={require("./img/u78.png")}
                />
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
                  <Text style={styles.centerItemValue}>
                    {(+money).toFixed(2)}
                  </Text>
                  <Text style={styles.Discount}>
                    折扣{(+discount).toFixed(2)}元
                  </Text>
                </View>
                <Text style={styles.centerItemLabel}>消费金额</Text>
              </View>
            </View>
            <View style={styles.storeInfo}>
              <View style={styles.storeImgWrapper}>
                <Icon size={computeSize(70)} source={storeImg} />
                {people && (
                  <View style={styles.storePeople}>
                    <Text style={styles.storePeopleText}>剩{people}位</Text>
                  </View>
                )}
              </View>

              <View style={styles.storeInfoWrapper}>
                <Text style={styles.storeName}>{storeName}</Text>
                <View style={styles.storeInfoCenter}>
                  <Text style={styles.onlinePeople}>
                    在线人数：{onlinePeople}人
                  </Text>
                  <Button style={styles.lession} onPress={goStoreDetail}>
                    <Text style={styles.lessionText} numberOfLines={1}>
                      课程:{(NowCurriculum || "").replace(
                        /([\s\S]{5})[\s\S]+/,
                        "$1..."
                      )}
                    </Text>
                    <View style={{ width: computeSize(14) }}>
                      <Icon
                        size={computeSize(14)}
                        source={require("./img/u79.png")}
                      />
                    </View>
                  </Button>
                </View>
                <View style={styles.storeInfoBottom}>
                  <Text style={styles.storeAddr}>{addr}</Text>
                  {Lat && (
                    <Button
                      onPress={() => {
                        this.props.navigation.dispatch(
                          action.navigate.go({
                            routeName: "Navigation",
                            params: { Lat, Lng }
                          })
                        );
                      }}
                      style={styles.navgation}
                    >
                      <Icon
                        size={computeSize(18)}
                        source={require("./img/nav.png")}
                      />
                      <Text style={styles.navgationText}>导航</Text>
                    </Button>
                  )}
                </View>
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
  goStoreDetail: PropTypes.func,
  Lat: PropTypes.number,
  Lng: PropTypes.number,
  people: PropTypes.number
};
export default ShareModal;
