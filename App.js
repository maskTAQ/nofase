/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider, connect } from "react-redux";
import { addNavigationHelpers } from "react-navigation";

import Navigation from "src/Navigation";
import store from 'src/store';

class App extends Component {
  render() {
    return (
      <Navigation
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav
        })}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    nav: state.nav
  })
};

const AppWithNavigationState = connect(mapStateToProps)(App);
export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}
