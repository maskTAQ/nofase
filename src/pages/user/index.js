import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  Switch,
  ScrollView,
  ActivityIndicator
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import api from "src/api";
import {
  Button,
  Icon,
  Alert,
  Input,
  CodeButton,
  Alert as AlertModal
} from "src/components";
import styles from "./style";
import action from "src/action";

class ModifMobile extends Component {
  static propTypes = {
    isVisible: PropTypes.bool,
    close: PropTypes.func,
    StoreId: PropTypes.number,
    verifySetp: PropTypes.number,
    oldMobile: PropTypes.string,
    requestVerifySetpChange: PropTypes.func,
    logout: PropTypes.func
  };
  state = {
    verifySetp: 0, //0 未验证 1验证完当前手机号 2验证完绑定手机号
    mobile: "",
    code: "",
    isLoading: false
  };
  changeValue(value, type) {
    this.setState({
      [type]: value
    });
  }
  verify = () => {
    const { requestVerifySetpChange } = this.props;
    let { verifySetp } = this.props;
    // const { mobile, code } = this.state;

    this.setState({ isLoading: true });
    setTimeout(() => {
      requestVerifySetpChange(++verifySetp);
      this.setState({ isLoading: false });
    }, 300);

    return;

    // if (verifySetp === 0) {
    //   api
    //     .verifyCode(oldMobile, code)
    //     .then(res => {
    //       Alert.alert("提示", "旧手机验证成功，请输入新手机号", [
    //         { text: "确定", onPress: () => { } }
    //       ]);
    //       requestVerifySetpChange(1);
    //     })
    //     .catch(e => {
    //       Alert.alert("提示", "旧手机验证失败:" + e, [
    //         { text: "确定", onPress: () => { } }
    //       ]);
    //     });
    // }
    // if (verifySetp === 1) {
    //   if (mobile === oldMobile) {
    //     Alert.alert("提示", "新旧手机号不能相同", [
    //       { text: "确定", onPress: () => { } }
    //     ]);
    //   } else {
    //     api
    //       .verifyCode(mobile, code)
    //       .then(res => {
    //         Alert.alert("提示", "新手机验证成功，请点击完成保存", [
    //           { text: "确定", onPress: () => { } }
    //         ]);
    //         requestVerifySetpChange(2);
    //       })
    //       .catch(e => {
    //         Alert.alert("提示", "新手机验证失败:" + e, [
    //           { text: "确定", onPress: () => { } }
    //         ]);
    //       });
    //   }
    // }

    // if (verifySetp === 2) {
    //   this.modif();
    // }
  };
  modif = () => {
    const { StoreId, logout } = this.props;
    api
      .modifStoreInfo({ StoreId, LegTel: this.state.mobile })
      .then(res => {
        logout();
      })
      .catch(e => {
        Alert.alert("提示", "修改失败:" + e, [
          { text: "确定", onPress: () => {} }
        ]);
      });
  };
  render() {
    const { isVisible, close, verifySetp, oldMobile } = this.props;
    const { mobile, code, isLoading } = this.state;
    const currentMobile = verifySetp === 0 ? oldMobile : mobile;
    let buttonLabel = "验证旧手机";
    if (verifySetp === 1) {
      buttonLabel = "验证新手机";
    }
    if (verifySetp === 2) {
      buttonLabel = "修改手机号";
    }

    return (
      <AlertModal isVisible={isVisible} close={close}>
        <View style={styles.modalContianer}>
          <View style={styles.modalItemWrapper}>
            <Icon size={24} source={require("./img/u16.png")} />
            <Input
              value={currentMobile}
              onChangeText={v => {
                this.changeValue(v, "mobile");
              }}
              editable={verifySetp === 1}
              style={styles.modalItemInput}
              placeholder="新手机号码"
              placeholderTextColor={styles.modalItemInput.color}
            />
          </View>
          <View style={[styles.modalItemWrapper, { marginTop: 10 }]}>
            <Icon size={24} source={require("./img/u36.png")} />
            <Input
              value={code}
              onChangeText={v => {
                this.changeValue(v, "code");
              }}
              style={styles.modalItemInput}
              placeholder="验证码"
              placeholderTextColor={styles.modalItemInput.color}
            />
            <CodeButton phone={currentMobile} type="modal" time={10}>
              验证码
            </CodeButton>
          </View>
          <Button
            disabled={isLoading}
            onPress={this.verify}
            style={styles.sumbit}
            textStyle={styles.sumbitText}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {isLoading && <ActivityIndicator color="#fff" size="small" />}
              <Text style={{ color: "#fff" }}>{buttonLabel}</Text>
            </View>
          </Button>
        </View>
      </AlertModal>
    );
  }
}

