import React from "react";
import { TextInput } from "react-native";
import PropTypes from "prop-types";

const MyTextInput = props => {
  return (
    <TextInput
      clearButtonMode="while-editing"
      autoCapitalize={"none"}
      autoCorrect={false}
      placeholderTextColor={"#999"}
      underlineColorAndroid="transparent"
      {...props}
      style={[{ margin: 0, padding: 0 }, props.style]}
    />
  );
};

MyTextInput.propTypes = {
  style: PropTypes.object
};

export default MyTextInput;
