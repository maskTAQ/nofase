import { Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const LOADING_WIDTH = 60;
const LOADING_HEIGHT = 60;

export default {
  container: {
    backgroundColor: "transparent",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1
  },
  loadingBg: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: "rgba(0, 0, 0, 0.2)"
  },
  loadingBody: {
    borderRadius: 8,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    minHeight: LOADING_HEIGHT,
    minWidth: LOADING_WIDTH,
    marginLeft: 20,
    marginRight: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  loadingText: {
    color: "white",
    backgroundColor: "transparent",
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    textAlign: "center"
  },
  tipWrap: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  tipStyle: {
    width: 40,
    height: 40
  }
};
