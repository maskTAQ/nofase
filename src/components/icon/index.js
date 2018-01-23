import React from "react";
import { Image, View } from "react-native";
import PropTypes from "prop-types";

const Icon = ({ size, source, style = {} }) => {
  return (
    <View style={style}>
      <Image style={{ width: size, height: size }} source={source} />
    </View>
  );
};
Icon.propTypes = {
  size: PropTypes.number,
  source: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
export default Icon;
