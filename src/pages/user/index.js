import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  Switch,
  ScrollView,
  ActivityIndicator,
  Alert,
  AsyncStorage
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import api from "src/api";
import {
  Button,
  Icon,
  Input,
  CodeButton,
  Alert as AlertModal
} from "src/components";
import { Tip } from "src/common";
import styles from "./style";
import action from "src/action";

class ModifUserName extends Component {
  static propTypes = {
    isVisible: PropTypes.bool,
    close: PropTypes.func,
    NickName: PropTypes.string,
    requestChangeNickName: PropTypes.func
  };

  state = {
    NickName: "",
    setting: false
  };
  componentWillMount() {
    const { NickName } = this.props;
    this.setState({ NickName });
  }
  componentWillReceiveProps(nextProps) {
    const { NickName: NextNickName } = nextProps;
    const { NickName } = this.props;
    if (NickName !== NextNickName) {
      this.setState({
        NickName: NextNickName
      });
    }
  }
  save = () => {
    const { close, requestChangeNickName } = this.props;
    const { NickName } = this.state;
    this.setState({ setting: true });
    api
      .setUserInfo({ NickName })
      .then(res => {
        requestChangeNickName(NickName);
        this.setState({ setting: false });
        close();
      })
      .catch(e => {
        this.setState({ setting: false });
      });
  };
  render() {
    const { isVisible, close } = this.props;
    const { NickName, setting } = this.state;
    return (
      <AlertModal isVisible={isVisible} close={close}>
        <View style={styles.modalContianer}>
          <Text style={styles.modalTitle}>修改昵称</Text>
          <Text style={styles.modalSubTitle}>不超过十个字符</Text>
          <View style={styles.modalInputWrapper}>
            <Input
              style={styles.modalInput}
              value={NickName}
              onChangeText={v => this.setState({ NickName: v })}
            />
          </View>
          <View style={styles.modalButtonGroupWrapper}>
            <View style={styles.modalButtonGroup}>
              <Button
                onPress={close}
                style={styles.modalCancelButton}
                textStyle={[styles.modalButtonText, { color: "#1b9cf0" }]}
              >
                取消
              </Button>
              <Button onPress={this.save} style={styles.modalCompleteButton}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  {setting && <ActivityIndicator color="#fff" size="small" />}
                  <Text style={[styles.modalButtonText, { color: "#fff" }]}>
                    完成
                  </Text>
                </View>
              </Button>
            </View>
          </View>
        </View>
      </AlertModal>
    );
  }
}
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
    const { requestVerifySetpChange, oldMobile, verifySetp } = this.props;
    const { mobile, code } = this.state;

    if (verifySetp === 0) {
      this.setState({ isLoading: true });
      api
        .verifyCode(oldMobile, code)
        .then(res => {
          Alert.alert("提示", "旧手机验证成功，请输入新手机号", [
            { text: "确定", onPress: () => {} }
          ]);
          requestVerifySetpChange(1);
          this.setState({ isLoading: false });
        })
        .catch(e => {
          Alert.alert("提示", "旧手机验证失败:" + e, [
            { text: "确定", onPress: () => {} }
          ]);
          this.setState({ isLoading: false });
        });
    }
    if (verifySetp === 1) {
      if (mobile === oldMobile) {
        Alert.alert("提示", "新旧手机号不能相同", [
          { text: "确定", onPress: () => {} }
        ]);
      } else {
        this.setState({ isLoading: true });
        api
          .verifyCode(mobile, code)
          .then(res => {
            Alert.alert("提示", "新手机验证成功，请点击完成保存", [
              { text: "确定", onPress: () => {} }
            ]);
            requestVerifySetpChange(2);
            this.setState({ isLoading: false });
          })
          .catch(e => {
            Alert.alert("提示", "新手机验证失败:" + e, [
              { text: "确定", onPress: () => {} }
            ]);
            this.setState({ isLoading: false });
          });
      }
    }

    if (verifySetp === 2) {
      this.modif();
    }
  };
  modif = () => {
    const { logout } = this.props;
    this.setState({ isLoading: true });

    api
      .setUserInfo({ UserName: this.state.mobile })
      .then(res => {
        logout();
      })
      .catch(e => {
        this.setState({ isLoading: false });
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
  const { auth: { UserId }, userInfo } = state;
  return { UserId, userInfo };
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
    userInfo: PropTypes.object,
    userLevel: PropTypes.string,
    navigation: PropTypes.object,
    dispatch: PropTypes.func
  };
  state = {
    isModifMobileVisible: false,
    isModifUserNameVisible: false,
    verifySetp: 0
  };
  componentWillMount = async () => {
    const { hasData } = this.props.userInfo;
    if (!["loading", true].includes(hasData)) {
      this.getUserInfo();
    }
    const isRemind = await this.getRemind();
    this.setState({
      isRemind
    });
  };
  getRemind = async () => {
    const asyncGetRemind = () => {
      return new Promise((resolve, reject) => {
        AsyncStorage.getItem("isRemind", (e, result) => {
          if (e) {
            resolve(false);
          } else {
            if (result && result === "1") {
              resolve(true);
            } else {
              resolve(false);
            }
          }
        });
      });
    };

    const result = await asyncGetRemind();

    return result;
  };
  setRemind = () => {
    const { isRemind } = this.state;
    Tip.loading();
    AsyncStorage.setItem("isRemind", !isRemind ? "1" : "0", (e, result) => {
      if (e) {
        Tip.fail("设置失败");
      } else {
        setTimeout(() => {
          this.setState({
            isRemind: !isRemind
          });
          Tip.dismiss();
        }, 500);
      }
    });
  };

  getUserInfo() {
    return this.props
      .dispatch({
        type: "userInfo",
        api: () => {
          return api.getUserInfo();
        },
        promise: true
      })
      .then(data => {})
      .catch(e => {
        Tip.loading("获取用户信息失败");
        console.log("e:reject", e);
      });
  }
  back = () => {
    this.props.navigation.dispatch(action.navigate.back());
  };
  go = routeName => {
    this.props.navigation.dispatch(action.navigate.go({ routeName }));
  };
  logout = () => {
    this.props.navigation.dispatch(action.logout());
    this.props.navigation.dispatch({
      type: "userInfo_result"
    });
    AsyncStorage.removeItem("mobile");
    this.props.navigation.dispatch(action.navigate.go({ routeName: "Login" }));
  };
  renderHeader() {
    const {
      NickName = "-",
      UserCode = "-",
      Level = "-",
      Photo
    } = this.props.userInfo;
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
            <Button
              style={styles.portraitWrapper}
              onPress={() => {
                this.props.navigation.dispatch(
                  action.navigate.go({ routeName: "UpPortrait" })
                );
              }}
            >
              <Icon
                size={60}
                source={Photo ? { uri: Photo } : portraitSource}
              />
            </Button>
            <View style={styles.headerContentRight}>
              <View style={styles.usernameWrapper}>
                <Text style={styles.username}>{NickName}</Text>
                <Button
                  onPress={() => {
                    this.setState({
                      isModifUserNameVisible: true
                    });
                  }}
                  style={styles.editIconButton}
                >
                  <Icon size={16} source={editSource} />
                </Button>
              </View>
              <View style={styles.userIdWrapper}>
                <Text style={styles.userId}>ID:{UserCode}</Text>
                <View style={styles.lvWrapper}>
                  <Image
                    style={styles.lvImg}
                    resizeMode="contain"
                    source={lvSource}
                  />
                  <Text style={styles.lvLabel}>{Level}</Text>
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
        onPress: () => {
          this.props.navigation.dispatch(
            action.navigate.go({ routeName: "DiscountsCard" })
          );
        }
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
              {hasSwitch ? (
                <Switch
                  value={this.state.isRemind}
                  onValueChange={this.setRemind}
                />
              ) : null}
            </Button>
          );
        })}
      </View>
    );
  }
  renderAccount() {
    const { UserName = "-" } = this.props.userInfo;
    return (
      <View style={styles.accountContianer}>
        <Text style={styles.accountTitle}>账号绑定</Text>
        <View style={[styles.accountItem, { paddingLeft: 10 }]}>
          <Text style={styles.accountItemText}>手机号码</Text>
          <View style={styles.accountItemRight}>
            <Text style={styles.accountItemText}>
              {UserName.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")}
            </Text>
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
        {/*
        <View style={[styles.accountItem, { paddingLeft: 10 }]}>
          <Text style={styles.accountItemText}>微信绑定</Text>
          <View style={styles.accountItemRight}>
            <Text style={styles.accountItemText}>--/--</Text>
            <Button textStyle={styles.itemButtonText}>绑定</Button>
          </View>
        </View>
      */}
      </View>
    );
  }
  render() {
    const {
      isModifMobileVisible,
      isModifUserNameVisible,
      verifySetp
    } = this.state;
    const { UserName, NickName } = this.props.userInfo;
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.content}>
            {this.renderList()}
            {this.renderAccount()}
            <View style={styles.accountContianer}>
              <Button
                onPress={() => this.go("Feedback")}
                style={styles.accountItem}
                textStyle={styles.accountItemText}
              >
                客户反馈
              </Button>
              <Button
                onPress={() => {
                  this.props.navigation.dispatch(
                    action.navigate.go({ routeName: "A3" })
                  );
                }}
                style={styles.accountItem}
                textStyle={styles.accountItemText}
              >
                邀请好友
              </Button>
            </View>
            <Button
              onPress={this.logout}
              style={styles.button}
              textStyle={styles.buttonText}
            >
              退出登录
            </Button>
          </View>
        </ScrollView>
        <ModifUserName
          close={() => {
            this.setState({
              isModifUserNameVisible: false
            });
          }}
          NickName={NickName}
          isVisible={isModifUserNameVisible}
          requestChangeNickName={NickName => {
            this.props.dispatch({
              type: "userInfo",
              payload: {
                NickName
              }
            });
          }}
        />
        <ModifMobile
          close={() => {
            this.setState({
              isModifMobileVisible: false
            });
          }}
          requestVerifySetpChange={v => {
            this.setState({
              verifySetp: v
            });
          }}
          StoreId={1}
          oldMobile={UserName}
          isVisible={isModifMobileVisible}
          verifySetp={verifySetp}
          logout={this.logout}
        />
      </View>
    );
  }
}
