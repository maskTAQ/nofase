import { computeSize } from "src/common";
export default {
  container: {
    flex: 1
  },
  footerWrapper: {
    height: computeSize(40),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: computeSize(14),
    color: "#333"
  },
  ListEmptyComponent: {
    justifyContent: "center",
    alignItems: "center"
  },
  ListEmptyComponentText: {
    fontSize: computeSize(14),
    color: "#333"
  }
};
