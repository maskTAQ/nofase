import React, { Component } from "react";
import { Image } from "react-native";
import PropTypes from "prop-types";


const Icon = ({ size, source}) => {
    return (
        <Image style={style} source={source}></Image>
    );
};
Icon.propTypes = {
    size:PropTypes.number,
    source:PropTypes.number
};
export default Icon;