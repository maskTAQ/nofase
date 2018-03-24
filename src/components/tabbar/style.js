import { Dimensions } from "react-native";
export default {
  tabBarWrapper: {
    position: "relative"
  },
  tabBar: {
    flexDirection: "row",
    height: 50,
    backgroundColor: "#1b9be4"
  },
  tabBarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  tabBarItemLabel: {
    fontSize: 12,
    color: "#fff"
  },
  tabBarScanQRWrapper: {
    position: "relative",
    zIndex: 9,
    width: 70,
    height: 50
  },
  tabBarScanQR: {
    position: "absolute",
    zIndex: 9,
    bottom: 0,
    left: (Dimensions.get("window").width - 70) / 2,
    borderRadius: 70,
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderWidth: 1.5,
    borderColor: "#1b9be4",
    backgroundColor: "#fff"
  }
};
