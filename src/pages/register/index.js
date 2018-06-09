import React, { Component } from "react";
import { View, Image, AsyncStorage } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Input, Icon, Button, CodeButton, Page } from "src/components";
import api from "src/api";
import { Tip } from "src/common";
import action from "src/action";
import styles from "../login/style";
import { computeSize } from "src/common";
const logoSource = require("src/images/login/logo.png");
@connect()
export default class Register extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };
  state = {
    NickName: "",
    Tel: "",
    ExCode: ""
  };
  handleValueChange(type, value) {
    this.setState({
      [type]: value
    });
  }
  register = () => {
    const { NickName, ExCode, Tel } = this.state;
    api
      .register({ NickName, Tel, ExCode })
      .then(res => {
        this.props.navigation.dispatch(action.login(res));
        this.props.navigation.dispatch(
          action.navigate.go({ routeName: "Home" })
        );
        AsyncStorage.setItem("mobile", Tel);
      })
      .catch(e => {
        console.log(e, 1);
        Tip.fail(e);
      });
  };
  render() {
    const { NickName, ExCode, Tel } = this.state;
    return (
      <Page title="登录">
        <View style={[styles.container, { paddingTop: computeSize(20) }]}>
          <View style={styles.logo}>
            <View style={styles.logoWrapper}>
              <Icon source={logoSource} size={computeSize(80)} />
            </View>
          </View>
          <View style={styles.form}>
            <View style={styles.formItem}>
              <Image
                source={require("src/images/login/username.png")}
                style={styles.formItemImg}
              />
              <Input
                value={NickName}
                onChangeText={v => {
                  this.handleValueChange("NickName", v.substring(0, 11));
                }}
                style={styles.formItemInput}
                placeholder="用户名"
                placeholderTextColor="#fff"
              />
            </View>
            <View style={styles.formItem}>
              <Image
                source={require("src/images/login/phone.png")}
                style={styles.formItemImg}
              />
              <Input
                value={Tel}
                onChangeText={v => {
                  this.handleValueChange("Tel", v);
                }}
                style={styles.formItemInput}
                keyboardType="numeric"
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
                value={ExCode}
                onChangeText={v => {
                  this.handleValueChange("ExCode", v.substring(0, 7));
                }}
                style={styles.formItemInput}
                keyboardType="numeric"
                placeholder="手机验证码"
                placeholderTextColor="#fff"
              />
              <CodeButton
                ref={e => (this.codeRef = e)}
                phone={Tel}
                loading={false}
              >
                验证码
              </CodeButton>
            </View>
            <Button
              onPress={this.register}
              style={styles.loginButton}
              textStyle={styles.loginText}
            >
              完成注册
            </Button>
          </View>
        </View>
      </Page>
    );
  }
}
