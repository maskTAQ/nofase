import { computeSize } from "src/common";
export default {
  container: {
    height: computeSize(70),
    backgroundColor: "#1b9de6"
  },
  navigationContainer: {
    marginTop: computeSize(20),
    height: computeSize(50),
    flexDirection: "row"
  },
  item: {
    width: 80,
    justifyContent: "center"
  },
  leftItem: {
    alignItems: "flex-start",
    paddingLeft: 10
  },
  rightItem: {
    alignItems: "flex-end",
    paddingRight: 10
  },
  title: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  titleText: {
    fontSize: computeSize(16),
    fontWeight: "bold",
    color: "#fff"
  }
};
