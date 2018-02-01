import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import styles from "./style";
import { Input, Button, ShareModal } from "src/components";
import action from "src/action";

@connect()
export default class Login extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };
  state = {
    username: "",
    password: ""
  };
  handleValueChange(type, value) {
    this.setState({
      [type]: value
    });
  }
  login = () => {
    this.props.navigation.dispatch(action.navigate.go({ routeName: "Home" }));
  };
  register = () => {
    this.props.navigation.dispatch(
      action.navigate.go({ routeName: "Register" })
    );
  };
  render() {
    const { username, password } = this.state;
    return (
      <View style={styles.container}>
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
              value={username}
              onChangeText={v => {
                this.handleValueChange("username", v);
              }}
              style={styles.formItemInput}
              placeholder="用户名"
              placeholderTextColor="#fff"
            />
          </View>
          <View style={styles.formItem}>
            <Image
              source={require("src/images/login/password.png")}
              style={styles.formItemImg}
            />
            <Input
              value={password}
              onChangeText={v => {
                this.handleValueChange("password", v);
              }}
              style={styles.formItemInput}
              placeholder="密码"
              placeholderTextColor="#fff"
            />
            <Button style={styles.code} textStyle={styles.codeText}>
              验证码
            </Button>
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
