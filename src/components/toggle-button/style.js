import { computeSize } from "src/common";
export default {
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: computeSize(88),
    paddingTop: 0
  },
  bg: {
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  wrapper: {
    flex: 1,
    paddingBottom: 0
  },
  toggleButton: {
    alignItems: "center"
  },
  buttonGroup: {
    flex: 1,
    flexDirection: "row"
  },
  buttonLeft: {
    width: computeSize(56),
    justifyContent: "center",
    alignItems: "center"
  },
  buttonCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonRight: {
    width: computeSize(56),
    justifyContent: "center",
    alignItems: "center"
  }
};
