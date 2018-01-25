/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider, connect } from "react-redux";
import { addNavigationHelpers } from "react-navigation";
import { createStore } from 'redux';
import PropTypes from 'prop-types';

import Navigation from "src/Navigation";
import AppReducer from 'src/reducers';
import initStore from 'src/store';

const App = ({ dispatch, nav }) => (
  <Navigation navigation={addNavigationHelpers({ dispatch, state: nav })} />
);
App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
  return ({
    nav: state.nav
  })
};

const AppWithNavigationState = connect(mapStateToProps)(App);

export default class Root extends Component {
  store = createStore(AppReducer, initStore);
  render() {
    return (
      <Provider store={this.store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}
