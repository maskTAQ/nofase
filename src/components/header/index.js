import React ,{Component} from "react";
import { View,StatusBar } from "react-native";
//import PropTypes from "prop-types";


export default class Header extends Component{
    render() {
        const barStyle = {
            backgroundColor:'transparent',
            barStyle:'light-content'
        };
         return (
          <View style={[styles.container, this.props.customStyles.container]}>
            <StatusBar
              backgroundColor={barStyle.backgroundColor}
              translucent={true}
              barStyle={barStyle.barStyle}
            />
            <View style={styles.navigationContainer}>
              {this.props.left}
              {this.renderTitle()}
              {this.props.right}
            </View>
          </View>
        );
      }
} 