@connect(state => {
  const { auth: { UserId } } = state;
  return { UserId };
})
export default class User extends Component {
  static defaultProps = {
    username: "上都牧人",
    UserId: "gym_8732789",
    userLevel: "01"
  };
  static propTypes = {
    username: PropTypes.string,
    UserId: PropTypes.number,
    userLevel: PropTypes.string,
    navigation: PropTypes.object
  };
  state = {
    isModifMobileVisible: true,
    verifySetp: 0
  };
  back = () => {
    console.log(this.props);
    this.props.navigation.dispatch(action.navigate.back());
  };
  renderHeader() {
    const { username, UserId, userLevel } = this.props;
    const portraitSource = require("./img/u128.png"),
      closeSource = require("./img/u78.png"),
      lvSource = require("./img/u137.png"),
      editSource = require("./img/u133.png");
    return (
      <View style={styles.header}>
        <Image
          source={require("./img/u106.png")}
          resizeMode="stretch"
          style={styles.headerBg}
        />
        <View style={styles.headerWrapper}>
          <View style={styles.closeWrapper}>
            <Button onPress={this.back}>
              <Icon size={24} source={closeSource} />
            </Button>
          </View>
          <View style={styles.headerContent}>
            <Icon size={60} source={portraitSource} />
            <View style={styles.headerContentRight}>
              <View style={styles.usernameWrapper}>
                <Text style={styles.username}>{username}</Text>
                <Button>
                  <Icon size={16} source={editSource} />
                </Button>
              </View>
              <View style={styles.userIdWrapper}>
                <Text style={styles.userId}>ID:{UserId}</Text>
                <View style={styles.lvWrapper}>
                  <Image
                    style={styles.lvImg}
                    resizeMode="contain"
                    source={lvSource}
                  />
                  <Text style={styles.lvLabel}>{userLevel}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.border, { margin: 6, marginBottom: 0 }]} />
        </View>
      </View>
    );
  }
  renderList() {
    const data = [
      {
        label: "健身记录",
        onPress: () => {
          this.props.navigation.dispatch(
            action.navigate.go({ routeName: "Fitnessrecord" })
          );
        }
      },
      {
        label: "我的钱包",
        onPress: () => {
          this.props.navigation.dispatch(
            action.navigate.go({ routeName: "TranSaction" })
          );
        }
      },
      {
        label: "优惠卡包",
        onPress: () => {}
      },
      {
        label: "消息提示",
        onPress: () => {}
      }
    ];

    return (
      <View style={styles.list}>
        {data.map((item, i) => {
          const { label, onPress } = item;
          const hasSwitch = i === 3;
          return (
            <Button
              onPress={onPress}
              style={[styles.item, hasSwitch ? styles.switchItem : null]}
              key={label}
            >
              <Text style={styles.itemLabel}>{label}</Text>
              {hasSwitch ? <Switch /> : null}
            </Button>
          );
        })}
      </View>
    );
  }
  renderAccount() {
    return (
      <View style={styles.accountContianer}>
        <Text style={styles.accountTitle}>账号绑定</Text>
        <View style={[styles.accountItem, { paddingLeft: 10 }]}>
          <Text style={styles.accountItemText}>手机号码</Text>
          <View style={styles.accountItemRight}>
            <Text style={styles.accountItemText}>手机号码</Text>
            <Button
              onPress={() => {
                this.setState({
                  isModifMobileVisible: true
                });
              }}
              textStyle={styles.itemButtonText}
            >
              更换
            </Button>
          </View>
        </View>
        <View style={[styles.accountItem, { paddingLeft: 10 }]}>
          <Text style={styles.accountItemText}>手机号码</Text>
          <View style={styles.accountItemRight}>
            <Text style={styles.accountItemText}>--/--</Text>
            <Button textStyle={styles.itemButtonText}>绑定</Button>
          </View>
        </View>
      </View>
    );
  }
  render() {
    const { isModifMobileVisible, verifySetp } = this.state;
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.content}>
            {this.renderList()}
            {this.renderAccount()}
            <View style={styles.accountContianer}>
              <View style={styles.accountItem}>
                <Text style={styles.accountItemText}>客户反馈</Text>
              </View>
              <View style={styles.accountItem}>
                <Text style={styles.accountItemText}>邀请好友</Text>
              </View>
            </View>
            <Button style={styles.button} textStyle={styles.buttonText}>
              退出登录
            </Button>
          </View>
        </ScrollView>
        <ModifMobile
          close={() => {
            this.setState({
              isModifMobileVisible: false
            });
          }}
          requestVerifySetpChange={v => {
            console.log(v, "[---]");
            this.setState({
              verifySetp: v
            });
          }}
          StoreId={1}
          oldMobile={"13696526122"}
          isVisible={isModifMobileVisible}
          verifySetp={verifySetp}
          logout={this.logout}
        />
      </View>
    );
  }
}
