import { computeSize } from "src/common";
export default {
  container: {
    flex: 1,
    paddingLeft: computeSize(10),
    paddingRight: computeSize(10),
    backgroundColor: "#f9f9f9"
  },
  wrapper: {
    marginTop: computeSize(6),
    paddingTop: computeSize(30),
    alignItems: "center",
    backgroundColor: "#fff"
  },
  notTitlewrapper: {
    height: computeSize(60),
    justifyContent: "center",
    alignItems: "center"
  },
  itemWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  itemLabel: {
    color: "#333333",
    lineHeight: 35
  },
  itemValue: {
    color: "#333333",
    lineHeight: computeSize(35)
  }
};
