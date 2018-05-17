import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");
export default {
  container: {
    flex: 1,
    position: "relative"
    //backgroundColor: "transparent"
  },
  bg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff"
  },
  bgImgBox: {
    //height: 120,
    backgroundColor: "#fff",
    marginBottom: 40
  },
  bgImg: {
    width: "100%",
    height: 130
  },
  bgContent: {
    flex: 1,
    backgroundColor: "#1b9ee6"
  },
  content: {
    flex: 1
  },
  header: {
    paddingTop: 30,
    paddingLeft: 22,
    paddingRight: 22,
    flexDirection: "row"
  },
  headerLeft: {
    flex: 2
  },
  headerLeftText: {
    fontSize: (width - 44) / 5 * 2 / 5 - 1,
    color: "#fff"
  },
  headerRight: {
    flex: 3
  },
  headerRightText: {
    fontSize: (width - 44) / 5 * 3 / 4 - 1,
    color: "#fff"
  },
  lookButton: {
    marginTop: 8,
    width: "100%",
    height: 25,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center"
  },
  centerWrapper: {
    marginTop: 30,
    paddingLeft: 22,
    paddingRight: 22
  },
  center: {
    height: 65,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#1b9fe8",
    borderRadius: 4,
    backgroundColor: "#fff"
  },
  centerItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  centerItemLabel: {
    fontSize: 14,
    color: "#1b9ee6"
  },
  centerItemValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1b9ee6"
  },
  centerSeparator: {
    width: 1,
    height: "80%",
    backgroundColor: "#1b9ee6"
  },
  listContainer: {
    flex: 1,
    paddingTop: 10,
    paddingLeft: 12,
    paddingRight: 12
  },
  item: {
    height: 66,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: "#fff"
  },
  itemIconWrapper: {
    paddingLeft: 12,
    paddingRight: 12
  },
  itemSeparator: {
    width: 1,
    height: 30,
    backgroundColor: "#1b9ee6"
  },
  itemContent: {
    paddingLeft: 10
  },
  itemContentText: {
    fontSize: 14,
    color: "#1b9ee6"
  }
};
