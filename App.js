/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { BackHandler, Platform, ToastAndroid, View, AsyncStorage, } from "react-native";
import { Provider, connect } from "react-redux";
import { addNavigationHelpers } from "react-navigation";

import PropTypes from 'prop-types';

import Navigation from "src/Navigation";

import store from 'src/store';
import { Tip } from 'src/components';
import action from "src/action";
import api from "src/api";

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.object,
    nav: PropTypes.object.isRequired,
  };
  componentWillMount() {
    //监听dispatch事件 由onDispatch统一发送action
    AsyncStorage.getItem('mobile', (e, m) => {
      if (!e && m) {
        api.rememberLogin({ Tel: m })
          .then(res => {
            this.props.dispatch(
              action.login(res)
            );
            this.props.dispatch(
              action.navigate.go({ routeName: "Home" })
            );
          })
          .catch(e => {

          })
      }
    })

    api.token()
      .then(res => {

        if (res.data !== 'token') {
          Platform.OS === "android" && BackHandler.exitApp();
        }
      })
      .catch(e=>{
        console.log(e)
      })
  }
  componentDidMount() {
    if (Platform.OS === "android") {
      BackHandler.addEventListener("hardwareBackPress", this.handleBack);
    }

  }
  componentWillUnmount() {
    if (Platform.OS === "android") {
      BackHandler.removeEventListener("hardwareBackPress", this.handleBack);
    }
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
        BackHandler.exitApp()
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
    return (
      <Navigation navigation={addNavigationHelpers({ dispatch, state: nav })} />
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    nav: state.nav
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
