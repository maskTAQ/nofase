export default {
  container: {
    flex: 1
  },
  tabContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 60,
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 10
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
    height: 3,
    backgroundColor: "#0a9ae4",
    bottom: 0
  },
  listContainer: {
    flex: 1,
    padding: 10,
    paddingBottom: 0
  },
  list: {
    flex: 1
  },
  item: {
    backgroundColor: "#fff",
    height: 80,
    padding: 10,
    borderRadius: 10
  },
  itemBottom: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  itemSum: {
    fontWeight: "700",
    fontStyle: "normal",
    fontSize: 14,
    color: "#0397E3"
  }
};
