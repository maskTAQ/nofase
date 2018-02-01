import React, { Component } from "react";
import { View, Text, Image, Switch, ScrollView } from "react-native";
import PropTypes from "prop-types";

import { Button, Icon, Alert, Input } from "src/components";
import styles from "./style";
import action from "src/action";

class ModifMobile extends Component {
  static propTypes = {
    isVisible: PropTypes.bool
  };
  state = {
    mobile: "",
    code: ""
  };
  changeValue(value, type) {
    this.setState({
      [type]: value
    });
  }
  render() {
    const { isVisible } = this.props;
    const { mobile, code } = this.state;
    return (
      <Alert isVisible={isVisible}>
        <View style={styles.modalContianer}>
          <View style={styles.modalItemWrapper}>
            <Icon size={24} source={require("./img/u16.png")} />
            <Input
              value={mobile}
              onChangeText={v => {
                this.changeValue(v, "mobile");
              }}
              style={styles.modalItemInput}
              placeholder="旧手机号码"
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
            <Button style={styles.codeButotn} textStyle={styles.codeButotnText}>
              验证码
            </Button>
          </View>
          <Button style={styles.sumbit} textStyle={styles.sumbitText}>
            完成
          </Button>
        </View>
      </Alert>
    );
  }
}
class ModifPortrait extends Component {
  static propTypes = {
    isVisible: PropTypes.bool,
    userId: PropTypes.string,
    userLevel: PropTypes.string,
    navigation: PropTypes.object
  };
  state = {
    mobile: "",
    code: ""
  };
  changeValue(value, type) {
    this.setState({
      [type]: value
    });
  }
  render() {
    const { isVisible } = this.props;
    //const { mobile, code } = this.state;
    return (
      <Alert isVisible={isVisible} location="bottom">
        <View style={styles.modalContianer}>
          <Text>12</Text>
        </View>
      </Alert>
    );
  }
}
export default class User extends Component {
  static defaultProps = {
    username: "上都牧人",
    userId: "gym_8732789",
    userLevel: "02"
  };
  static propTypes = {
    username: PropTypes.string,
    userId: PropTypes.string,
    userLevel: PropTypes.string,
    navigation: PropTypes.object
  };
  state = {
    modifMobileVisible: true
  };
  back = () => {
    console.log(this.props);
    this.props.navigation.dispatch(action.navigate.back());
  };
  renderHeader() {
    const { username, userId, userLevel } = this.props;
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
                <Text style={styles.userId}>ID:{userId}</Text>
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
            <Button textStyle={styles.itemButtonText}>更换</Button>
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
    const { modifMobileVisible } = this.state;
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
        <ModifMobile isVisible={false} />
        <ModifPortrait isVisible={modifMobileVisible} />
      </View>
    );
  }
}
