import React, { Component } from "react";
import { View, Text, Image, CheckBox } from "react-native";

import styles from '../recharge/style';
import { Input, Button } from "src/components";
export default class recharge extends Component {

    render() {
        return (
            <View style={styles.index}>
            <View>
            <Text>
                充值金额：
             </Text>
            </View>
           <View  style={styles.indexipnut} >
           <Input style={styles.indexipnt} value="" />
           <Text style={styles.indexy}>元</Text>
           </View>
           <Text>当前余额：123213</Text>
            </View>
        )
    }
}