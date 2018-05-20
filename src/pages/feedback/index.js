import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  Modal,
  Linking,
  ScrollView,
  Image,
  TouchableWithoutFeedback
} from "react-native";
import action from "src/action";
import PropTypes from "prop-types";

import data from "./data";
import { Page, Button, Icon } from "src/components";
import styles from "./style";

const QAModal = ({ QA, isVisible, onRequestClose }) => {
  if (!QA) {
    return null;
  }
  const { q, a } = QA;
  return (
    <Modal
      //animationType={"slide"}
      transparent={true}
      visible={isVisible}
    >
      <TouchableWithoutFeedback onPress={onRequestClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{q}</Text>
              <Button onPress={onRequestClose}>
                <Icon size={20} source={require("./img/u284.png")} />
              </Button>
            </View>
            <View style={styles.modalLine} />

            <View style={styles.modalDetailsWrapper}>
              <ScrollView>
                {a.split(/\n/).map(item => {
                  if (item.includes("source")) {
                    return (
                      <Image
                        resizeMode="stretch"
                        style={styles.modalImg}
                        source={/source:([0-9]+)/.exec(item)[1]}
                        key={item}
                      />
                    );
                  } else {
                    return (
                      <Text style={styles.modalDetails} key={item}>
                        {item}
                      </Text>
                    );
                  }
                })}
              </ScrollView>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
QAModal.propTypes = {
  QA: PropTypes.object,
  isVisible: PropTypes.bool,
  onRequestClose: PropTypes.func
};
export default class Feedback extends Component {
  static defaultProps = {};
  static propTypes = {
    navigation: PropTypes.object
  };
  state = {
    isQAModalVisible: false,
    activeQA: null
  };
  store = {
    data
  };
  feedback = () => {
    this.props.navigation.dispatch(
      action.navigate.go({ routeName: "FeedbackProblem" })
    );
  };
  showModal(item) {
    this.setState({
      isQAModalVisible: true,
      activeQA: item
    });
  }
  closeModal = () => {
    this.setState({
      isQAModalVisible: false,
      activeQA: null
    });
  };
  call(mobile) {
    return Linking.openURL(`tel:${mobile}`)
      .then(supported => {
        console.log(supported);
      })
      .catch(err => {
        console.error("An error occurred", err);
      });
  }
  renderHeader() {
    return (
      <View style={styles.header}>
        <Text style={styles.title}>Hi,这里是没脸运动</Text>
        <Text style={styles.subtitle}>已为您定制以下内容</Text>
      </View>
    );
  }
  renderItem(item) {
    const { q } = item;
    return (
      <Button onPress={() => this.showModal(item)} style={styles.item} key={q}>
        <Text style={styles.itemLabel}>{q}</Text>
      </Button>
    );
  }
  renderList() {
    const { data } = this.store;
    return (
      <View style={styles.list}>
        <View style={styles.listTitleWrapper}>
          <Text style={styles.listTitle}>猜你想问</Text>
        </View>
        <FlatList
          data={data}
          extraData={this.state}
          keyExtractor={item => item.q}
          renderItem={({ item }) => this.renderItem(item)}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        />
      </View>
    );
  }
  render() {
    const { isQAModalVisible, activeQA } = this.state;
    return (
      <Page title="用户反馈">
        <ScrollView>
          <View style={styles.container}>
            <QAModal
              QA={activeQA}
              isVisible={isQAModalVisible}
              onRequestClose={this.closeModal}
            />
            {this.renderHeader()}
            {this.renderList()}
            <Button
              onPress={this.feedback}
              style={styles.feedback}
              textStyle={styles.feedbackText}
            >
              我要反馈
            </Button>
            <View style={styles.contact}>
              <View style={styles.contactItem}>
                <View style={styles.contactItemLabel}>
                  <Text style={styles.contactItemLabelText}>总站客服:</Text>
                </View>
                <Button
                  onPress={() => {
                    this.call("075521044375");
                  }}
                  style={styles.call}
                >
                  <Text style={styles.callText}>0755-2104-4375</Text>
                  <Icon size={20} source={require("./img/u204.png")} />
                </Button>
              </View>
            </View>
          </View>
        </ScrollView>
      </Page>
    );
  }
}
