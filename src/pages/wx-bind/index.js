import React, { Component } from "react";
import { View, Text, Image, StatusBar } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import styles from "./style";
import { Input, Button, CodeButton } from "src/components";
import action from "src/action";
import api from "src/api";
import { Tip } from "src/common";

@connect()
export default class WxBind extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };
  state = {
    phone: "",
    code: ""
  };
  handleValueChange(type, value) {
    this.setState({
      [type]: value
    });
  }
  login = () => {
    const { phone, code } = this.state;
    const {
      userName: WxCode,
      userId: WxOpenId,
      userAvatar: WxPhoto,
      userGender
    } = this.props.navigation.state.params;
    // if (!this.codeRef.isGetCode) {
    //   return Tip.fail("请先获取验证码");
    // }
    api
      .WxBind({
        Tel: phone,
        ExCode: code,
        WxCode,
        WxOpenId,
        WxPhoto,
        WxSex: userGender === "m" ? 1 : 2
      })
      .then(res => {
        Tip.success("绑定成功");
        this.props.navigation.dispatch(action.navigate.back());
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
              placeholder="手机号"
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
              placeholder="验证码"
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
            立即绑定
          </Button>
          <View style={styles.register}>
            <Button onPress={this.register} textStyle={styles.registerText}>
              注册账号
            </Button>
          </View>
        </View>
      </View>
    );
  }
}
