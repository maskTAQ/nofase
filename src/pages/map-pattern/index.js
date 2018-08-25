import React from "react";
import PropTypes from "prop-types";

import { Page, Button, Icon, ToggleButton, Map } from "src/components";
import { computeSize } from "src/common";
import action from "src/action";
const MapPattern = props => {
  return (
    <Page
      title="地图模式"
      LeftComponent={
        <Button
          onPress={() => {
            props.navigation.dispatch(
              action.navigate.go({
                routeName: "Home"
              })
            );
          }}
        >
          <Icon
            size={computeSize(20)}
            source={require("../home/img/list.png")}
          />
        </Button>
      }
      // RightComponent={
      //     <Button
      //         onPress={() => {
      //             props.navigation.dispatch(
      //                 action.navigate.go({
      //                     routeName: "MapPattern"
      //                 })
      //             );
      //         }}
      //     >
      //         <Icon size={computeSize(16)} source={require("../home/img/search.png")} />
      //     </Button>
      // }
    >
      <Map
        onStoreTap={id => {
          this.props.navigation.dispatch(
            action.navigate.go({
              routeName: "StoreDetail",
              params: {
                Id: id
              }
            })
          );
        }}
      />
      <ToggleButton />
    </Page>
  );
};
MapPattern.propTypes = {
  navigation: PropTypes.object
};
export default MapPattern;
