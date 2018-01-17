import React, { Component } from "react";
import { View, Text, Image } from "react-native";

import styles from './style';
import { Input, Button } from "src/components";
export default class Login extends Component {
    state = {
        username: '',
        password: ''
    };
    handleValueChange(type, value) {
        this.setState({
            [type]: value
        })
    }
    render() {
        const { username, password } = this.state;
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
                        <Image source={require('src/images/login/password.png')} style={styles.formItemImg}></Image>
                        <Input value={password} onChangeText={(v) => {
                            this.handleValueChange('password', v)
                        }} style={styles.formItemInput} placeholder="密码" placeholderTextColor="#fff" />
                        <Button style={styles.code} textStyle={styles.codeText}>验证码</Button>
                    </View>
                    <Button style={styles.loginButton} textStyle={styles.loginText}>立即登录</Button>
                    <View style={styles.register}>
                        <Button textStyle={styles.registerText}> 注册账号</Button>
                    </View>

                </View>
                <Image source={require('src/images/login/bg.png')} style={styles.bg} resizeMode="stretch"></Image>
                <View style={styles.relevancechar}>
                    <Text style={styles.relevanceText}>关联登录</Text>
                    <Button textStyle={styles.registerText}>
                        <Image source={require('src/images/login/wechat.png')} style={styles.charImg}></Image>
                    </Button>
                </View>
            </View>
        )
    }
}