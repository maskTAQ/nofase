import React, { Component } from "react";
import { View, Text, Image, CheckBox } from "react-native";

import styles from '../recharge/style';
import { Input, Button,CheckBox } from "src/components";
export default class recharge extends Component {

    render() {
        return (
            <View style={styles.container}>

                <Text style={styles.rechargeLabel}>
                    充值金额：
             </Text>

                <View style={styles.inputContainer} >
                    <Input style={styles.input} value="" />
                    <View style={styles.inputLabelWrapper}>
                    <Text style={styles.inputLabel}>元</Text>
                    </View>
                </View>
                <View style={styles.balanceWrapper}>
                    <Text style={{ color: "#1e89e4" }}>当前余额：123213</Text>
                </View>
                <Text  style={styles.checklabel }>选择支付方式：</Text>
               <CheckBox></CheckBox>
            </View>
        )
    }
}