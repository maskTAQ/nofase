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
  itemStyle,
  style,
  itemActiveStyle,
  selectedComponent,
  unSelectComponent
}) => {
  const dataCount = data.length - 1;
  for (let i = 0; i < dataCount; i++) {
    data.splice(i + (i + 1), 0, "border");
  }
  return (
    <View style={[styles.container, style]}>
      {data.map((item, i) => {
        const { label, value } = item;
        const isActive = value === selected;
        if (item === "border") {
          return <View key={`border-${i}`}>{ItemSeparatorComponent}</View>;
        }
        return (
          <TouchableOpacity
            onPress={() => {
              onChangeValue(value);
            }}
            style={[
              styles.itemContainer,
              isActive ? styles.itemContainerActive : null,

              itemStyle,
              isActive ? itemActiveStyle : null
            ]}
            key={value}
          >
            {renderLabel(label, labelStyle)}
            {selectedComponent ? (
              isActive ? (
                selectedComponent
              ) : (
                unSelectComponent
              )
            ) : (
              <Icon
                size={20}
                source={isActive ? selectedImg : unSelectImg}
                style={[styles.icon, iconStyle]}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
CheckBox.propTypes = {
  data: PropTypes.array.isRequired,
  selected: PropTypes.number.isRequired,
  onChangeValue: PropTypes.func,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  iconStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  labelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  itemStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  itemActiveStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  ItemSeparatorComponent: PropTypes.element,
  selectedComponent: PropTypes.element,
  unSelectComponent: PropTypes.element
};

export default CheckBox;
