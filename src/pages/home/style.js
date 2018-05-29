import { computeSize } from "src/common";

export default {
  header: {
    height: computeSize(70),
    paddingLeft: computeSize(10),
    paddingRight: computeSize(10),
    backgroundColor: "#1b9de6"
  },
  tabContainer: {
    flexDirection: "row"
  },
  tab: {
    flex: 1,
    height: computeSize(26),
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: computeSize(8),
    borderTopRightRadius: computeSize(8),
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    overflow: "hidden",
    borderColor: "#f8b94a",
    backgroundColor: "#f8b94a"
  },
  tabActive: {
    borderColor: "#fff",
    backgroundColor: "#fff"
  },
  tabLabel: {
    color: "#fff",
    fontSize: computeSize(14)
  },
  tabLabelActive: {
    color: "#f8b94a"
  },
  searchContainer: {
    flexDirection: "row",
    height: computeSize(30),
    borderRadius: computeSize(8),
    borderTopLeftRadius: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    overflow: "hidden"
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  searchInputIcon: {
    paddingLeft: computeSize(10)
  },
  searchInput: {
    flex: 1,
    fontSize: computeSize(14),
    paddingLeft: computeSize(4)
  },
  search: {
    width: computeSize(90),
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#f8b94a",
    borderTopRightRadius: computeSize(8),
    borderBottomRightRadius: computeSize(8)
  },
  searchLabel: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: computeSize(14)
  },
  chooseWrapper: {
    flexDirection: "row",
    height: computeSize(24),
    backgroundColor: "#1b9de6",
    borderBottomLeftRadius: computeSize(8),
    borderBottomRightRadius: computeSize(8)
  },
  chooseModal: {
    position: "absolute",
    left: 0,
    right: 0,
    backgroundColor: "#fff"
  },
  checkboxItem: {
    height: computeSize(26),
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },
  checkboxActiveItem: {
    backgroundColor: "#f2f2f2"
  },
  checkboxItemLabel: {
    color: "rgb(computeSize(102), computeSize(102), 102)"
  },
  checkboxItemIcon: {
    position: "absolute",
    top: computeSize(3),
    right: computeSize(10)
  },
  chooseItemButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  chooseItemBorder: {
    width: 1,
    height: "100%",
    backgroundColor: "#ccc"
  },
  chooseItemText: {
    marginRight: computeSize(4),
    fontSize: computeSize(12),
    color: "#666"
  },
  list: {
    flex: 1,
    paddingTop: computeSize(2),
    paddingLeft: computeSize(10),
    paddingRight: computeSize(10),
    paddingBottom: computeSize(30),
    backgroundColor: "#a9daef"
  },
  item: {
    position: "relative"
  },
  itemTop: {
    flexDirection: "row",
    padding: computeSize(4),
    borderRadius: computeSize(6),
    backgroundColor: "#fff"
  },
  itemBottom: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: computeSize(6),
    paddingLeft: computeSize(4),
    paddingRight: computeSize(10),
    backgroundColor: "#fff",
    borderRadius: computeSize(6),
    height: computeSize(30)
  },
  tagWrapper: {
    position: "absolute",
    top: computeSize(4),
    left: computeSize(4),
    paddingLeft: computeSize(4),
    paddingRight: computeSize(4),
    backgroundColor: "#f8b94a"
  },
  tagText: {
    fontSize: computeSize(12),
    fontWeight: "bold",
    color: "#fff"
  },
  itemDetail: {
    flex: 1,
    padding: computeSize(4)
  },
  itemDetailTop: {
    height: computeSize(24),
    justifyContent: "center"
  },
  itemName: {
    fontSize: computeSize(14),
    fontWeight: "bold",
    color: "#666"
  },
  itemDetailCenter: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  itemDetailBottom: {
    flexDirection: "row",

    alignItems: "center"
  },
  lessionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: computeSize(10),
    height: computeSize(20),
    backgroundColor: "#f8b94a",
    borderRadius: computeSize(20)
  },
  lessionText: {
    fontSize: computeSize(12),
    color: "#fff"
  },

  itemDistance: {
    lineHeight: computeSize(20),
    fontSize: computeSize(12),
    color: "#999"
  },

  itemAddr: {
    flex: 1,
    fontSize: computeSize(12),
    color: "#999"
  },
  navgationButton: {
    alignItems: "center"
  },
  navgationText: {
    fontSize: computeSize(10),
    //fontWeight: "bold",
    color: "#1296DB"
  },
  evaluateLabel: {
    fontSize: computeSize(12),
    color: "#666"
  },
  evaluateValue: {
    fontSize: computeSize(12),
    fontWeight: "bold",
    color: "#1296DB"
  },
  price: {
    fontSize: computeSize(14),
    fontWeight: "bold",
    color: "#1296DB"
  }
};
