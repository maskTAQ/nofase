import React, { Component } from "react";
import { WebView, View } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import styles from "./style";
import { share } from "src/common";
import { Page, Button, Icon, ShareBar } from "src/components";
import action from "src/action";
//import action from "src/action";

//import { navigate } from "hx/actions";

/**
 * Html网页
 */
@connect()
export default class RechargeWebview extends Component {
  static propTypes = {
    source: PropTypes.string,
    title: PropTypes.string,
    webViewProps: PropTypes.object,
    dispatch: PropTypes.func,
    navigation: PropTypes.any
  };

  state = {
    title: "",
    canGoBack: false,
    backButtonEnabled: false,
    forwardButtonEnabled: false,
    loading: true,
    scalesPageToFit: true,
    isShareBarVisible: false
  };

  componentWillMount() {
    const { AdvStoreName } = this.props.navigation.state.params;
    this.setState({
      title: AdvStoreName
    });

    console.log(this.props);
  }

  goBack = () => {
    this.webView.goBack();
  };

  goForward = () => {
    this.webView.goForward();
  };

  reload = () => {
    this.webView.reload();
  };

  pop = () => {
    // this.props.dispatch(navigate.pop());
  };

  handleLoadStart = () => {
    this.setState({ title: "加载中..." });
  };

  handleLoadEnd = () => {};

  handleNavigationStateChange = e => {
    const { title } = this.props.navigation.state.params;
    if (!e.loading) {
      this.setState({
        title: e.title || title,
        canGoBack: e.canGoBack
      });
    }
  };

  handleBack = () => {
    if (this.state.canGoBack) {
      this.goBack();
    } else {
      this.pop();
    }
  };

  handleClose = () => {
    //this.props.dispatch(navigate.pop());
  };
  share = platform => {
    const {
      AdvUrl,
      ImgUrl,
      AdvStoreName,
      content
    } = this.props.navigation.state.params;
    share({
      title: AdvStoreName,
      content: content,
      url: AdvUrl,
      imgSrc: ImgUrl,
      platform
    })
      .then(res => {
        this.setState({ isShareBarVisible: false });
      })
      .catch(e => {
        this.setState({ isShareBarVisible: false }, () => {
          this.props.navigation.dispatch(action.navigate.back());
        });
      });
  };
  render() {
    const { isShareBarVisible } = this.state;
    const { AdvUrl, AdvStoreName } = this.props.navigation.state.params;
    return (
      <Page
        title={AdvStoreName}
        RightComponent={
          <Button
            onPress={() => {
              this.setState({
                isShareBarVisible: !this.state.isShareBarVisible
              });
            }}
          >
            <Icon size={14} source={require("./img/share.png")} />
          </Button>
        }
      >
        <View style={styles.container}>
          <WebView
            ref={ref => {
              this.webView = ref;
            }}
            automaticallyAdjustContentInsets={false}
            style={styles.wrap}
            source={{ uri: AdvUrl }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            decelerationRate="normal"
            onNavigationStateChange={this.handleNavigationStateChange}
            startInLoadingState={true}
            onLoadStart={this.handleLoadStart}
            onLoadEnd={this.handleLoadEnd}
            scalesPageToFit={this.state.scalesPageToFit}
            {...this.props.webViewProps}
          />
          <ShareBar
            isVisible={isShareBarVisible}
            share={this.share}
            close={() => {
              this.setState({ isShareBarVisible: false });
            }}
          />
        </View>
      </Page>
    );
  }
}
