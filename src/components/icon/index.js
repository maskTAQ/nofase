import React from "react";
import { Image } from "react-native";
import PropTypes from "prop-types";

const Icon = ({ size, source }) => {
  return <Image style={{ width: size, height: size }} source={source} />;
};
Icon.propTypes = {
  size: PropTypes.number,
  source: PropTypes.number
};
export default Icon;
