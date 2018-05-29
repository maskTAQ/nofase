import { computeSize } from "src/common";
export default {
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: computeSize(10)
  },
  content: {
    flex: 1,
    justifyContent: "flex-end"
  },
  list: {
    marginBottom: computeSize(15),
    borderRadius: computeSize(6),
    backgroundColor: "#fff"
  },
  item: {
    height: computeSize(40),
    justifyContent: "center",
    alignItems: "center"
  },
  itemLabel: {
    color: "#333"
  },
  itemBorder: {
    height: 1,
    backgroundColor: "#ccc"
  },
  cancel: {
    height: computeSize(40),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: computeSize(6),
    backgroundColor: "#fff"
  }
};
