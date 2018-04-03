export default {
  contianer: {
    flex: 1,
    position: "relative",
    backgroundColor: "#a7daf7"
  },
  box: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 20
  },

  banner: {
    width: "100%",
    height: 160,
    zIndex: 999,
    marginBottom: 15
  },
  item: {
    height: 80,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 5
  },
  itemLeft: {},
  itemTime: { color: "#333", fontSize: 14, lineHeight: 30 },
  itemDetail: { color: "#333", fontSize: 14, lineHeight: 30 },
  rightimg: {
    flexDirection: "row",
    width: 50,
    justifyContent: "flex-end"
  },

  shareBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
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
