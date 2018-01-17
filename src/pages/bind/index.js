import React, { Component } from "react";
import { View, Text, Image } from "react-native";

import styles from '../login/style';
import { Input, Button } from "src/components";
export default class Bind extends Component {
    state = {
        phone: '',
        code: ''
    };
    handleValueChange(type, value) {
        this.setState({
            [type]: value
        })
    }
    render() {
        const { phone, code } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.logo}>
                    <Image source={require('src/images/login/logo.png')} style={styles.logoImg}></Image>
                    <Text style={styles.logoLabel}>GYM</Text>
                </View>
                <View style={styles.form}>
                    <View style={styles.formItem}>
                        <Image source={require('src/images/login/phone.png')} style={styles.formItemImg}></Image>
                        <Input value={phone} onChangeText={(v) => {
                            this.handleValueChange('phone', v)
                        }} style={styles.formItemInput} placeholder="手机号码" placeholderTextColor="#fff" />
                    </View>
                    <View style={styles.formItem}>
                        <Image source={require('src/images/login/code.png')} style={styles.formItemImg}></Image>
                        <Input value={code} onChangeText={(v) => {
                            this.handleValueChange('code', v)
                        }} style={styles.formItemInput} placeholder="验证码" placeholderTextColor="#fff" />
                        <Button style={styles.code} textStyle={styles.codeText}>验证码</Button>
                    </View>
                    <Button style={styles.loginButton} textStyle={styles.loginText}>绑定完成</Button>
                </View>
            </View>
        )
    }
}