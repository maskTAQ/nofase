import React from "react";
import { TouchableOpacity, Text } from "react-native";
import PropTypes from "prop-types";

const renderChildren = (children, textStyle) => {
  const childrenType = typeof children;
  if (childrenType === "object") {
    return children;
  }
  return <Text style={textStyle}>{children}</Text>;
};
const Button = ({ children, style, onPress, textStyle }) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      {renderChildren(children, textStyle)}
    </TouchableOpacity>
  );
};

Button.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: PropTypes.any,
  onPress: PropTypes.func,
  textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default Button;
