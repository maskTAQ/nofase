export default {
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#fff"
  },
  bg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1
  },
  bgTop: {
    height: 40,

    backgroundColor: "#1b9de6"
  },
  bgBottom: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "#a9daf6"
  },
  content: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 2,
    paddingLeft: 10,
    paddingRight: 10
    // paddingRight:10,
  },
  item: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  itemBg: {
    width: "100%",
    flex: 1
  },

  shareBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    flexDirection: "row",
    width: "100%",
    height: 70,
    backgroundColor: "#fff"
  },
  shareBarItem: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center"
  },
  shareBarItemLabel: {
    fontSize: 14,
    color: "#1a9bfc"
  }
};
