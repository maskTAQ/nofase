import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

import { Header } from "src/components";

const Page = ({
  title,
  LeftComponent,
  RightComponent,
  children,
  headerStyle,
  onPress
}) => {
  return (
    <View style={{ flex: 1 }}>
      <Header
        onLeftPress={onPress}
        title={title}
        LeftComponent={LeftComponent}
        RightComponent={RightComponent}
        style={headerStyle}
      />
      <View style={{ flex: 1 }}>{children}</View>
    </View>
  );
};
Page.propTypes = {
  LeftComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  RightComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  headerStyle: PropTypes.object,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  onPress: PropTypes.func,
  children: PropTypes.any
};
export default Page;
