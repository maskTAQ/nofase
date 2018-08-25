/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { BackHandler, Platform, ToastAndroid, View, AsyncStorage } from "react-native";
import { Provider, connect } from "react-redux";
import { addNavigationHelpers } from "react-navigation";
import JPushModule from 'jpush-react-native'
import PropTypes from 'prop-types';

import Navigation from "src/Navigation";
import store from 'src/store';
import { Tip, LogoutModal } from 'src/components';
import action from "src/action";
import api from "src/api";
import { WebSocket, Geolocation } from 'src/common';


class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.object,
    nav: PropTypes.object.isRequired,
    auth: PropTypes.object
  };
  state = {
    logoutModalVisible: false
  }
  componentWillMount() {
    //this.autoLogin();
    this.verifyToken();
    this.geolocation();
  }

  componentDidMount() {
    if (Platform.OS === "android") {
      BackHandler.addEventListener("hardwareBackPress", this.handleBack);
    }

  }
  componentWillReceiveProps(nextProps) {
    const { isLogin } = this.props.auth;
    const { isLogin: nextIsLogin, UserId } = nextProps.auth;
    if (!isLogin && nextIsLogin) {
      this.addReceiveNotificationListener(UserId);
      this.linkSocket(UserId)
    }
    if (isLogin && !nextIsLogin) {
      JPushModule.stopPush();
    }
    console.log(nextProps)
  }
  componentWillUnmount() {
    if (Platform.OS === "android") {
      BackHandler.removeEventListener("hardwareBackPress", this.handleBack);
    }
  }
  async geolocation() {
    await Geolocation.init({
      ios: "43486760b696ca29d8bb2f6f3699485a",
      android: "043b24fe18785f33c491705ffe5b6935"
    })

    Geolocation.setOptions({
      interval: 8000,
      distanceFilter: 100
    })
    function bd_encrypt({ longitude, latitude }) {
      const X_PI = Math.PI * 3000.0 / 180.0;
      const x = longitude, y = latitude;
      const z = Math.sqrt(x * x + y * y) + 0.00001 * Math.sin(y * X_PI);
      const theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);
      // const bd_lng = z * Math.cos(theta) + 0.001;
      const bd_lng = z * Math.cos(theta) + 0.0065;
      const bd_lat = z * Math.sin(theta) + 0.006;
      return {
        latitude: bd_lat,
        longitude: bd_lng
      };
    }

    Geolocation.addLocationListener(location => {
      store.dispatch({
        type: 'location',
        payload: Object.assign(location, bd_encrypt(location))
      })

    })
    Geolocation.start();
  }
  linkSocket = async (UserId) => {
    this.ws = await WebSocket.uniqueLoginWebsocket(UserId, () => {
      this.setState({
        logoutModalVisible: true
      });
    })
      .catch(e => ({ close: () => { } }));
    WebSocket.QRWebsocket(UserId)
      .then(res => {
        // this.props.navigation.dispatch(
        //   action.navigate.go({ routeName: "Pay" })
        // );
      })
      .catch(e => {
        Tip.fail("连接商家失败");
      });
  }

  logout = () => {
    this.setState(
      {
        logoutModalVisible: false
      },
      () => {
        AsyncStorage.removeItem("mobile");
        this.props.dispatch(action.logout());
        this.props.dispatch(
          action.navigate.go({ routeName: "Login" })
        );
        this.props.dispatch({
          type: "userInfo_reset"
        });
      }
    );
  };
  autoLogin() {
    AsyncStorage.getItem('mobile', (e, m) => {
      if (!e && m) {
        api.rememberLogin({ Tel: m })
          .then(res => {
            this.props.dispatch(
              action.login(res)
            );
            this.props.dispatch(action.navigate.go({ routeName: "Home" }));
          })
          .catch(e => {

          })
      }
    });
  }
  verifyToken() {
    api.token()
      .then(res => {
        if (res.data !== 'token') {
          Platform.OS === "android" && BackHandler.exitApp();
        }
      })
      .catch(e => {
        //console.log(e)
      })
  }
  addReceiveNotificationListener(UserId) {
    if (Platform.OS === 'android') {
      JPushModule.initPush()
      JPushModule.getInfo(map => {
        this.setState({
          appkey: map.myAppKey,
          imei: map.myImei,
          package: map.myPackageName,
          deviceId: map.myDeviceId,
          version: map.myVersion
        })
      })
      JPushModule.notifyJSDidLoad(resultCode => {
        console.log(resultCode)
      })
    } else {
      JPushModule.setupPush();

    }
    /**
       * 请注意这个接口要传一个数组过去，这里只是个简单的示范
       */
    JPushModule.setTags([String(UserId)], map => {
      if (map.errorCode === 0) {
        console.log('Tag operate succeed, tags: ' + map.tags)
      } else {
        console.log('error code: ' + map.errorCode)
      }
    })
    JPushModule.addReceiveOpenNotificationListener(map => {
      const { isLogin } = this.props.auth;
      if (isLogin) {
        this.props.dispatch(
          action.navigate.go({ routeName: "Pay" })
        );
      }

    })
  }
  handleBack = () => {
    const { nav } = this.props;
    const routeName = nav.routes[nav.index].routeName;
    if (nav.routes.length > 1 && !["Home"].includes(routeName)) {
      this.props.dispatch(action.navigate.back());
      return true;
    }
    if (routeName === "Home") {
      if (this.lastBack && new Date().getTime() - this.lastBack < 2000) {
        this.ws && this.ws.close();
        BackHandler.exitApp();
      } else {
        this.lastBack = new Date().getTime();
        ToastAndroid.show("再按一次返回键退出程序", 2000);
      }
      return true;
    }
    return false;
  };
  render() {
    const { dispatch, nav } = this.props;
    const { logoutModalVisible } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Navigation navigation={addNavigationHelpers({ dispatch, state: nav })} />
        <LogoutModal logout={this.logout} isVisible={logoutModalVisible} />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    nav: state.nav,
    auth: state.auth
  })
};

const AppWithNavigationState = connect(mapStateToProps)(App);

export default class Root extends Component {
  state = {};
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <AppWithNavigationState />
          <Tip />
        </View>
      </Provider>
    );
  }
}
