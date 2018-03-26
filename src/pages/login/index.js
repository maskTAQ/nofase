import React, { Component } from "react";
import { View, Text, Image, AsyncStorage, StatusBar } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import styles from "./style";
import { Input, Button, ShareModal, CodeButton } from "src/components";
import action from "src/action";
import api from "src/api";
import { Tip } from "src/common";

@connect()
export default class Login extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };
  state = {
    phone: "13696526122",
    code: "13"
  };
  handleValueChange(type, value) {
    this.setState({
      [type]: value
    });
  }
  login = () => {
    const { phone, code } = this.state;
    // if (!this.codeRef.isGetCode) {
    //   return Tip.fail("请先获取验证码");
    // }
    return api
      .login({ Tel: phone, ExCode: code })
      .then(res => {
        console.log(res);
        AsyncStorage.setItem("mobile", phone);
        this.props.navigation.dispatch(action.login(res));
        this.props.navigation.dispatch(
          action.navigate.go({ routeName: "Home" })
        );
      })
      .catch(e => {
        Tip.fail(e);
      });
  };
  register = () => {
    this.props.navigation.dispatch(
      action.navigate.go({ routeName: "Register" })
    );
  };
  render() {
    const { phone, code } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="#1a98e0"
          translucent={true}
          barStyle="light-content"
        />
        <View style={styles.logo}>
          <Image
            source={require("src/images/login/logo.png")}
            style={styles.logoImg}
          />
          <Text style={styles.logoLabel}>GYM</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.formItem}>
            <Image
              source={require("src/images/login/username.png")}
              style={styles.formItemImg}
            />
            <Input
              value={phone}
              onChangeText={v => {
                this.handleValueChange("phone", v);
              }}
              style={styles.formItemInput}
              placeholder="用户名"
              placeholderTextColor="#fff"
            />
          </View>
          <View style={styles.formItem}>
            <Image
              source={require("src/images/login/code.png")}
              style={styles.formItemImg}
            />
            <Input
              value={code}
              onChangeText={v => {
                this.handleValueChange("code", v);
              }}
              style={styles.formItemInput}
              placeholder="密码"
              placeholderTextColor="#fff"
            />
            <CodeButton
              ref={e => (this.codeRef = e)}
              phone={phone}
              loading={false}
            >
              验证码
            </CodeButton>
          </View>
          <Button
            onPress={this.login}
            style={styles.loginButton}
            textStyle={styles.loginText}
          >
            立即登录
          </Button>
          <View style={styles.register}>
            <Button onPress={this.register} textStyle={styles.registerText}>
              注册账号
            </Button>
          </View>
        </View>
        <Image
          source={require("src/images/login/bg.png")}
          style={styles.bg}
          resizeMode="stretch"
        />
        <View style={styles.relevancechar}>
          <Text style={styles.relevanceText}>关联登录</Text>
          <Button textStyle={styles.registerText}>
            <Image
              source={require("src/images/login/wechat.png")}
              style={styles.charImg}
            />
          </Button>
        </View>
        <ShareModal
          isVisible={false}
          username="上都牧人"
          time="01:48:08"
          sum={32.0}
          discount={8}
          storeName="海里恩健身俱乐部"
          onlinePeople={20}
          addr="深南大道与前海教会处振业星海商业广场31"
          close={() => {}}
        >
          <Text>12</Text>
        </ShareModal>
      </View>
    );
  }
}
