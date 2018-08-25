import { computeSize } from "src/common";

export default {
  container: {
    flex: 1,
    backgroundColor: "#1b9de6"
  },
  header: {
    height: computeSize(80),
    paddingLeft: computeSize(12),
    paddingRight: computeSize(12),
    paddingTop: 20,
    backgroundColor: "#1b9de6",
    width: "100%",
    flexDirection: "row"
  },
  mapPatternButton: {
    width: computeSize(30),
    height: computeSize(30),
    marginTop: computeSize(5),
    marginRight: computeSize(19),
    borderRadius: computeSize(30)
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    height: computeSize(40),
    borderRadius: computeSize(8),
    backgroundColor: "#fff",
    overflow: "hidden"
  },
  searchTypeBox: {
    width: computeSize(70),
    paddingLeft: computeSize(10),
    paddingRight: computeSize(10),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  searchTypeValue: {
    fontSize: 12,
    color: "#1b9de6"
  },
  searchTypeIcon: {
    //width: computeSize(10),
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  searchInput: {
    flex: 1,
    fontSize: computeSize(14),
    paddingLeft: computeSize(4)
  },
  searchButton: {
    marginRight: computeSize(10),
    width: computeSize(40),
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  swiperBox: {
    height: computeSize(90)
  },
  swiperItemBox: {
    flex: 1
  },
  swiperItemImg: {
    flex: 1
  },
  chooseWrapper: {
    flexDirection: "row",
    height: computeSize(30),
    backgroundColor: "#1b9de6",
    borderBottomWidth: 1,
    borderColor: "#747474"
  },
  chooseModal: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 99,
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
    backgroundColor: "#747474"
  },
  chooseItemText: {
    marginRight: computeSize(4),
    fontSize: computeSize(12),
    color: "#666"
  },
  list: {
    flex: 1,
    paddingTop: computeSize(6),
    paddingLeft: computeSize(10),
    paddingRight: computeSize(10),
    paddingBottom: computeSize(30),
    backgroundColor: "#fff"
  },
  item: {
    position: "relative",
    height: computeSize(250)
  },
  itemBg: {
    position: "absolute",
    top: 2,
    left: 2,
    width: "100%",
    height: "100%",
    borderRadius: computeSize(10),
    overflow: "hidden"
  },

  free: {
    position: "absolute",
    top: 0,
    left: 0
  },
  itemContent: {
    position: "absolute",
    top: 2,
    left: 2,
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "flex-end"
  },
  storeContentBg: {
    position: "absolute",
    bottom: 0,
    left: 2,
    height: computeSize(140)
  },
  storeDetail: {
    height: computeSize(90),
    //backgroundColor: 'rgba(255,255,255,0.3)',
    flexDirection: "row",
    alignItems: "center"
  },
  storeImg: {
    marginLeft: computeSize(10),
    marginRight: computeSize(10),
    width: computeSize(80),
    height: computeSize(80)
  },

  storeContent: {
    flex: 1,
    flexDirection: "column",
    paddingRight: computeSize(10)
  },
  storeName: {
    height: computeSize(30),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  storeNameText: {
    fontSize: computeSize(15),
    color: "#000"
  },
  priceText: {
    fontSize: computeSize(17),
    color: "#1b9de6"
  },
  storeCenter: {
    height: computeSize(30),
    flexDirection: "row",
    justifyContent: "space-between"
  },
  storeDistance: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  storeDistanceText: {
    fontSize: computeSize(12),
    color: "#747474"
  },
  storeScoreBox: {
    flexDirection: "row",
    alignItems: "center"
  },
  storeScoreText: {
    fontSize: computeSize(12),
    color: "#1b9de6"
  },
  storeBottom: {
    height: computeSize(25),
    flexDirection: "row",
    justifyContent: "space-between"
  },
  storeAddr: {
    flex: 1
  },
  storeAddrText: {
    fontSize: computeSize(12),
    color: "#747474"
  },
  capsule: {
    position: "absolute",
    right: computeSize(10),
    height: computeSize(25),
    borderRadius: computeSize(10),
    paddingLeft: computeSize(10),
    paddingRight: computeSize(10),
    backgroundColor: "#1b9de6",
    justifyContent: "center",
    alignItems: "center"
  },
  capsuleText: {
    fontSize: computeSize(14),
    color: "#fff"
  },
  capsuleO: {
    top: computeSize(10)
  },
  capsuleT: {
    top: computeSize(40)
  }
};
