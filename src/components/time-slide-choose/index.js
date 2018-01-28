import React, { Component } from "react";
import { View, PanResponder, Dimensions, Text } from "react-native";
import PropTypes from "prop-types";
import styles from "./style";

class Dragable {
  constructor(config) {
    const { height, width } = Dimensions.get("window");
    Object.assign(
      this,
      {
        PanResponder,
        currentControlButton: "", //['start','end']
        screen: { height, width: width },
        listenner: {
          barChange() {},
          nodeChange() {}
        }
      },
      config
    );
    console.log(width, styles.container.padding);
  }
  button = {
    start: null,
    end: null
  };
  setButtonRef(type, ref) {
    if (this.button[type]) {
      return;
    }
    const {
      button,
      startIndex,
      endIndex,
      nodeCount,
      screen,
      buttonStyle: { width },
      listenner: { barChange }
    } = this;
    const ratio = (type === "start" ? startIndex : endIndex) / nodeCount;
    const left = ratio * (screen.width - width);
    this.button[type] = ref;
    ref.setNativeProps({
      style: { left }
    });
    this.button[type].left = left;

    if (this.button.start && this.button.end) {
      barChange({
        left: button.start.left + width / 2,
        right: screen.width - button.end.left - width * 2
      });
    }
  }
  isCanMove(left) {
    const { screen, buttonStyle, button, currentControlButton } = this;
    if (currentControlButton === "start" && left > button.end.left) {
      return false;
    }
    if (
      currentControlButton === "end" &&
      button.start.left + buttonStyle.width > left
    ) {
      return false;
    }
    return left > 0 && left < screen.width - buttonStyle.width;
  }
  calculateNodeIndex() {
    const { screen, buttonStyle, button } = this;
    const pathwayWidth = screen.width - buttonStyle.width;
    return {
      startIndex: Math.round(button.start.left / pathwayWidth * 5),
      endIndex: Math.round(button.end.left / pathwayWidth * 5)
    };
  }
  injectDragListener(type) {
    const panResponder = this.PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderTerminationRequest: () => false,
      onShouldBlockNativeResponder: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        this.currentControlButton = type;
      },
      onPanResponderMove: (evt, gestureState) => {
        const { moveX } = gestureState;
        const {
          currentControlButton,
          listenner: { barChange },
          button,
          buttonStyle: { width },
          screen
        } = this;

        if (this.isCanMove(moveX)) {
          button[currentControlButton].setNativeProps({
            style: { left: moveX - width }
          });
          button[currentControlButton].left = moveX - width;
          barChange({
            left: button.start.left + width / 2,
            right: screen.width - button.end.left - width * 2
          });
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        const { listenner: { nodeChange } } = this;
        nodeChange(this.calculateNodeIndex());
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      }
    });
    return panResponder.panHandlers;
  }
}

export default class TimeSlideChoose extends Component {
  static defaultProps = {
    startIndex: 0,
    endIndex: 0
  };
  static propTypes = {
    startIndex: PropTypes.number,
    endIndex: PropTypes.number
  };
  state = {
    barStyle: {
      left: 0,
      right: 0
    }
  };
  componentWillMount() {
    this.setState({ ...this.props });

    this.dragable = new Dragable({
      startIndex: 1,
      endIndex: 2,
      nodeCount: 5,
      buttonStyle: styles.circle,
      listenner: {
        barChange: location => {
          this.setState({
            barStyle: location
          });
        },
        nodeChange(a) {
          // console.log(a)
        }
      }
    });
  }

  config = {
    nodeCount: 5
  };
  calculateBarLocation({ left, right }) {}
  render() {
    const { barStyle } = this.state;
    const data = ["今日", "次日", "俩日内", "三日内", "四日内"];
    return (
      <View style={styles.container}>
        <View style={styles.sliderWrapper}>
          <View style={styles.pathway} />
          <View
            style={styles.circle}
            ref={e => this.dragable.setButtonRef("start", e)}
            {...this.dragable.injectDragListener("start")}
          />
          <View style={[styles.bar, barStyle]} />
          <View
            style={styles.circle}
            ref={e => this.dragable.setButtonRef("end", e)}
            {...this.dragable.injectDragListener("end")}
          />
        </View>
        <View style={styles.label}>
          {data.map(item => {
            return (
              <Text style={styles.labelItem} key={item}>
                {item}
              </Text>
            );
          })}
        </View>
      </View>
    );
  }
}
