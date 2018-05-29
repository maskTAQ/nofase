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
    width: computeSize(42),
    justifyContent: "center",
    alignItems: "center"
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
