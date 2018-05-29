import { computeSize } from "src/common";
export default {
  container: {
    flex: 1
  },
  tabContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    height: computeSize(60),
    marginLeft: computeSize(10),
    marginRight: computeSize(10),
    // paddingLeft: computeSize(40),
    // paddingRight: computeSize(40),
    borderRadius: computeSize(10)
  },
  tabItem: {
    position: "relative",
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  tabItemBorder: {
    width: 1,
    height: "80%",
    backgroundColor: "#ececec"
  },
  tabItemActiveBorder: {
    position: "absolute",
    width: "50%",
    height: computeSize(3),
    backgroundColor: "#0a9ae4",
    bottom: 0
  },
  listContainer: {
    flex: 1,
    padding: computeSize(10),
    paddingBottom: 0
  },
  list: {
    flex: 1
  },
  item: {
    backgroundColor: "#fff",
    height: computeSize(80),
    padding: computeSize(10),
    borderRadius: computeSize(10)
  },
  itemBottom: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  itemSum: {
    fontWeight: "700",
    fontStyle: "normal",
    fontSize: computeSize(14),
    color: "#0397E3"
  }
};
