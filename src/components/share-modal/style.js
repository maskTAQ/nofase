import { Platform } from "react-native";
export default {
  layer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)"
  },
  container: {
    width: "100%",
    // height:360,
    position: "relative"
  },
  bg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%"
  },
  content: {
    width: "100%",
    borderRadius: 6
  },
  headerWrapper: {
    flexDirection: "row",
    padding: 6,
    paddingTop: 20
  },
  userInfoWrapper: {
    flex: 1,
    alignItems: "center"
  },
  usernameWrapper: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center"
  },
  lvImg: {
    marginLeft: 4,
    width: 50 * 0.7,
    height: 22 * 0.7
  },
  username: {
    lineHeight: 30,
    fontWeight: "bold",
    color: "#fff"
  },
  userLvWrapper: {
    position: "absolute",
    top: Platform.select({
      ios: 11,
      android: 10
    }),
    right: 8
  },
  userLv: {
    fontSize: 10,
    color: "#fff"
  },
  closeWrapper: {
    width: 40,
    alignItems: "center"
  },
  centerContainer: {
    marginTop: 35,
    marginBottom: 35,
    flexDirection: "row",
    alignItems: "center"
  },
  centerItem: {
    flex: 1,
    alignItems: "center"
  },
  centerItemValueWrapper: {
    flexDirection: "row",
    alignItems: "center"
  },
  Discount: {
    marginLeft: 6,
    fontSize: 12,
    fontWeight: "bold",
    color: "#ed3e67"
  },
  centerItemValue: {
    fontSize: 20,
    lineHeight: 20,
    fontWeight: "bold",
    color: "#fff"
  },
  centerBorder: {
    width: 1,
    height: "80%",
    backgroundColor: "#fff"
  },
  centerItemLabel: {
    fontSize: 12,
    lineHeight: 20,
    color: "#fff"
  },
  storeInfo: {
    marginTop: 15,
    flexDirection: "row",
    paddingTop: 15,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    backgroundColor: "rgba(0,0,0,0.3)"
  },
  storeInfoWrapper: {
    flex: 1,
    paddingLeft: 15
  },
  storeImgWrapper: {
    position: "relative",
    width: 70,
    height: 70
  },
  storePeople: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 16,
    paddingLeft: 4,
    paddingRight: 4,
    backgroundColor: "#f8b84a",
    justifyContent: "center",
    alignItems: "center"
  },
  storePeopleText: {
    fontSize: 10,
    color: "#fff"
  },
  storeName: {
    height: 20,
    lineHeight: 20,
    fontSize: 16,
    color: "#fff"
  },
  storeInfoCenter: {
    flexDirection: "row",
    height: 30,
    alignItems: "center",
    justifyContent: "space-between"
  },
  storeInfoBottom: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  navgation: {
    justifyContent: "center",
    alignItems: "center"
  },
  navgationText: {
    fontSize: 10,
    color: "#1995dc"
  },
  onlinePeople: {
    fontSize: 12,
    color: "#fff"
  },
  storeAddr: {
    height: 20,
    lineHeight: 20,
    fontSize: 12,
    color: "#fff"
  },
  lession: {
    flexDirection: "row",
    alignItems: "center",
    //flex: 1,
    height: 22,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 8,
    backgroundColor: "#f8b84a"
  },
  lessionText: {
    fontSize: 10,
    color: "#fff"
  },
  share: {
    marginTop: 10,
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    backgroundColor: "#f77d26"
  },
  shareText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff"
  }
};
