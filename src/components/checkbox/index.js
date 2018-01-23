import React, { Component } from "react";
import { View, Text, TouchableOpacity, CheckBox } from "react-native";

import styles from '../recharge/style';
import { Input, Button, CheckBox } from "src/components";

export default class CheckBox extends Component {
    static defaultProps = {
        data: [{
            label: (<Text>12</Text>),
            value: 1,
        }, {
            label: 2,
            value: 2
        }],
        selected: 2,
        onChangeValue() { }
    }
    render() {
        const { data, onChangeValue, selected } = this.props;
        return (
            <View styles={styles.container}>
                {
                    data.map(item => {
                        const { label, value } = item;
                        const isActive = value === selected;
                        return (
                            <TouchableOpacity onPress={() => {
                                onChangeValue(value);
                            }} style={[styles.itemContainer, isActive ? styles.itemContainerActive : null]}>
                            <Tex t>{label}</Tex>
                            <Icon size={20} source={isActive?require(''):require('')}></Icon>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }
}