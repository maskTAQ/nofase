import React from "react";
import { Image, View } from "react-native";
import PropTypes from "prop-types";

const Icon = ({ size, source, style = {}, iconStyle = {} }) => {
  return (
    <View style={style}>
      <Image
        style={[{ width: size, height: size }, iconStyle]}
        source={source}
      />
    </View>
  );
};
Icon.propTypes = {
  size: PropTypes.number,
  source: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  iconStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
export default Icon;
