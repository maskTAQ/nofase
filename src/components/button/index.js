import React from "react";
import { TouchableOpacity,Text } from "react-native";
import PropTypes from "prop-types";

const Button = ({ children, style, onPress ,textStyle}) => {
    return (
        <TouchableOpacity style={style} onPress={onPress}>
            <Text style={textStyle}>{children}</Text>
        </TouchableOpacity>
    );
};

Button.propTypes = {
    style: PropTypes.object,
    children: PropTypes.any,
    onPress: PropTypes.func,
    textStyle:PropTypes.object,
};

export default Button;
