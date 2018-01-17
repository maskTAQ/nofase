import React, { Component } from "react";
import { View, Text, Image } from "react-native";

import styles from '../login/style';
import { Input, Button } from "src/components";
export default class Register extends Component {
    state = {
        username: '',
        phone:'',
        code: ''
    };
    handleValueChange(type, value) {
        this.setState({
            [type]: value
        })
    }
    render() {
        const { username, code,phone } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.logo}>
                    <Image source={require('src/images/login/logo.png')} style={styles.logoImg}></Image>
                    <Text style={styles.logoLabel}>GYM</Text>
                </View>
                <View style={styles.form}>
                    <View style={styles.formItem}>
                        <Image source={require('src/images/login/username.png')} style={styles.formItemImg}></Image>
                        <Input value={username} onChangeText={(v) => {
                            this.handleValueChange('username', v)
                        }} style={styles.formItemInput} placeholder="用户名" placeholderTextColor="#fff" />
                    </View>
                    <View style={styles.formItem}>
                        <Image source={require('src/images/login/phone.png')} style={styles.formItemImg}></Image>
                        <Input value={phone} onChangeText={(v) => {
                            this.handleValueChange('phone', v)
                        }} style={styles.formItemInput} placeholder="手机号" placeholderTextColor="#fff" />
                    </View>
                    <View style={styles.formItem}>
                        <Image source={require('src/images/login/code.png')} style={styles.formItemImg}></Image>
                        <Input value={code} onChangeText={(v) => {
                            this.handleValueChange('code', v)
                        }} style={styles.formItemInput} placeholder="验证码" placeholderTextColor="#fff" />
                        <Button style={styles.code} textStyle={styles.codeText}>验证码</Button>
                    </View>
                    <Button style={styles.loginButton} textStyle={styles.loginText}>完成注册</Button>
                </View>
            </View>
        )
    }
}