import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

import styles from "./style";
import { Icon } from "src/components";

const selectedImg = require("./img/selected.png");
const unSelectImg = require("./img/unSelect.png");

const renderLabel = (label, style) => {
  if (typeof label !== "object") {
    return <Text style={[styles.label, style]}>{label}</Text>;
  } else {
    return label;
  }
};

const CheckBox = ({
  data,
  selected,
  onChangeValue = () => {},
  ItemSeparatorComponent,
  labelStyle,
  iconStyle,
  style
}) => (
  <View style={[styles.container, style]}>
    {data.map((item, i) => {
      const { label, value } = item;
      const isActive = value === selected;
      return (
        <TouchableOpacity
          onPress={() => {
            onChangeValue(value);
          }}
          style={[
            styles.itemContainer,
            isActive ? styles.itemContainerActive : null
          ]}
          key={value}
        >
          {renderLabel(label, labelStyle)}
          <Icon
            size={20}
            source={isActive ? selectedImg : unSelectImg}
            style={[styles.icon, iconStyle]}
          />
        </TouchableOpacity>
      );
    })}
  </View>
);
CheckBox.propTypes = {
  data: PropTypes.array.isRequired,
  selected: PropTypes.number.isRequired,
  onChangeValue: PropTypes.func,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  iconStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  labelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  ItemSeparatorComponent: PropTypes.element
};

export default CheckBox;
